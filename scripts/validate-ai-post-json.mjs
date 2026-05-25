import {access, readFile} from 'node:fs/promises'
import {constants as fsConstants} from 'node:fs'
import {resolve} from 'node:path'

function parseArgs(argv) {
	const args = {}

	for (let index = 0; index < argv.length; index += 1) {
		const current = argv[index]
		if (!current.startsWith('--')) continue

		const key = current.slice(2)
		const next = argv[index + 1]

		if (!next || next.startsWith('--')) {
			args[key] = 'true'
			continue
		}

		args[key] = next
		index += 1
	}

	return args
}

async function pathExists(filePath) {
	try {
		await access(filePath, fsConstants.F_OK)
		return true
	} catch {
		return false
	}
}

function ensureNonEmptyString(value, label, errors) {
	if (typeof value !== 'string' || value.trim() === '') {
		errors.push(`${label} must be a non-empty string.`)
		return ''
	}

	return value.trim()
}

function ensureBoolean(value, label, errors) {
	if (typeof value !== 'boolean') {
		errors.push(`${label} must be a boolean.`)
	}
}

function ensureArray(value, label, errors) {
	if (!Array.isArray(value)) {
		errors.push(`${label} must be an array.`)
		return []
	}

	return value
}

function isValidHref(value) {
	if (typeof value !== 'string' || value.trim() === '') return false
	if (value.startsWith('/')) return true
	if (value.startsWith('#')) return true

	try {
		new URL(value)
		return true
	} catch {
		return false
	}
}

function validateIsoDate(value, label, errors) {
	const text = ensureNonEmptyString(value, label, errors)
	if (!text) return

	if (Number.isNaN(Date.parse(text))) {
		errors.push(`${label} must be a valid ISO date string.`)
	}
}

async function validateImageDescriptor(value, label, errors) {
	if (!value) return

	if (typeof value !== 'object' || Array.isArray(value)) {
		errors.push(`${label} must be an object.`)
		return
	}

	const hasPath = typeof value.path === 'string' && value.path.trim() !== ''
	const hasUrl = typeof value.url === 'string' && value.url.trim() !== ''

	if (!hasPath && !hasUrl) {
		errors.push(`${label} must include either a non-empty "path" or "url".`)
		return
	}

	if (hasPath) {
		const absolutePath = resolve(process.cwd(), value.path)
		if (!(await pathExists(absolutePath))) {
			errors.push(`${label} path does not exist: ${value.path}`)
		}
	}

	if (hasUrl) {
		try {
			new URL(value.url)
		} catch {
			errors.push(`${label} url must be a valid URL.`)
		}
	}

	if ('alt' in value) {
		ensureNonEmptyString(value.alt, `${label}.alt`, errors)
	}

	if ('caption' in value && typeof value.caption !== 'string') {
		errors.push(`${label}.caption must be a string if provided.`)
	}
}

async function validateBodyBlocks(bodyBlocks, label, errors) {
	const blocks = ensureArray(bodyBlocks, label, errors)

	for (const [index, block] of blocks.entries()) {
		const blockLabel = `${label}[${index}]`

		if (!block || typeof block !== 'object' || Array.isArray(block)) {
			errors.push(`${blockLabel} must be an object.`)
			continue
		}

		if (block.type !== 'paragraph' && block.type !== 'image' && block.type !== 'block') {
			errors.push(`${blockLabel}.type must be "paragraph", "image", or "block".`)
			continue
		}

		if (block.type === 'paragraph') {
			ensureNonEmptyString(block.text, `${blockLabel}.text`, errors)
			continue
		}

		if (block.type === 'block') {
			if ('style' in block && typeof block.style !== 'string') {
				errors.push(`${blockLabel}.style must be a string if provided.`)
			}

			const spans = ensureArray(block.spans, `${blockLabel}.spans`, errors)
			for (const [spanIndex, span] of spans.entries()) {
				const spanLabel = `${blockLabel}.spans[${spanIndex}]`

				if (!span || typeof span !== 'object' || Array.isArray(span)) {
					errors.push(`${spanLabel} must be an object.`)
					continue
				}

				ensureNonEmptyString(span.text, `${spanLabel}.text`, errors)

				if ('marks' in span) {
					const marks = ensureArray(span.marks, `${spanLabel}.marks`, errors)
					marks.forEach((mark, markIndex) => {
						if (typeof mark !== 'string' || mark.trim() === '') {
							errors.push(`${spanLabel}.marks[${markIndex}] must be a non-empty string.`)
						}
					})
				}

				if ('link' in span) {
					const href = ensureNonEmptyString(span.link, `${spanLabel}.link`, errors)
					if (href && !isValidHref(href)) {
						errors.push(`${spanLabel}.link must be a valid URL or internal path.`)
					}
				}
			}
			continue
		}

		await validateImageDescriptor(block, blockLabel, errors)
	}
}

async function validateSeo(seo, label, errors) {
	if (!seo) return

	if (typeof seo !== 'object' || Array.isArray(seo)) {
		errors.push(`${label} must be an object.`)
		return
	}

	const stringFields = [
		'metaTitle',
		'metaDescription',
		'canonicalUrl',
		'ogTitle',
		'ogDescription',
		'twitterTitle',
		'twitterDescription',
	]

	for (const field of stringFields) {
		if (field in seo && typeof seo[field] !== 'string') {
			errors.push(`${label}.${field} must be a string if provided.`)
		}
	}

	if ('noIndex' in seo) {
		ensureBoolean(seo.noIndex, `${label}.noIndex`, errors)
	}

	if (typeof seo.canonicalUrl === 'string' && seo.canonicalUrl.trim() !== '') {
		try {
			new URL(seo.canonicalUrl)
		} catch {
			errors.push(`${label}.canonicalUrl must be a valid URL.`)
		}
	}

	await validateImageDescriptor(seo.ogImage, `${label}.ogImage`, errors)
	await validateImageDescriptor(seo.twitterImage, `${label}.twitterImage`, errors)
}

async function validatePost(post, index) {
	const errors = []
	const label = `posts[${index}]`

	if (!post || typeof post !== 'object' || Array.isArray(post)) {
		return [`${label} must be an object.`]
	}

	ensureNonEmptyString(post.title, `${label}.title`, errors)
	ensureNonEmptyString(post.excerpt, `${label}.excerpt`, errors)

	if ('slug' in post) {
		ensureNonEmptyString(post.slug, `${label}.slug`, errors)
	}

	if ('publishedAt' in post) {
		validateIsoDate(post.publishedAt, `${label}.publishedAt`, errors)
	}

	if ('tags' in post) {
		const tags = ensureArray(post.tags, `${label}.tags`, errors)
		tags.forEach((tag, tagIndex) => {
			if (typeof tag !== 'string' || tag.trim() === '') {
				errors.push(`${label}.tags[${tagIndex}] must be a non-empty string.`)
			}
		})
	}

	const hasBody = typeof post.body === 'string' && post.body.trim() !== ''
	const hasBodyBlocks = Array.isArray(post.bodyBlocks)

	if (!hasBody && !hasBodyBlocks) {
		errors.push(`${label} must include either "body" or "bodyBlocks".`)
	}

	if (hasBody && hasBodyBlocks) {
		errors.push(`${label} should use either "body" or "bodyBlocks", not both.`)
	}

	if (hasBody && typeof post.body !== 'string') {
		errors.push(`${label}.body must be a string.`)
	}

	if (hasBodyBlocks) {
		await validateBodyBlocks(post.bodyBlocks, `${label}.bodyBlocks`, errors)
	}

	await validateImageDescriptor(post.featuredImage, `${label}.featuredImage`, errors)

	if ('schemaMarkup' in post) {
		const schemaText = ensureNonEmptyString(post.schemaMarkup, `${label}.schemaMarkup`, errors)
		if (schemaText) {
			try {
				JSON.parse(schemaText)
			} catch {
				errors.push(`${label}.schemaMarkup must be a valid JSON string.`)
			}
		}
	}

	await validateSeo(post.seo, `${label}.seo`, errors)

	return errors
}

function printUsage() {
	console.log(`Usage:
  npm run sanity:validate-posts -- --file content/ai-post.json

Checks:
  - top-level JSON array
  - required post fields
  - body/bodyBlocks format
  - schemaMarkup JSON string validity
  - SEO field types
  - local image path existence
`)
}

const args = parseArgs(process.argv.slice(2))

if (args.help === 'true' || !args.file) {
	printUsage()
	process.exit(args.help === 'true' ? 0 : 1)
}

const filePath = resolve(process.cwd(), args.file)
const raw = await readFile(filePath, 'utf8')
let parsed

try {
	parsed = JSON.parse(raw)
} catch (error) {
	console.error(`Invalid JSON in ${args.file}: ${error.message}`)
	process.exit(1)
}

if (!Array.isArray(parsed)) {
	console.error('Import file must contain a JSON array of post objects.')
	process.exit(1)
}

const allErrors = []

for (const [index, post] of parsed.entries()) {
	const errors = await validatePost(post, index)
	allErrors.push(...errors)
}

if (allErrors.length > 0) {
	console.error(`Validation failed for ${args.file}:`)
	allErrors.forEach((error) => console.error(`- ${error}`))
	process.exit(1)
}

console.log(`Validation passed for ${args.file}. ${parsed.length} post(s) ready to import.`)

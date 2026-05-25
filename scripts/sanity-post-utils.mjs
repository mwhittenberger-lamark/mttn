import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'

export function parseArgs(argv) {
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

export function slugify(value) {
	return value
		.toLowerCase()
		.trim()
		.replace(/['"]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 96)
}

export function textToBlock(paragraph) {
	return {
		_type: 'block',
		style: 'normal',
		markDefs: [],
		children: [
			{
				_type: 'span',
				marks: [],
				text: paragraph,
			},
		],
	}
}

export function richBlockToPortableText(block) {
	const style = typeof block.style === 'string' && block.style.trim() ? block.style.trim() : 'normal'
	const spans = Array.isArray(block.spans) ? block.spans : []
	const children = []
	const markDefs = []
	const markDefKeys = new Set()

	for (const span of spans) {
		if (!span || typeof span !== 'object') {
			throw new Error('Rich text spans must be objects.')
		}

		const text = String(span.text || '')
		if (!text.trim()) continue

		const marks = Array.isArray(span.marks)
			? span.marks.map((mark) => String(mark).trim()).filter(Boolean)
			: []

		if (span.link) {
			const href = String(span.link).trim()
			if (!href) {
				throw new Error('Link spans require a valid href.')
			}

			let key = span.linkKey ? String(span.linkKey).trim() : ''
			if (!key) {
				key = `link-${markDefs.length + 1}`
			}

			if (!markDefKeys.has(key)) {
				markDefs.push({
					_key: key,
					_type: 'link',
					href,
				})
				markDefKeys.add(key)
			}

			marks.push(key)
		}

		children.push({
			_type: 'span',
			text,
			marks,
		})
	}

	if (children.length === 0) {
		throw new Error('Rich text blocks require at least one non-empty span.')
	}

	return {
		_type: 'block',
		style,
		markDefs,
		children,
	}
}

export function toPortableText(text) {
	return text
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean)
		.map((paragraph) => textToBlock(paragraph))
}

export function guessContentType(filename, fallback = 'application/octet-stream') {
	const lower = filename.toLowerCase()
	if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
	if (lower.endsWith('.png')) return 'image/png'
	if (lower.endsWith('.webp')) return 'image/webp'
	if (lower.endsWith('.gif')) return 'image/gif'
	if (lower.endsWith('.svg')) return 'image/svg+xml'
	if (lower.endsWith('.avif')) return 'image/avif'
	return fallback
}

export function toImageValue(assetId, fields = {}) {
	return {
		_type: 'image',
		asset: {
			_type: 'reference',
			_ref: assetId,
		},
		...fields,
	}
}

export async function uploadImage(client, descriptor) {
	if (!descriptor || typeof descriptor !== 'object') {
		throw new Error('Image descriptor must be an object.')
	}

	const sourcePath = descriptor.path ? resolve(process.cwd(), descriptor.path) : null
	const sourceUrl = descriptor.url ? String(descriptor.url).trim() : null

	if (!sourcePath && !sourceUrl) {
		throw new Error('Image descriptor requires either "path" or "url".')
	}

	if (sourcePath) {
		const buffer = await readFile(sourcePath)
		const filename = sourcePath.split('/').pop() || 'image'
		return client.assets.upload('image', buffer, {
			filename,
			contentType: guessContentType(filename),
		})
	}

	const response = await fetch(sourceUrl)
	if (!response.ok) {
		throw new Error(`Failed to download image: ${response.status} ${response.statusText}`)
	}

	const arrayBuffer = await response.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)
	const urlFile = new URL(sourceUrl)
	const filename = urlFile.pathname.split('/').pop() || 'image'
	const contentType = response.headers.get('content-type') || guessContentType(filename)

	return client.assets.upload('image', buffer, {
		filename,
		contentType,
	})
}

export async function normalizeImageField(client, value) {
	if (!value) return undefined
	const asset = await uploadImage(client, value)

	return toImageValue(asset._id, {
		alt: value.alt ? String(value.alt).trim() : '',
	})
}

export async function normalizeBody(client, input) {
	if (Array.isArray(input.bodyBlocks)) {
		const blocks = []

		for (const block of input.bodyBlocks) {
			if (!block || typeof block !== 'object') {
				throw new Error('Each bodyBlocks item must be an object.')
			}

			if (block.type === 'image') {
				const asset = await uploadImage(client, block)
				blocks.push(
					toImageValue(asset._id, {
						alt: block.alt ? String(block.alt).trim() : '',
						caption: block.caption ? String(block.caption).trim() : undefined,
					})
				)
				continue
			}

			if (block.type === 'block') {
				blocks.push(richBlockToPortableText(block))
				continue
			}

			const text = String(block.text || '').trim()
			if (!text) {
				throw new Error('Paragraph blocks require text.')
			}
			blocks.push(textToBlock(text))
		}

		return blocks
	}

	const body = String(input.body || '').trim()
	if (!body) {
		throw new Error('Each post requires body or bodyBlocks.')
	}

	return toPortableText(body)
}

export async function normalizePost(client, input) {
	if (!input || typeof input !== 'object') {
		throw new Error('Each item must be an object.')
	}

	const title = String(input.title || '').trim()
	const excerpt = String(input.excerpt || '').trim()
	const body = await normalizeBody(client, input)

	if (!title || !excerpt || body.length === 0) {
		throw new Error('Each post requires title, excerpt, and body content.')
	}

	const tags = Array.isArray(input.tags)
		? input.tags.map((tag) => String(tag).trim()).filter(Boolean)
		: []

	const featuredImage = await normalizeImageField(client, input.featuredImage)
	const seoOgImage = await normalizeImageField(client, input.seo?.ogImage)
	const seoTwitterImage = await normalizeImageField(client, input.seo?.twitterImage)

	const seo =
		input.seo && typeof input.seo === 'object'
			? {
					metaTitle: input.seo.metaTitle ? String(input.seo.metaTitle).trim() : undefined,
					metaDescription: input.seo.metaDescription ? String(input.seo.metaDescription).trim() : undefined,
					canonicalUrl: input.seo.canonicalUrl ? String(input.seo.canonicalUrl).trim() : undefined,
					noIndex: Boolean(input.seo.noIndex),
					ogTitle: input.seo.ogTitle ? String(input.seo.ogTitle).trim() : undefined,
					ogDescription: input.seo.ogDescription ? String(input.seo.ogDescription).trim() : undefined,
					ogImage: seoOgImage,
					twitterTitle: input.seo.twitterTitle ? String(input.seo.twitterTitle).trim() : undefined,
					twitterDescription: input.seo.twitterDescription ? String(input.seo.twitterDescription).trim() : undefined,
					twitterImage: seoTwitterImage,
				}
			: undefined

	return {
		_type: 'post',
		title,
		slug: {
			_type: 'slug',
			current: String(input.slug || slugify(title)).trim(),
		},
		excerpt,
		publishedAt: input.publishedAt || new Date().toISOString(),
		tags,
		body,
		featuredImage,
		schemaMarkup: input.schemaMarkup ? String(input.schemaMarkup) : undefined,
		seo,
	}
}

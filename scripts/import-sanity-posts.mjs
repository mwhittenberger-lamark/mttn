import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {createClient} from '@sanity/client'
import {
	requireSanityWriteToken,
	sanityApiVersion,
	sanityDataset,
	sanityProjectId,
} from '../sanity.shared.mjs'

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

function slugify(value) {
	return value
		.toLowerCase()
		.trim()
		.replace(/['"]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 96)
}

function textToBlock(paragraph) {
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

function toPortableText(text) {
	return text
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean)
		.map((paragraph) => textToBlock(paragraph))
}

function guessContentType(filename, fallback = 'application/octet-stream') {
	const lower = filename.toLowerCase()
	if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
	if (lower.endsWith('.png')) return 'image/png'
	if (lower.endsWith('.webp')) return 'image/webp'
	if (lower.endsWith('.gif')) return 'image/gif'
	if (lower.endsWith('.svg')) return 'image/svg+xml'
	if (lower.endsWith('.avif')) return 'image/avif'
	return fallback
}

function toImageValue(assetId, fields = {}) {
	return {
		_type: 'image',
		asset: {
			_type: 'reference',
			_ref: assetId,
		},
		...fields,
	}
}

async function uploadImage(client, descriptor) {
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

async function normalizeImageField(client, value) {
	if (!value) return undefined
	const asset = await uploadImage(client, value)

	return toImageValue(asset._id, {
		alt: value.alt ? String(value.alt).trim() : '',
	})
}

async function normalizeBody(client, input) {
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

async function normalizePost(client, input) {
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

function printUsage() {
	console.log(`Usage:
  npm run sanity:import-posts -- --file content/posts.json

Expected JSON format:
  [
    {
      "title": "Post title",
      "excerpt": "Short summary",
      "body": "Paragraph one\\n\\nParagraph two",
      "featuredImage": {
        "path": "content/images/hero.jpg",
        "alt": "Descriptive alt text"
      },
      "bodyBlocks": [
        {"type": "paragraph", "text": "Opening paragraph"},
        {"type": "image", "path": "content/images/inline.png", "alt": "Inline image alt", "caption": "Optional caption"}
      ],
      "slug": "optional-custom-slug",
      "publishedAt": "2026-05-25T12:00:00.000Z",
      "tags": ["seo", "ai", "websites"],
      "schemaMarkup": "{\\"@context\\":\\"https://schema.org\\"}",
      "seo": {
        "metaTitle": "Optional SEO title",
        "metaDescription": "Optional SEO description",
        "canonicalUrl": "https://whoisthetechninja.com/blog/post-slug/",
        "noIndex": false,
        "ogTitle": "Optional OG title",
        "ogDescription": "Optional OG description",
        "ogImage": {"path": "content/images/og.jpg", "alt": "OG alt"},
        "twitterTitle": "Optional Twitter title",
        "twitterDescription": "Optional Twitter description",
        "twitterImage": {"path": "content/images/twitter.jpg", "alt": "Twitter alt"}
      }
    }
  ]

Required .env value:
  SANITY_API_WRITE_TOKEN=your_sanity_write_token_here`)
}

const args = parseArgs(process.argv.slice(2))

if (args.help === 'true' || !args.file) {
	printUsage()
	process.exit(args.help === 'true' ? 0 : 1)
}

const filePath = resolve(process.cwd(), args.file)
const raw = await readFile(filePath, 'utf8')
const parsed = JSON.parse(raw)

if (!Array.isArray(parsed)) {
	throw new Error('Import file must contain a JSON array of post objects.')
}

const client = createClient({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	apiVersion: sanityApiVersion,
	token: requireSanityWriteToken(),
	useCdn: false,
})

let successCount = 0

for (const [index, item] of parsed.entries()) {
	try {
		const document = await normalizePost(client, item)
		const created = await client.create(document)
		successCount += 1
		console.log(`[${index + 1}/${parsed.length}] Created ${created._id} -> /blog/${document.slug.current}/`)
	} catch (error) {
		console.error(`[${index + 1}/${parsed.length}] Failed to import post: ${error.message}`)
	}
}

console.log(`Imported ${successCount} of ${parsed.length} post(s).`)

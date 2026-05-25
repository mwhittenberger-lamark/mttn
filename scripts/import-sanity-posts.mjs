import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {createClient} from '@sanity/client'
import {
	requireSanityWriteToken,
	sanityApiVersion,
	sanityDataset,
	sanityProjectId,
} from '../sanity.shared.mjs'
import {normalizePost, parseArgs} from './sanity-post-utils.mjs'

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

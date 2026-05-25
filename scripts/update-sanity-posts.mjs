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
  npm run sanity:update-posts -- --file content/posts.json [--create-if-missing]

Behavior:
  - Matches existing Sanity posts by slug
  - Replaces the matched document with the JSON content
  - By default, fails if a slug does not already exist
  - Use --create-if-missing to create posts when no match is found

Expected JSON format:
  - A JSON array of post objects in the same shape used by sanity:import-posts
  - Each post should include a slug so the updater can find the existing document

Examples:
  npm run sanity:update-posts -- --file content/seven-website-must-haves.json
  npm run sanity:update-posts -- --file content/posts.json --create-if-missing

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
	throw new Error('Update file must contain a JSON array of post objects.')
}

const client = createClient({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	apiVersion: sanityApiVersion,
	token: requireSanityWriteToken(),
	useCdn: false,
})

const createIfMissing = args['create-if-missing'] === 'true'
let updatedCount = 0
let createdCount = 0

for (const [index, item] of parsed.entries()) {
	try {
		const document = await normalizePost(client, item)
		const slug = document.slug.current

		if (!slug) {
			throw new Error('Each post requires a slug to update an existing document.')
		}

		const existing = await client.fetch(
			`*[_type == "post" && slug.current == $slug][0]{_id}`,
			{slug}
		)

		if (existing?._id) {
			const result = await client.createOrReplace({
				...document,
				_id: existing._id,
			})
			updatedCount += 1
			console.log(`[${index + 1}/${parsed.length}] Updated ${result._id} -> /blog/${slug}/`)
			continue
		}

		if (!createIfMissing) {
			throw new Error(`No existing post found for slug "${slug}".`)
		}

		const created = await client.create(document)
		createdCount += 1
		console.log(`[${index + 1}/${parsed.length}] Created ${created._id} -> /blog/${slug}/`)
	} catch (error) {
		console.error(`[${index + 1}/${parsed.length}] Failed to update post: ${error.message}`)
	}
}

console.log(`Updated ${updatedCount} post(s). Created ${createdCount} post(s).`)

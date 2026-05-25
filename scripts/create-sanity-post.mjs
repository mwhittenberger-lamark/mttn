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

function toPortableText(text) {
	return text
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean)
		.map((paragraph) => ({
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
		}))
}

function printUsage() {
	console.log(`Usage:
  npm run sanity:create-post -- --title "Post title" --excerpt "Short summary" --body "Paragraph one

Paragraph two" [--slug "custom-slug"] [--tags "seo, ai, websites"] [--published "2026-05-25T12:00:00.000Z"]

Required .env value:
  SANITY_API_WRITE_TOKEN=your_sanity_write_token_here`)
}

const args = parseArgs(process.argv.slice(2))

if (args.help === 'true' || !args.title || !args.excerpt || !args.body) {
	printUsage()
	process.exit(args.help === 'true' ? 0 : 1)
}

const title = args.title.trim()
const excerpt = args.excerpt.trim()
const body = args.body.trim()
const slug = (args.slug || slugify(title)).trim()
const tags = args.tags
	? args.tags
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean)
	: []
const publishedAt = args.published || new Date().toISOString()

const client = createClient({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	apiVersion: sanityApiVersion,
	token: requireSanityWriteToken(),
	useCdn: false,
})

const document = {
	_type: 'post',
	title,
	slug: {
		_type: 'slug',
		current: slug,
	},
	excerpt,
	publishedAt,
	tags,
	body: toPortableText(body),
}

const created = await client.create(document)

console.log(`Created Sanity post ${created._id}`)
console.log(`Slug: ${slug}`)
console.log(`URL: /blog/${slug}/`)

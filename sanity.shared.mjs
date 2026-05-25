import 'dotenv/config'

export const sanityProjectId = process.env.SANITY_PROJECT_ID || 'npynfyx8'
export const sanityDataset = process.env.SANITY_DATASET || 'production'
export const sanityApiVersion = process.env.SANITY_API_VERSION || '2026-05-25'
export const sanityUseCdn = process.env.SANITY_USE_CDN === 'false' ? false : true

export function getSanityWriteToken() {
	return process.env.SANITY_API_WRITE_TOKEN || ''
}

export function requireSanityWriteToken() {
	const token = getSanityWriteToken()

	if (!token) {
		throw new Error(
			'SANITY_API_WRITE_TOKEN is not set. Add it to your .env file before running write operations.'
		)
	}

	return token
}

# Sanity, Social, and Video

## Sanity schemas
Create document types: `post`, `author`, `category`, `tag`. Add object types: `seoFields`, `ninjaOpsFields`.

Post fields: title, slug, excerpt, body Portable Text, featuredImage, featuredImageAlt, author, categories, tags, publishedAt, scheduledFor, status, seo, ninjaOps.

SEO fields: metaTitle, metaDescription, primaryKeyword, secondaryKeywords, canonicalUrl, noIndex.

NinjaOps fields: projectId, articleId, contentIdeaId, generationRunId, source, aiModel, promptVersion, reviewedByHuman, qualityScore.

## Sanity push flow
1. Load approved/scheduled article.
2. Load and decrypt Sanity token.
3. Upload featured image asset if needed.
4. Create/update deterministic draft ID: `drafts.ninjaops-{articleId}`.
5. Write post payload.
6. Store Sanity document ID in Postgres.
7. Write audit log.

## Social generation
After article approval, create posts for LinkedIn, Meta, and TikTok/Reels. Default schedule: Tuesday LinkedIn educational post, Wednesday Meta practical tip, Thursday LinkedIn CTA post, Friday short video.

Social post fields: platform, postType, copy, hashtags, media, target URL, scheduledFor, status, account.

## Publishing adapters
Implement interface:
```ts
interface SocialPublisher {
  provider: 'meta' | 'linkedin' | 'tiktok'
  publishPost(input: PublishPostInput): Promise<PublishPostResult>
  uploadMedia?(input: UploadMediaInput): Promise<UploadMediaResult>
  validateAccount(input: ValidateAccountInput): Promise<ValidateAccountResult>
}
```

## Video pipeline
Generate 15s and 30s scripts with hook, voiceover, scenes, on-screen text, caption, hashtags, and CTA. Add provider interface for Runway/Luma/Pika/HeyGen/Synthesia/mock. Store final video in R2 or external video host like Mux/Cloudinary.

## Publishing safety
Social/video publishing requires approved status, active platform account, valid token, required media, and project auto-publish or explicit user action.

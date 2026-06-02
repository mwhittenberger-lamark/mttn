# SEO, AI, and Content Pipeline

## Crawler
Use `robots-parser`, sitemap parsing, `fetch`, `cheerio`, optional Playwright in Node worker, and `p-limit` for concurrency.

Extract URL, canonical, title, meta description, h1, h2/h3 outline, body text hash, word count, internal/external links, images/alt text, JSON-LD schema, OG fields, dates, and page type.

## Keyword data
Use real providers for metrics: Google Search Console, DataForSEO, Semrush, Google Ads where connected, or manual CSV fallback. AI may expand/cluster but must not invent metrics.

## Opportunity scoring
Use deterministic score:
```text
score = volume_score*.25 + relevance_score*.25 + intent_score*.20 + gap_score*.20 + difficulty_inverse*.10
```
Normalize each component 0-100. Mark cannibalization risk when the site already has a similar page/post.

## 50 idea output
Each idea requires title, slug, primary keyword, secondary keywords, search intent, funnel stage, audience, angle, competitor gap, priority score, internal link suggestions, CTA, and rationale.

## AI engine
Use OpenAI TypeScript SDK. Store prompt version, model, input JSON, output JSON, token usage, estimated cost, status.

Prompt versions:
- `keyword-clustering-v1`
- `content-ideas-v1`
- `content-brief-v1`
- `article-draft-v1`
- `seo-metadata-v1`
- `featured-image-prompt-v1`
- `social-posts-v1`
- `video-script-v1`

## Structured outputs
Validate every AI result with Zod. If validation fails, retry once with repair prompt; if still invalid, mark failed.

## Article generation
Flow: approved idea -> brief -> approved brief -> article -> QA -> featured image -> approved article -> Sanity draft.

Article output includes title, slug, excerpt, Markdown body, Portable Text JSON, meta title, meta description, primary/secondary keywords, category/tags, FAQ, QA checklist.

## Featured image
Generate prompt, image, alt text, and aspect ratio variants. Store original in R2. Upload to Sanity during Sanity push.

## Monday scheduling
If no date is supplied, choose next available Monday at the project default hour/timezone. If today is Monday and current local time is before the publish hour, today is allowed.

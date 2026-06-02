# System Architecture

## High-level layout
```text
Astro site on Cloudflare Pages
  -> reads published content from Sanity

React + Vite dashboard
  -> calls Cloudflare Worker API

Cloudflare Worker API with Hono
  -> authenticates users
  -> validates requests with Zod
  -> reads/writes Neon Postgres through Hyperdrive
  -> writes to R2
  -> enqueues Cloudflare Queue jobs
  -> handles OAuth callbacks

Long-running Node worker
  -> consumes jobs
  -> runs crawler/Playwright
  -> calls SEO providers
  -> calls OpenAI
  -> generates images/videos
  -> publishes to Sanity/social platforms
  -> writes operational state to Postgres
```

## Service boundaries
### Astro site
Only public rendering, blog pages, SEO tags, and Sanity fetches. No AI generation, OAuth, or admin logic.

### Sanity
CMS for publishable content: posts, authors, categories, tags, images, SEO fields, editorial fields. Not a job database.

### Dashboard
Authenticated UI for setup, integrations, ideas, approvals, drafts, calendar, social posts, media, jobs, and audit logs.

### Worker API
Edge API for CRUD, auth, OAuth callbacks, lightweight orchestration, and queue production. Avoid long tasks.

### Long-running worker
Node runtime for crawling, AI, media, retries, video polling, provider APIs, and scheduled publish execution.

### Postgres
Primary source of truth for operational data: users, orgs, projects, OAuth connections, crawl results, keywords, ideas, jobs, schedules, social posts, audit logs.

### R2
Generated images, video files, thumbnails, crawl snapshots, exports, and temporary media.

## Data flow: research to Sanity
1. API creates `research_runs` row.
2. Queue receives `research.run`.
3. Worker crawls own site and competitors.
4. Worker stores `crawled_pages`.
5. Worker imports/fetches keywords.
6. Worker creates `keyword_clusters` and `content_ideas`.
7. Dashboard shows ideas.
8. User approves idea.
9. Worker generates brief/article/image.
10. User approves article.
11. Worker creates Sanity draft and records `sanity_document_id`.

## Data flow: social publishing
1. Approved article triggers social generation.
2. Worker creates `social_posts` rows.
3. User approves posts.
4. Scheduler finds due posts.
5. Worker refreshes OAuth token if needed.
6. Worker publishes through platform adapter.
7. Worker stores external post ID and audit log.

## Package boundaries
- `@ninjaops/db`: Drizzle schema/query helpers.
- `@ninjaops/shared`: Zod schemas/types/constants.
- `@ninjaops/auth`: auth, RBAC, session helpers.
- `@ninjaops/integrations`: OAuth/provider clients.
- `@ninjaops/seo-engine`: crawl, extract, score, cluster.
- `@ninjaops/ai-engine`: OpenAI prompts and structured outputs.
- `@ninjaops/sanity-engine`: Sanity documents/assets.
- `@ninjaops/social-engine`: social generation/publishing.
- `@ninjaops/video-engine`: video scripts/providers.
- `@ninjaops/storage`: R2 helpers.

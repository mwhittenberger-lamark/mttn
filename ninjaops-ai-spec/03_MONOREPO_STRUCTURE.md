# Monorepo Structure

Use pnpm workspaces.

```text
ninjaops-ai/
  apps/
    site/              # Astro public site on Cloudflare Pages
    dashboard/         # React + Vite admin app
    api/               # Cloudflare Worker API using Hono
    worker/            # Long-running Node worker
    sanity-studio/     # Sanity Studio
  packages/
    db/                # Drizzle schema, migrations, query helpers
    shared/            # Zod schemas, types, constants
    auth/              # Auth provider abstraction, RBAC
    integrations/      # OAuth + provider clients
    seo-engine/        # Crawler, extractor, keyword scoring
    ai-engine/         # OpenAI prompts, schemas, calls
    sanity-engine/     # Sanity document and asset helpers
    social-engine/     # Social generation and publishers
    video-engine/      # Video scripts and providers
    storage/           # R2 utilities
    observability/     # Logger, tracing, errors
    config/            # Shared tsconfig/lint config
  docs/
  scripts/
  pnpm-workspace.yaml
  package.json
  turbo.json
```

## Required root scripts
```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "test": "turbo test",
    "typecheck": "turbo typecheck",
    "db:generate": "pnpm --filter @ninjaops/db db:generate",
    "db:migrate": "pnpm --filter @ninjaops/db db:migrate",
    "db:studio": "pnpm --filter @ninjaops/db db:studio"
  }
}
```

## App responsibilities
### apps/site
Astro website. Fetches published posts from Sanity, renders public pages, handles SEO tags and structured data.

### apps/dashboard
React app. Uses TanStack Query, Zod, React Hook Form, Tailwind, and a component system. Shows projects, integrations, ideas, articles, calendar, social, jobs, audit logs.

### apps/api
Hono Worker. Routes, middleware, auth, DB access through Hyperdrive, queue producer, OAuth callbacks.

### apps/worker
Node process. Queue consumers, crawler, AI generation, Sanity/social publishing, token refresh, scheduled jobs.

### apps/sanity-studio
Sanity Studio with post, author, category, tag, SEO, and NinjaOps metadata schemas.

## Standards
- Strict TypeScript.
- ESM.
- Zod at runtime boundaries.
- Snake case DB tables.
- Dot-separated job names, e.g. `article.generate`.
- Provider names: `meta`, `google_ads`, `tiktok`, `linkedin`, `sanity`, `openai`.

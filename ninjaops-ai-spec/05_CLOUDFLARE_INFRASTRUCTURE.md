# Cloudflare Infrastructure

## Components
- Cloudflare Pages: Astro site.
- Cloudflare Workers: Hono API.
- Cloudflare Hyperdrive: Postgres acceleration/connection pooling.
- Cloudflare Queues: async job handoff.
- Cloudflare R2: generated media and exports.
- Wrangler: local development and deployment.

## Worker API wrangler example
```toml
name = "ninjaops-api"
main = "src/index.ts"
compatibility_date = "2026-05-25"
compatibility_flags = ["nodejs_compat"]

[vars]
APP_ENV = "production"
PUBLIC_APP_URL = "https://app.ninjaops.ai"

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "YOUR_HYPERDRIVE_ID"

[[r2_buckets]]
binding = "MEDIA_BUCKET"
bucket_name = "ninjaops-media-prod"

[[queues.producers]]
binding = "JOB_QUEUE"
queue = "ninjaops-jobs-prod"
```

## Hyperdrive DB helper
```ts
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

export function createDb(env: Env) {
  const client = postgres(env.HYPERDRIVE.connectionString, { prepare: false })
  return drizzle(client)
}
```

## R2 bucket strategy
Buckets: `ninjaops-media-dev`, `ninjaops-media-staging`, `ninjaops-media-prod`.

Key patterns:
```text
projects/{projectId}/images/{assetId}/original.png
projects/{projectId}/images/{assetId}/social-square.png
projects/{projectId}/videos/{videoJobId}/final.mp4
projects/{projectId}/crawls/{researchRunId}/{pageHash}.html
projects/{projectId}/exports/{exportId}.json
```

## Queues
Queue names: `ninjaops-jobs-dev`, `ninjaops-jobs-staging`, `ninjaops-jobs-prod`.

Message envelope:
```ts
{
  idempotencyKey: string
  jobName: string
  organizationId: string
  projectId?: string
  payload: Record<string, unknown>
  requestedByUserId?: string
  createdAt: string
}
```

## Long-running worker
Host outside Workers for heavy workloads: Railway, Render, Fly.io, ECS, DigitalOcean, or VPS. It must support Node 22+, Playwright browsers, env secrets, graceful shutdown, concurrency controls, and structured logs.

## Environment separation
Use separate Cloudflare projects/resources, Neon branches/databases, Sanity datasets, R2 buckets, Queues, and OAuth credentials for local/staging/production.

## Health routes
- `GET /health`: public basic status.
- `GET /health/deep`: protected; checks DB, R2, queue, and optionally Sanity.

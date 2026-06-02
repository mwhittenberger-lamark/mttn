# NinjaOps AI - Coding Agent Master Instructions

## Mission
Build **NinjaOps AI**, a Mike the Tech Ninja AI marketing operations platform for business owners. The system researches a website and competitors, identifies SEO opportunities, generates 50 blog ideas, writes posts, creates featured images, pushes drafts to Sanity, schedules Monday publishing, creates weekly social promotion, supports video generation, and manages OAuth connections for Meta, Google Ads, TikTok, and LinkedIn.

## Non-negotiable architecture
- Do not use Next.js.
- Use TypeScript everywhere.
- Public site: Astro on Cloudflare Pages.
- Dashboard: React + Vite.
- API: Cloudflare Workers + Hono.
- Primary operational DB: Neon Postgres.
- Worker-to-Postgres connection: Cloudflare Hyperdrive.
- ORM: Drizzle.
- Storage: Cloudflare R2.
- Async handoff: Cloudflare Queues.
- Heavy jobs: separate long-running Node worker.
- CMS: Sanity.
- AI: OpenAI TypeScript SDK.
- Secrets/tokens: encrypted at rest.
- Publishing: human approval required by default.

## Build the system in this order
1. Monorepo scaffold with pnpm workspaces and Turborepo.
2. Shared TypeScript, lint, formatting, env validation.
3. Drizzle schema and migrations.
4. Hono Worker API with auth, DB, queue helpers.
5. React dashboard shell.
6. Sanity schemas and publishing adapter.
7. Worker queue consumer and job handlers.
8. SEO crawler and keyword pipeline.
9. OpenAI structured-output generation pipeline.
10. Content approval and Sanity push flow.
11. OAuth integrations.
12. Social/video workflow.
13. Tests, deployment, smoke checks.

## Important rules for implementation
- Use Zod for all API payloads, queue payloads, and AI outputs.
- Put operational state in Postgres, not Sanity.
- Put publishable content in Sanity.
- Use R2 for binary/generated media.
- Use deterministic IDs/idempotency keys for retryable jobs.
- All jobs must be safe to retry.
- Never log raw tokens, auth codes, API keys, or secrets.
- Every critical action must write an audit log.
- Every project-scoped query must verify organization membership.

# Security, Testing, Deployment, and Acceptance

## Security
- Encrypt Sanity/OAuth tokens.
- Redact secrets from logs.
- Validate OAuth state and redirects.
- Use PKCE where supported.
- Enforce RBAC on every route.
- Scope every project query to organization membership.
- Require approval before publishing by default.
- Write audit logs for connect/disconnect, approvals, publish actions, failed publish attempts, project changes.

## Sensitive fields to redact
`access_token`, `refresh_token`, `authorization`, `code`, `client_secret`, `api_key`, `token`, `encryptedAccessToken`, `encryptedRefreshToken`.

## Tests
Use Vitest, Testing Library, and Playwright.

Unit tests: URL normalization, keyword scoring, next Monday scheduling, token crypto, RBAC, Zod schemas, Markdown to Portable Text.

Integration tests: API auth, project CRUD, queue enqueue, Sanity mock push, OAuth mock callback, article approval.

E2E happy path: create project, add competitor, start research, generate 50 ideas, approve idea, generate brief, generate article, approve article, push to Sanity, generate social posts.

## Deployment
Deploy order: DB migrations, Worker API, long-running worker, dashboard, Astro site, smoke tests.

Smoke tests: `/health`, `/me`, DB query, queue enqueue, R2 write/read, Sanity test connection.

## Acceptance criteria
The MVP is accepted when a user can complete the full workflow from project setup to Sanity draft and scheduled social posts in staging, with mock providers enabled and no secrets exposed.

Architecture acceptance: Astro, React/Vite, Hono Worker, Neon Postgres, Drizzle, Hyperdrive, R2, Queues, long-running Node worker, Sanity, no Next.js.

Security acceptance: tokens encrypted, logs redacted, RBAC works, cross-org access blocked, publishing requires approval, OAuth state validation works.

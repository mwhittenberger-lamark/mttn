# Product Requirements

## Product
**NinjaOps AI** is an AI marketing operations command center for business owners and agencies.

## Core users
### Business owner
Needs simple setup, marketing output, approval controls, and clear scheduled publishing.

### Agency operator
Needs multi-client management, OAuth integrations, audit logs, approval workflows, and repeatable content operations.

### Content strategist
Needs keyword opportunities, topic clusters, content briefs, article drafts, internal links, and calendar planning.

### Admin/developer
Needs secure integrations, logs, retries, token refresh, and provider diagnostics.

## MVP workflow
1. User logs in.
2. User creates organization and project.
3. User enters website URL, industry, service area, audience, and brand voice.
4. User connects Sanity.
5. User adds competitors.
6. User starts research run.
7. System crawls website and competitors.
8. System imports/fetches keyword and SERP metrics.
9. System clusters keywords and scores opportunities.
10. System generates exactly 50 blog ideas.
11. User approves one or more ideas.
12. System generates SEO brief.
13. User approves brief.
14. System writes article.
15. System generates featured image and alt text.
16. User approves article/image.
17. System creates Sanity draft.
18. System schedules blog for Monday.
19. System creates weekly social posts.
20. User approves/schedules social posts.
21. System optionally generates social video script and media.

## Approval states
Use these consistently: `draft`, `needs_review`, `approved`, `rejected`, `scheduled`, `published`, `failed`, `archived`.

## Business rules
- Default blog publish day is Monday at project default hour.
- Social promotion defaults to Tuesday through Friday.
- AI may create drafts; it may not publish by default.
- Auto-publish settings must be explicit per project.
- OAuth connection and publishing actions require admin/owner roles.
- All AI calls store model, prompt version, input, output, status, token usage, and estimated cost.
- All platform connections store scopes, expiration, account mappings, and health status.

## MVP exclusions
- No autonomous paid ad campaign launch.
- No Next.js.
- No raw OAuth tokens in database.
- No relying on AI to invent keyword volume/difficulty.
- No storing crawl/job data in Sanity.

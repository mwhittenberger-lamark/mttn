# Workers, Queues, and Jobs

## Job envelope
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

## Job names
Research: `research.run`, `crawl.own_site`, `crawl.competitors`, `keywords.fetch`, `keywords.cluster`, `content_ideas.generate`.

Content: `content_brief.generate`, `article.generate`, `article.generate_featured_image`, `article.push_to_sanity`, `article.publish_due`.

Social/video: `social.generate_for_article`, `social.publish`, `video.generate_concept`, `video.generate_asset`, `video.poll_provider`.

Integrations: `integrations.refresh_expiring_tokens`, `integrations.discover_accounts`.

Maintenance: `maintenance.cleanup_old_crawl_snapshots`, `maintenance.recalculate_project_stats`.

## Handler interface
```ts
interface JobHandler<TPayload> {
  jobName: string
  schema: z.ZodSchema<TPayload>
  handle(ctx: JobContext<TPayload>): Promise<void>
}
```

## Idempotency keys
Examples:
- `research.run:{researchRunId}`
- `content_ideas.generate:{researchRunId}`
- `article.generate:{briefId}`
- `article.push_to_sanity:{articleId}`
- `social.publish:{socialPostId}:{scheduledFor}`

## Retry policy
Default: 3 attempts with exponential backoff and jitter. Retry transient provider/network/rate-limit errors. Do not retry validation failures, approval failures, revoked tokens, or missing config without user action.

## Scheduled jobs
Run every 5-15 minutes:
- Publish due articles.
- Publish due social posts.
- Poll video jobs.
- Refresh expiring tokens hourly.

## Required job behavior
Every job must update status, write useful logs, avoid duplicate side effects, and expose retry in dashboard. Publishing jobs must check approval state immediately before publishing.

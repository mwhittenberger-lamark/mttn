# Hono API Specification

## Standards
- JSON only.
- Zod validation.
- Standard success/error envelopes.
- Auth middleware on protected routes.
- RBAC and project authorization on every project route.

## Success envelope
```json
{ "ok": true, "data": {} }
```

## Error envelope
```json
{ "ok": false, "error": { "code": "VALIDATION_ERROR", "message": "Request payload is invalid.", "details": {} } }
```

## Core routes
### Health
- `GET /health`
- `GET /health/deep`

### Me/orgs/projects
- `GET /me`
- `GET /organizations`
- `POST /organizations`
- `GET /organizations/:organizationId/projects`
- `POST /organizations/:organizationId/projects`
- `GET /projects/:projectId`
- `PATCH /projects/:projectId`
- `DELETE /projects/:projectId`

### Competitors
- `GET /projects/:projectId/competitors`
- `POST /projects/:projectId/competitors`
- `PATCH /competitors/:competitorId`
- `DELETE /competitors/:competitorId`

### Sanity
- `GET /projects/:projectId/sanity`
- `POST /projects/:projectId/sanity`
- `POST /projects/:projectId/sanity/test`
- `DELETE /projects/:projectId/sanity`

### OAuth/integrations
- `GET /organizations/:organizationId/integrations`
- `POST /integrations/:provider/authorize`
- `GET /oauth/:provider/callback`
- `POST /integrations/:connectionId/discover-accounts`
- `POST /projects/:projectId/platform-accounts`
- `DELETE /integrations/:connectionId`

### Research
- `GET /projects/:projectId/research-runs`
- `POST /projects/:projectId/research-runs`
- `GET /research-runs/:researchRunId`
- `POST /research-runs/:researchRunId/cancel`

### Ideas/briefs/articles
- `GET /projects/:projectId/content-ideas`
- `GET /content-ideas/:ideaId`
- `PATCH /content-ideas/:ideaId`
- `POST /content-ideas/:ideaId/approve`
- `POST /content-ideas/:ideaId/reject`
- `POST /content-ideas/:ideaId/generate-brief`
- `GET /content-briefs/:briefId`
- `PATCH /content-briefs/:briefId`
- `POST /content-briefs/:briefId/approve`
- `POST /content-briefs/:briefId/generate-article`
- `GET /projects/:projectId/articles`
- `GET /articles/:articleId`
- `PATCH /articles/:articleId`
- `POST /articles/:articleId/approve`
- `POST /articles/:articleId/generate-featured-image`
- `POST /articles/:articleId/push-to-sanity`
- `POST /articles/:articleId/schedule`
- `POST /articles/:articleId/generate-social-posts`

### Social/video/jobs/audit
- `GET /projects/:projectId/social-posts`
- `GET /social-posts/:socialPostId`
- `PATCH /social-posts/:socialPostId`
- `POST /social-posts/:socialPostId/approve`
- `POST /social-posts/:socialPostId/schedule`
- `POST /social-posts/:socialPostId/publish-now`
- `POST /articles/:articleId/generate-video`
- `GET /video-jobs/:videoJobId`
- `GET /projects/:projectId/jobs`
- `GET /jobs/:jobId`
- `POST /jobs/:jobId/retry`
- `GET /projects/:projectId/audit-logs`

## Queue-producing endpoints
Research creation, brief generation, article generation, featured image generation, Sanity push, social generation, video generation, and social publish must enqueue jobs instead of doing heavy work synchronously.

## Authorization
- Admin/owner: integrations, auto-publish settings, project delete.
- Strategist+: research and idea approval.
- Editor+: article/social approval.
- Viewer: read only.

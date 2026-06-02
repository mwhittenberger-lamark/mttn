# Database Schema

## Database
Use Neon Postgres with Drizzle. Workers connect through Cloudflare Hyperdrive. The long-running worker may connect directly to Neon or through a pooled connection.

## Core tables
### users
Fields: `id`, `external_auth_id`, `email`, `name`, `avatar_url`, `role`, `created_at`, `updated_at`.

### organizations
Fields: `id`, `name`, `slug`, `plan`, `status`, `created_at`, `updated_at`.

### organization_members
Fields: `id`, `organization_id`, `user_id`, `role`, `created_at`. Unique: organization + user.

### projects
Fields: `id`, `organization_id`, `name`, `website_url`, `industry`, `service_area`, `target_audience`, `brand_voice`, `timezone`, `default_publish_hour`, `auto_publish_articles`, `auto_publish_social`, `status`, timestamps.

## Connections
### sanity_connections
Fields: `id`, `project_id`, `sanity_project_id`, `dataset`, `api_version`, `encrypted_token`, `status`, `last_validated_at`, timestamps.

### integration_connections
Fields: `id`, `organization_id`, `project_id`, `provider`, `connected_by_user_id`, `external_user_id`, `external_user_name`, `encrypted_access_token`, `encrypted_refresh_token`, `token_type`, `scopes text[]`, `expires_at`, `refresh_expires_at`, `status`, `provider_metadata jsonb`, timestamps.

### platform_accounts
Fields: `id`, `organization_id`, `project_id`, `connection_id`, `provider`, `external_account_id`, `display_name`, `account_type`, `can_publish`, `can_read_analytics`, `can_manage_ads`, `metadata jsonb`, `status`, timestamps.

## Research
### competitors
Fields: `id`, `project_id`, `name`, `website_url`, `notes`, `status`, timestamps.

### research_runs
Fields: `id`, `project_id`, `created_by_user_id`, `status`, `started_at`, `completed_at`, `error`, `settings jsonb`, `summary jsonb`, timestamps.

### crawled_pages
Fields: `id`, `research_run_id`, `project_id`, `source_type`, `competitor_id`, `url`, `canonical_url`, `status_code`, `title`, `meta_description`, `h1`, `headings jsonb`, `body_text_hash`, `word_count`, `internal_links jsonb`, `external_links jsonb`, `images jsonb`, `schema_json jsonb`, `extracted_topics text[]`, `raw_snapshot_r2_key`, `created_at`.

## Keywords
### keyword_clusters
Fields: `id`, `project_id`, `research_run_id`, `name`, `description`, `primary_intent`, `opportunity_score`, `created_at`.

### keywords
Fields: `id`, `project_id`, `research_run_id`, `cluster_id`, `keyword`, `normalized_keyword`, `source`, `search_volume`, `difficulty`, `cpc`, `competition`, `intent`, `funnel_stage`, `opportunity_score`, `metrics jsonb`, timestamps.

## Content
### content_ideas
Fields: `id`, `project_id`, `research_run_id`, `keyword_cluster_id`, `title`, `slug`, `angle`, `primary_keyword`, `secondary_keywords text[]`, `search_intent`, `funnel_stage`, `audience`, `competitor_gap`, `priority_score`, `status`, `approved_by_user_id`, `approved_at`, `metadata jsonb`, timestamps.

### content_briefs
Fields: `id`, `project_id`, `content_idea_id`, `title`, `brief_json jsonb`, `status`, timestamps.

### articles
Fields: `id`, `project_id`, `content_idea_id`, `content_brief_id`, `title`, `slug`, `excerpt`, `markdown_body`, `portable_text_json jsonb`, `meta_title`, `meta_description`, `primary_keyword`, `secondary_keywords text[]`, `featured_image_asset_id`, `sanity_document_id`, `sanity_draft_id`, `status`, `scheduled_for`, `approved_by_user_id`, `approved_at`, `published_at`, timestamps.

### media_assets
Fields: `id`, `project_id`, `asset_type`, `source`, `r2_key`, `public_url`, `sanity_asset_id`, `mime_type`, `file_size_bytes`, `width`, `height`, `duration_seconds`, `prompt`, `alt_text`, `metadata jsonb`, `created_at`.

## Social/video
### social_posts
Fields: `id`, `project_id`, `article_id`, `platform`, `platform_account_id`, `post_type`, `copy`, `hashtags text[]`, `media_asset_ids uuid[]`, `target_url`, `status`, `scheduled_for`, `platform_post_id`, `error`, timestamps.

### video_jobs
Fields: `id`, `project_id`, `article_id`, `provider`, `status`, `concept`, `script`, `storyboard_json`, `output_media_asset_id`, `provider_job_id`, `error`, timestamps.

## Jobs and audit
### generation_jobs
Fields: `id`, `project_id`, `job_type`, `related_entity_type`, `related_entity_id`, `provider`, `model`, `prompt_version`, `input_hash`, `input_json`, `output_json`, `status`, `token_usage`, `estimated_cost_usd`, `started_at`, `completed_at`, `error`, `created_at`.

### audit_logs
Fields: `id`, `organization_id`, `project_id`, `user_id`, `action`, `entity_type`, `entity_id`, `metadata jsonb`, `ip_address`, `user_agent`, `created_at`.

## Required indexes
Create indexes for project/status/date lookups, especially: projects by org, research runs by project/status, articles by project/status/scheduled_for, social posts by project/status/scheduled_for, integration connections by org/provider, jobs by project/status, audit logs by org/date.

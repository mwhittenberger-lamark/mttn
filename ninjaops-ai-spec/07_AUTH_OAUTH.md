# Auth and OAuth

## User auth
Use Clerk or Auth0. Wrap provider details in `@ninjaops/auth`. Middleware must verify session, load/create user, and check org membership.

## Roles
- owner
- admin
- strategist
- editor
- viewer

## Platform OAuth
Build custom OAuth adapters in `@ninjaops/integrations` for Meta, Google Ads, TikTok, and LinkedIn.

Adapter interface:
```ts
interface OAuthProviderAdapter {
  provider: 'meta' | 'google_ads' | 'tiktok' | 'linkedin'
  getAuthorizationUrl(input: GetAuthorizationUrlInput): Promise<string>
  handleCallback(input: OAuthCallbackInput): Promise<OAuthCallbackResult>
  refreshConnection(input: RefreshConnectionInput): Promise<RefreshConnectionResult>
  discoverAccounts(input: DiscoverAccountsInput): Promise<PlatformAccountCandidate[]>
  revokeConnection?(input: RevokeConnectionInput): Promise<void>
}
```

## OAuth flow
1. Dashboard calls `POST /integrations/:provider/authorize`.
2. API generates signed/stored state with nonce, organizationId, projectId, provider, redirectAfterSuccess, timestamp.
3. User authorizes app.
4. Provider redirects to `/oauth/:provider/callback`.
5. API validates state.
6. API exchanges code for tokens.
7. API encrypts tokens.
8. API stores `integration_connections`.
9. API discovers accounts.
10. User selects accounts for project.
11. API stores `platform_accounts`.

## Token encryption
Never store plaintext tokens. Use AES-256-GCM or KMS. Store encrypted JSON with key version, IV, auth tag, and ciphertext. Redact tokens in logs.

## Refresh worker
Hourly job `integrations.refresh_expiring_tokens` refreshes tokens expiring within 24 hours. Mark `needs_reauth` on invalid grant/revoked refresh token.

## Provider notes
### Meta
Support Page, Instagram Business, and Ads access. Store page/account IDs. Expect app review for production permissions.

### Google Ads
Store OAuth refresh token, customer IDs, login customer ID, and use environment developer token. Google Ads is for keyword/performance/campaign workflows, not organic posting.

### TikTok
Separate content posting vs marketing/ads needs. Store advertiser/business/user IDs and refresh expiration.

### LinkedIn
Support organization/member posting and ad/reporting later. Track organization IDs, ad account IDs, scopes, and refresh expiry.

## Security requirements
- Validate OAuth state.
- Use PKCE where supported.
- Allowlist redirects.
- Encrypt tokens.
- Do not expose tokens to frontend.
- Audit connect/disconnect/reconnect/account-selection events.

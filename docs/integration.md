# Velclaw OAuth integration

## Flow

Velclaw Workspace -> Velclaw/Oauth -> Identity Provider -> Velclaw/Oauth -> Workspace session

## Contracts

- Authorization entry: `/api/oauth/authorize`
- Callback: `/oauth/callback`
- Provider credentials are server-side only.
- The client must never receive a provider client secret or private key.
- The workspace passes an explicit `return_to` destination and the OAuth service validates it against an allow-list.
- A production OAuth base URL must not be configured until its DNS, HTTPS certificate, HTTP response, and deployment target have been verified.

## Environment

```env
# Set only after a real OAuth deployment has been verified.
OAUTH_BASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
SESSION_SECRET=
ALLOWED_REDIRECT_ORIGINS=
```

Empty values are placeholders only. Never commit secrets.

## Workspace link

The main Velclaw application is the client surface. OAuth is a separate identity boundary so provider credentials and session handling are isolated from the workspace UI.

## Deployment gate

Before registering any OAuth callback with an identity provider:

1. Deploy the OAuth service.
2. Verify DNS A/AAAA/CNAME records.
3. Verify HTTPS and certificate validity.
4. Verify the live HTTP response.
5. Set `OAUTH_BASE_URL` to that verified hostname.
6. Set `ALLOWED_REDIRECT_ORIGINS` to the verified workspace origin.
7. Register the exact callback URL with the provider.
8. Run an end-to-end login test.

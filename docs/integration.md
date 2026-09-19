# Velclaw OAuth integration

## Flow

Velclaw Workspace -> Velclaw/Oauth -> Identity Provider -> Velclaw/Oauth -> Workspace session

## Contracts

- Authorization entry: /api/oauth/authorize
- Callback: /oauth/callback
- Provider credentials are server-side only.
- The client must never receive a provider client secret or private key.
- The workspace passes an explicit return_to destination and the OAuth service validates it against an allow-list.

## Environment

OAUTH_BASE_URL=https://auth.velclaw.cfd
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
SESSION_SECRET=
ALLOWED_REDIRECT_ORIGINS=https://velclaw.cfd

Empty values are placeholders only. Never commit secrets.

## Workspace link

The main Velclaw application is the client surface. OAuth is a separate identity boundary so provider credentials and session handling are isolated from the workspace UI.

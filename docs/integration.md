# Velclaw OAuth integration

## Intended flow

Velclaw Workspace -> Velclaw OAuth authorization server -> Identity Provider -> validated OAuth callback -> Workspace session.

## Current implementation boundary

The current repository contains a Next.js sign-in interface but does not contain an `app/api` authorization route or provider callback handler. The UI alone does not implement OAuth. Do not describe sign-in as production-ready until a backend is deployed and end-to-end tests pass.

The UI's optional `NEXT_PUBLIC_OAUTH_AUTHORIZE_URL` must point to a verified HTTPS authorization endpoint. It is a public URL, never a secret.

## Required server-side contracts

- Authorization entry: `/api/oauth/authorize` (only if implemented by the deployed backend).
- Callback path: register the exact path implemented by the deployed backend; do not assume a path before deployment.
- Validate `redirect_uri` against an exact server-side allow-list.
- Use cryptographically random `state` and validate it on callback.
- Use PKCE (S256) for authorization-code flows.
- Validate provider issuer, audience/client ID, redirect URI, and callback errors.
- Exchange authorization codes only on the server.
- Store client secrets and session-signing keys only in server-side environment variables.
- Issue secure, HttpOnly, SameSite cookies with appropriate expiry and rotation/revocation behavior.
- Never accept a client-supplied user identity or return destination without server-side validation.

## Environment placeholders

```env
# Configure only in the hosting provider after a deployment is verified.
OAUTH_BASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
SESSION_SECRET=
ALLOWED_REDIRECT_ORIGINS=

# Public URL used by the UI, if the UI is deployed separately.
NEXT_PUBLIC_OAUTH_AUTHORIZE_URL=
```

Empty values are placeholders. Never commit real values or ask users to paste secrets into chat.

## Deployment and release gate

1. Choose the actual hosting target and deploy the authorization backend.
2. Verify DNS, HTTPS certificate, and a health endpoint on that target.
3. Implement and test authorize, callback, state, PKCE, code exchange, session issuance, logout, and error paths.
4. Set server-side secrets and an exact redirect-origin allow-list in hosting settings.
5. Register the exact callback URL with the identity provider.
6. Configure the UI's public authorization endpoint to the verified URL.
7. Run end-to-end tests for valid login, denied redirect, mismatched state, invalid callback, and expired/revoked session.
8. Only then enable sign-in buttons and call the service production-ready.

No production hostname or credentials are assigned by this repository change.

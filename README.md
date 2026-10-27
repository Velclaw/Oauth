# Velclaw OAuth

Velclaw OAuth is the intended identity boundary for the Velclaw workspace.

## Current implementation status

- The Next.js application currently provides a sign-in interface.
- This repository does not currently contain an OAuth authorization API route or provider callback handler.
- No production OAuth base URL is confirmed in this repository.
- GitHub/email sign-in must remain disabled until a real backend endpoint, provider credentials, redirect allow-list, and session implementation are deployed and verified.
- The legacy `Login.html` page is a static interface, not an authentication service.

## Workspace integration

Intended flow:

`Velclaw workspace -> OAuth authorization server -> identity provider -> validated callback -> workspace session`

See [integration.md](docs/integration.md) for the deployment gate and required security controls.

## Local checks

```sh
npm install
npm run type-check
npm run build
```

Do not commit secrets, real user passwords, or provider credentials.

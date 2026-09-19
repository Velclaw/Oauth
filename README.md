# Oauth

Velclaw OAuth identity boundary.

## Workspace integration

The OAuth surface is the identity boundary for the main workspace:

Velclaw/VELCLAW -> Velclaw/Oauth -> Identity Provider -> Velclaw/Oauth -> Velclaw/VELCLAW

> Production OAuth hostname is intentionally **not assigned yet**. DNS and HTTPS must be verified before this repository is given a public callback hostname.

See [integration.md](docs/integration.md) for the contract and environment configuration.

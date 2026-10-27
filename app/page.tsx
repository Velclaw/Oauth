'use client'

import { useState } from 'react'
import { ArrowRight, Github, KeyRound, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

const workspaceUrl = 'https://velclaw.cfd'
const authorizeEndpoint = process.env.NEXT_PUBLIC_OAUTH_AUTHORIZE_URL

function configuredAuthorizeEndpoint(): URL | null {
  if (!authorizeEndpoint) return null

  try {
    const endpoint = new URL(authorizeEndpoint)
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) return null
    return endpoint
  } catch {
    return null
  }
}

/**
 * Client-side defense in depth only. The OAuth server must independently
 * enforce its redirect allow-list and OAuth state/PKCE validation.
 */
function safeReturnTo(candidate: string | null): string {
  if (!candidate) return workspaceUrl

  try {
    const target = new URL(candidate, workspaceUrl)
    const workspace = new URL(workspaceUrl)

    if (
      target.protocol !== 'https:' ||
      target.origin !== workspace.origin ||
      target.username ||
      target.password
    ) {
      return workspaceUrl
    }

    return target.toString()
  } catch {
    return workspaceUrl
  }
}

export default function OAuthPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const endpoint = configuredAuthorizeEndpoint()

  function begin(provider: string) {
    if (!endpoint) return
    setLoading(provider)

    const query = new URLSearchParams(window.location.search)
    const returnTo = safeReturnTo(query.get('return_to'))
    const target = new URL(endpoint.toString())
    target.searchParams.set('provider', provider)
    target.searchParams.set('redirect_uri', returnTo)

    window.location.assign(target.toString())
  }

  return (
    <main className="shell">
      <section className="panel">
        <div className="brand">
          <div className="mark">V</div>
          <div>
            <div className="eyebrow">VELCLAW AUTH</div>
            <h1>Sign in to your workspace</h1>
          </div>
        </div>

        <p className="lead">One identity across projects, agents, repositories, builds, deployment, and the Velclaw developer workspace.</p>

        <div className="providers">
          <button className="provider github" onClick={() => begin('github')} disabled={!endpoint || !!loading}>
            <Github size={19} />
            <span>{loading === 'github' ? 'Connecting…' : 'Continue with GitHub'}</span>
            <ArrowRight size={17} />
          </button>
          <button className="provider" onClick={() => begin('email')} disabled={!endpoint || !!loading}>
            <KeyRound size={19} />
            <span>{loading === 'email' ? 'Opening secure sign-in…' : 'Continue with email'}</span>
            <ArrowRight size={17} />
          </button>
        </div>

        {!endpoint && (
          <p role="status" className="legal">
            Sign-in is not enabled yet. Configure NEXT_PUBLIC_OAUTH_AUTHORIZE_URL with the verified HTTPS authorization endpoint after the OAuth backend is deployed.
          </p>
        )}

        <div className="divider"><span>SECURE ACCESS</span></div>

        <div className="security-grid">
          <div><ShieldCheck size={18} /><span>OAuth 2.1 flow</span></div>
          <div><LockKeyhole size={18} /><span>Secrets stay server-side</span></div>
          <div><Sparkles size={18} /><span>Workspace SSO ready</span></div>
        </div>

        <p className="legal">The authorization server must validate redirect destinations, OAuth state, PKCE, provider callbacks, and session creation independently.</p>
      </section>

      <aside className="side">
        <div className="status"><span className="dot" /> {endpoint ? 'AUTH ENDPOINT CONFIGURED' : 'AUTH GATEWAY NOT CONFIGURED'}</div>
        <h2>Identity layer for the Velclaw workspace.</h2>
        <p>This repository contains the sign-in interface. The backend endpoint and production credentials must be configured and verified separately before authentication can work.</p>
        <div className="flow"><span>Client</span><i>→</i><span>OAuth</span><i>→</i><span>Provider</span><i>→</i><span>Session</span></div>
        <code>/oauth/callback</code>
      </aside>
    </main>
  )
}

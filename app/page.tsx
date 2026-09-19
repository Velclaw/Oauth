'use client'

import { useState } from 'react'
import { ArrowRight, Github, KeyRound, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

const workspaceUrl = 'https://velclaw.cfd'

export default function OAuthPage() {
  const [loading, setLoading] = useState<string | null>(null)

  function begin(provider: string) {
    setLoading(provider)
    const returnTo = new URLSearchParams(window.location.search).get('return_to') || workspaceUrl
    const target = workspaceUrl + '/api/oauth/authorize?provider=' + encodeURIComponent(provider) + '&redirect_uri=' + encodeURIComponent(returnTo)
    window.location.assign(target)
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
          <button className="provider github" onClick={() => begin('github')} disabled={!!loading}>
            <Github size={19} />
            <span>{loading === 'github' ? 'Connecting…' : 'Continue with GitHub'}</span>
            <ArrowRight size={17} />
          </button>
          <button className="provider" onClick={() => begin('email')} disabled={!!loading}>
            <KeyRound size={19} />
            <span>{loading === 'email' ? 'Opening secure sign-in…' : 'Continue with email'}</span>
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="divider"><span>SECURE ACCESS</span></div>

        <div className="security-grid">
          <div><ShieldCheck size={18} /><span>OAuth 2.1 flow</span></div>
          <div><LockKeyhole size={18} /><span>Secrets stay server-side</span></div>
          <div><Sparkles size={18} /><span>Workspace SSO ready</span></div>
        </div>

        <p className="legal">By continuing, you authorize Velclaw to authenticate your account and return you to the requested workspace.</p>
      </section>

      <aside className="side">
        <div className="status"><span className="dot" /> AUTH GATEWAY ONLINE</div>
        <h2>Identity layer for the Velclaw workspace.</h2>
        <p>Authentication is separated from the application surface so credentials, callbacks, sessions, and provider configuration can evolve independently.</p>
        <div className="flow"><span>Client</span><i>→</i><span>OAuth</span><i>→</i><span>Provider</span><i>→</i><span>Session</span></div>
        <code>/oauth/callback</code>
      </aside>
    </main>
  )
}

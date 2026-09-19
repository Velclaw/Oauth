import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Velclaw OAuth',
  description: 'Secure authentication gateway for the Velclaw workspace.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

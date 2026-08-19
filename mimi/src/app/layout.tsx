import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, IBM_Plex_Mono, Inter } from 'next/font/google'
import './globals.css'

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mimi — Evidence Studio',
  description:
    'Turn thoughts into visual evidence. AI reflects honestly — it never authors your identity.',
  openGraph: {
    title: 'Mimi — Evidence Studio',
    description: 'Identity is evidence, not output.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#AEE4FF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${plexMono.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Inter, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/ui/ChatWidget'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  colorScheme: 'dark',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://flowithm.io'),
  title: {
    default: 'Flowithm — From Algorithm to Impact',
    template: '%s | Flowithm',
  },
  description:
    'We help SMBs turn AI into real business outcomes — not experiments. AI consulting, product development, and training that drives 10X impact.',
  keywords: [
    'AI consulting',
    'AI for business',
    'SMB AI solutions',
    'AI product development',
    'AI training',
    'business automation',
  ],
  authors: [{ name: 'Flowithm' }],
  creator: 'Flowithm',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowithm.io',
    siteName: 'Flowithm',
    title: 'Flowithm — From Algorithm to Impact',
    description:
      'AI Systems. Real Outcomes. 10X Impact. We help SMBs apply AI to real business problems.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Flowithm — From Algorithm to Impact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowithm — From Algorithm to Impact',
    description:
      'AI Systems. Real Outcomes. 10X Impact.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-bg text-text-primary font-body antialiased">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}

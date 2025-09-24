import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import GlobalDock from '@/components/GlobalDock'
import SmoothScroll from '@/components/SmoothScroll'

const inter = Inter({ subsets: ['latin'] })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'HMR Builders | Pakistan\'s Premier Real Estate Investment Platform',
  description: 'Invest in premium Pakistani real estate starting from just PKR 1 Million. HMR Builders offers fractional ownership of high-yield properties with SECP compliance.',
  icons: {
    icon: '/hmr-group.svg',
    shortcut: '/hmr-group.svg',
    apple: '/hmr-group.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${inter.className} ${orbitron.variable}`}>
        <SmoothScroll>
          <SessionProvider>
            <GlobalDock />
            {children}
          </SessionProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}

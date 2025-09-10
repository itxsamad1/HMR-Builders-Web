import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

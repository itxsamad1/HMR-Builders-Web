import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HMR Builders | Pakistan\'s Premier Real Estate Investment Platform',
  description: 'Invest in premium Pakistani real estate starting from just PKR 50,000. HMR Builders offers fractional ownership of high-yield properties with SECP compliance.',
  icons: {
    icon: '/hmr-group.svg',
    shortcut: '/hmr-group.svg',
    apple: '/hmr-group.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

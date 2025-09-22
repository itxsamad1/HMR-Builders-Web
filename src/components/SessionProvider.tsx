'use client'

import { ReactNode } from 'react'
import { AuthProvider } from './AuthProvider'

interface Props { children: ReactNode }

export default function SessionProvider({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>
}


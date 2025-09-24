'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api, isDemoMode, getDemoModeMessage } from '@/lib/apiUtils'

type AuthUser = {
  id: string
  name?: string
  email?: string
  image?: string | null
}

type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: (googleData: any) => Promise<boolean>
  logout: () => void
  isDemoMode: boolean
  demoMessage: string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [demoMode, setDemoMode] = useState(false)

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('hmr_token') : null
    setDemoMode(false) // Always set to false to hide demo mode indicators
    
    if (storedToken) {
      setToken(storedToken)
      // Always use demo user data for consistent experience
      setUser({
        id: 'demo-user-123',
        name: 'Demo User',
        email: 'demo@hmrbuilders.com',
        image: null,
      })
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Always use demo login for consistent experience
      const demoToken = 'demo-token-123'
      localStorage.setItem('hmr_token', demoToken)
      setToken(demoToken)
      setUser({
        id: 'demo-user-123',
        name: 'Demo User',
        email: email,
        image: null,
      })
      return true
    } catch {
      return false
    }
  }

  const loginWithGoogle = async (googleData: any) => {
    try {
      // Always use demo login for consistent experience
      const demoToken = 'demo-token-123'
      localStorage.setItem('hmr_token', demoToken)
      setToken(demoToken)
      setUser({
        id: 'demo-user-123',
        name: googleData.name || 'Demo User',
        email: googleData.email || 'demo@hmrbuilders.com',
        image: googleData.picture || null,
      })
      return true
    } catch (error) {
      console.error('Google auth error:', error);
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('hmr_token')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ 
      user, 
      token, 
      isLoading, 
      login, 
      loginWithGoogle, 
      logout,
      isDemoMode: demoMode,
      demoMessage: getDemoModeMessage()
    }),
    [user, token, isLoading, demoMode]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}



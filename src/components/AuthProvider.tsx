'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import PostLoginBillingSetup from './PostLoginBillingSetup'

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
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showBillingSetup, setShowBillingSetup] = useState(false)
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false)

  // Check if user has payment methods
  const checkPaymentMethods = async (authToken: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/payment-methods`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        const hasMethods = data.data && data.data.length > 0;
        setHasPaymentMethod(hasMethods);
        
        // Show billing setup if user just logged in and has no payment methods
        if (!hasMethods && user) {
          setShowBillingSetup(true);
        }
      }
    } catch (error) {
      console.error('Failed to check payment methods:', error);
    }
  };

  useEffect(() => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('hmr_token') : null
    if (storedToken) {
      setToken(storedToken)
      // Try to fetch current user
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/me`, {
        headers: { 
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            console.log('Token validation failed, removing token');
            throw new Error('unauthorized')
          }
          const data = await res.json()
          setUser({
            id: data.user.id || data.user._id || '',
            name: data.user.name,
            email: data.user.email,
            image: data.user.profileImage || null,
          })
          console.log('User authenticated successfully:', data.user.name);
          
          // Check payment methods for existing users
          checkPaymentMethods(storedToken)
        })
        .catch((error) => {
          console.log('Authentication failed:', error.message);
          localStorage.removeItem('hmr_token')
          setToken(null)
          setUser(null)
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) return false
      const data = await res.json()
      const t = data.token as string
      localStorage.setItem('hmr_token', t)
      setToken(t)
      setUser({
        id: data.user.id || data.user._id || '',
        name: data.user.name,
        email: data.user.email,
        image: data.user.profileImage || null,
      })
      
      // Check payment methods after successful login
      await checkPaymentMethods(t)
      
      return true
    } catch {
      return false
    }
  }

  const loginWithGoogle = async (googleData: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: googleData.email,
          name: googleData.name,
          googleId: googleData.sub || googleData.id,
          profileImage: googleData.picture
        }),
      })
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Google auth failed:', errorData);
        return false;
      }
      
      const data = await res.json()
      const t = data.token as string
      
      localStorage.setItem('hmr_token', t)
      setToken(t)
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.profileImage || null,
      })
      
      // Check payment methods after successful login
      await checkPaymentMethods(t)
      
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

  const handleBillingComplete = () => {
    setShowBillingSetup(false);
    setHasPaymentMethod(true);
  };

  const handleBillingSkip = () => {
    setShowBillingSetup(false);
  };

  const value = useMemo(
    () => ({ user, token, isLoading, login, loginWithGoogle, logout }),
    [user, token, isLoading]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showBillingSetup && (
        <PostLoginBillingSetup
          onComplete={handleBillingComplete}
          onSkip={handleBillingSkip}
        />
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}



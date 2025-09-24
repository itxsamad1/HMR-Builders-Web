'use client'

import { useEffect, useState } from 'react'
import AnimatedLoadingSkeleton from '@/components/ui/animated-loading-skeleton'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Only show on fresh page loads, not route transitions
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisited')
      
      if (!hasVisited && document.readyState !== 'complete') {
        setIsLoading(true)
        sessionStorage.setItem('hasVisited', 'true')
        
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 2000) // Show for 2 seconds
        
        return () => clearTimeout(timer)
      }
    }
  }, [])

  // Prevent hydration mismatch - don't render on server
  if (!mounted || !isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#060606] flex items-center justify-center">
      <AnimatedLoadingSkeleton />
    </div>
  )
}
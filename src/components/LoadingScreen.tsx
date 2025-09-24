'use client'

import { useEffect, useState } from 'react'
import AnimatedLoadingSkeleton from '@/components/ui/animated-loading-skeleton'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Always show loading screen initially, then hide it
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisited')
      
      // Show loading screen for first visit or if page is still loading
      if (!hasVisited || document.readyState !== 'complete') {
        setIsLoading(true)
        sessionStorage.setItem('hasVisited', 'true')
        
        // Multiple ways to ensure loading screen disappears
        const handleLoad = () => {
          setTimeout(() => {
            setIsLoading(false)
          }, 1500) // Show for 1.5 seconds minimum
        }
        
        const handleDOMContentLoaded = () => {
          setTimeout(() => {
            setIsLoading(false)
          }, 1000) // Show for 1 second minimum
        }
        
        // Listen for page load events
        if (document.readyState === 'complete') {
          handleLoad()
        } else {
          window.addEventListener('load', handleLoad)
          document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
        }
        
        // Fallback timer to ensure it always disappears
        const fallbackTimer = setTimeout(() => {
          setIsLoading(false)
        }, 3000) // Maximum 3 seconds
        
        return () => {
          window.removeEventListener('load', handleLoad)
          document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
          clearTimeout(fallbackTimer)
        }
      } else {
        // If already visited and page is complete, don't show loading
        setIsLoading(false)
      }
    }
  }, [])

  // Prevent hydration mismatch - don't render on server
  if (!mounted) {
    return null
  }

  // Don't render if not loading
  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#060606] flex items-center justify-center">
      <AnimatedLoadingSkeleton />
    </div>
  )
}
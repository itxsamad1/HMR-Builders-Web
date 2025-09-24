'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with better scrollbar integration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Animation frame
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Listen for wheel events to ensure scrollbar updates
    const handleWheel = (e: WheelEvent) => {
      // Allow natural scrollbar behavior
      if (e.target && (e.target as Element).closest('::-webkit-scrollbar')) {
        return
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    // Cleanup
    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return <div>{children}</div>
}

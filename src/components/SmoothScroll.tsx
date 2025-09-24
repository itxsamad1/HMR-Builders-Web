'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

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

    // Track scroll progress
    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      const progress = (scroll / limit) * 100
      setScrollProgress(progress)
    })

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

  // Scroll Progress Indicator
  const ScrollProgress = () => (
    <div className="fixed top-0 left-0 w-full h-1 bg-[#1a1a1a] z-40">
      <div
        className="h-full bg-gradient-to-r from-[#315dca] to-[#203a74] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )

  return (
    <>
      <ScrollProgress />
      <div>{children}</div>
    </>
  )
}

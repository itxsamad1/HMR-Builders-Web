'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  offset?: string[]
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = '',
  offset = ["start end", "end start"]
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

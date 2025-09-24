"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface GSAPScrollFeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  imageHeight?: string
}

export function GSAPScrollFeatureSteps({
  features,
  className,
  title = "How to get Started",
  imageHeight = "h-[400px]",
}: GSAPScrollFeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Handle wheel events to prevent default scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current && isElementInViewport(containerRef.current)) {
        e.preventDefault()
        e.stopPropagation()
        
        setIsScrolling(true)
        
        // Calculate scroll direction and update feature
        const delta = e.deltaY
        if (delta > 0 && currentFeature < features.length - 1) {
          setCurrentFeature(prev => prev + 1)
        } else if (delta < 0 && currentFeature > 0) {
          setCurrentFeature(prev => prev - 1)
        }
        
        // Reset scrolling state after animation
        setTimeout(() => setIsScrolling(false), 500)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (containerRef.current && isElementInViewport(containerRef.current)) {
        if (e.key === 'ArrowDown' && currentFeature < features.length - 1) {
          e.preventDefault()
          setCurrentFeature(prev => prev + 1)
        } else if (e.key === 'ArrowUp' && currentFeature > 0) {
          e.preventDefault()
          setCurrentFeature(prev => prev - 1)
        }
      }
    }

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentFeature, features.length])

  // Check if element is in viewport
  const isElementInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  return (
    <div ref={containerRef} className={cn("p-8 md:p-12 relative", className)}>
      {/* Scroll Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-2">
          {features.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentFeature 
                  ? "bg-[#315dca] scale-125" 
                  : "bg-[#666] hover:bg-[#999]"
              )}
            />
          ))}
        </div>
      </div>

      {/* Scroll Instructions */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 text-white/70 text-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <span>Scroll to navigate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <span>Use arrow keys</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center text-white">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          <div className="order-2 md:order-1 space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{ 
                  opacity: index === currentFeature ? 1 : 0.3,
                  scale: index === currentFeature ? 1.02 : 1,
                  x: index === currentFeature ? 0 : -20
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index === currentFeature
                      ? "bg-[#315dca] border-[#315dca] text-white scale-110"
                      : "bg-[#333] border-[#666] text-[#999]",
                  )}
                  animate={{
                    scale: index === currentFeature ? 1.1 : 1,
                    boxShadow: index === currentFeature 
                      ? "0 0 20px rgba(49, 93, 202, 0.5)" 
                      : "0 0 0px rgba(49, 93, 202, 0)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {index <= currentFeature ? (
                    <motion.span 
                      className="text-lg font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <motion.h3 
                    className="text-xl md:text-2xl font-semibold text-white"
                    animate={{
                      color: index === currentFeature ? "#ffffff" : "#999999"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title || feature.step}
                  </motion.h3>
                  <motion.p 
                    className="text-sm md:text-lg text-[#dee0e5]"
                    animate={{
                      opacity: index === currentFeature ? 1 : 0.7
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.content}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg"
            )}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 rounded-lg overflow-hidden"
                initial={{ y: 100, opacity: 0, rotateX: -20 }}
                animate={{ 
                  y: index === currentFeature ? 0 : 100,
                  opacity: index === currentFeature ? 1 : 0,
                  rotateX: index === currentFeature ? 0 : -20,
                  scale: index === currentFeature ? 1 : 0.95
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src={feature.image}
                  alt={feature.step}
                  className="w-full h-full object-cover transition-transform transform"
                  width={1000}
                  height={500}
                />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#060606] via-[#060606]/50 to-transparent" />
                
                {/* Feature overlay */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === currentFeature ? 1 : 0,
                    y: index === currentFeature ? 0 : 20
                  }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="bg-[#315dca]/90 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-white font-semibold text-lg">{feature.title}</h4>
                    <p className="text-white/90 text-sm">{feature.step}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

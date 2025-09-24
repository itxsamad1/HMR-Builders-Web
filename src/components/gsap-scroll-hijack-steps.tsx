"use client"

import React, { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface GSAPScrollHijackStepsProps {
  features: Feature[]
  className?: string
  title?: string
}

export function GSAPScrollHijackSteps({
  features,
  className,
  title = "How to get Started",
}: GSAPScrollHijackStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current || !stepsRef.current || !imagesRef.current) return

    const ctx = gsap.context(() => {
      // Create instant step switching
      const scrollTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center center",
        end: "+=200%",
        scrub: false,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const stepIndex = Math.floor(progress * features.length)
          const clampedIndex = Math.min(stepIndex, features.length - 1)
          
          if (clampedIndex !== currentFeature) {
            setCurrentFeature(clampedIndex)
          }
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [features, currentFeature])

  // Handle manual navigation
  const goToStep = (stepIndex: number) => {
    if (isScrollingRef.current) return
    
    isScrollingRef.current = true
    
    const element = containerRef.current
    if (element) {
      const scrollTo = element.offsetTop + (stepIndex * window.innerHeight * 0.8)
      
      gsap.to(window, {
        duration: 1,
        scrollTo: scrollTo,
        ease: "power2.inOut",
        onComplete: () => {
          isScrollingRef.current = false
        }
      })
    }
  }

  return (
    <div ref={containerRef} className={cn("relative h-screen flex items-center justify-center", className)}>
      {/* Progress Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-2">
          {features.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer border-2",
                index === currentFeature 
                  ? "bg-[#315dca] border-[#315dca] scale-125 shadow-lg shadow-[#315dca]/50" 
                  : "bg-transparent border-[#666] hover:border-[#999] hover:bg-[#999]/20"
              )}
              onClick={() => goToStep(index)}
            />
          ))}
        </div>
      </div>

      {/* Scroll Instructions */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 text-white/70 text-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-[#315dca] rounded-full animate-pulse"></div>
            <span>Scroll</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-[#315dca] rounded-full animate-pulse"></div>
            <span>Click dots</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full flex-1 items-center">
          {/* Timeline Section */}
          <div className="w-full lg:w-1/2">
            <div ref={stepsRef} className="flex flex-col justify-center space-y-2 lg:space-y-3">
              {/* Section Title */}
              <div className="text-center mb-4">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                  {title}
                </h2>
              </div>
              
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg"
                  style={{
                    backgroundColor: index === currentFeature ? 'rgba(49, 93, 202, 0.1)' : 'transparent',
                    border: index === currentFeature ? '1px solid rgba(49, 93, 202, 0.3)' : '1px solid transparent'
                  }}
                >
                  <div className={cn(
                    "w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0",
                    index === currentFeature
                      ? "bg-[#315dca] border-[#315dca] text-white"
                      : "bg-[#333] border-[#666] text-[#999]",
                  )}>
                    {index <= currentFeature ? (
                      <span className="text-xs font-bold">✓</span>
                    ) : (
                      <span className="text-xs font-semibold">{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className={cn(
                      "text-sm lg:text-base xl:text-lg font-semibold mb-0.5",
                      index === currentFeature ? "text-white" : "text-[#999]"
                    )}>
                      {feature.title || feature.step}
                    </h3>
                    <p className={cn(
                      "text-xs leading-tight",
                      index === currentFeature ? "text-[#dee0e5]" : "text-[#666]"
                    )}>
                      {feature.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Container - Centered to 3rd bullet */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div
              ref={imagesRef}
              className="relative h-[250px] lg:h-[350px] xl:h-[400px] w-full max-w-md overflow-hidden rounded-xl"
            >
            {features.map((feature, index) => (
              <div
                key={index}
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{
                  zIndex: index === currentFeature ? 10 : 1,
                  opacity: index === currentFeature ? 1 : 0,
                  display: index === currentFeature ? 'block' : 'none'
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.step}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={600}
                  priority={index === 0}
                />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#060606] via-[#060606]/70 to-transparent" />
                
                {/* Feature overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-[#315dca]/90 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-white/90 text-xs">{feature.step}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

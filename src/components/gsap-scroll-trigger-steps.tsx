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

interface GSAPScrollTriggerStepsProps {
  features: Feature[]
  className?: string
  title?: string
}

export function GSAPScrollTriggerSteps({
  features,
  className,
  title = "How to get Started",
}: GSAPScrollTriggerStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !stepsRef.current || !imagesRef.current) return

    const ctx = gsap.context(() => {
      // Create scroll-triggered animation for each step
      features.forEach((_, index) => {
        const stepElement = stepsRef.current?.children[index] as HTMLElement
        const imageElement = imagesRef.current?.children[index] as HTMLElement
        
        if (stepElement && imageElement) {
          // Step animation
          gsap.fromTo(stepElement, 
            {
              opacity: 0.3,
              x: -50,
              scale: 0.95
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top center-=${index * 100}`,
                end: `bottom center-=${(features.length - index - 1) * 100}`,
                scrub: 1,
                onEnter: () => setCurrentFeature(index),
                onEnterBack: () => setCurrentFeature(index),
                onLeave: () => {
                  if (index < features.length - 1) setCurrentFeature(index + 1)
                },
                onLeaveBack: () => {
                  if (index > 0) setCurrentFeature(index - 1)
                }
              }
            }
          )

          // Image animation
          gsap.fromTo(imageElement,
            {
              opacity: 0,
              y: 100,
              rotateX: -20,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: `top center-=${index * 100}`,
                end: `bottom center-=${(features.length - index - 1) * 100}`,
                scrub: 1,
                toggleActions: "play none none reverse"
              }
            }
          )
        }
      })

      // Progress indicator animation
      if (progressRef.current) {
        gsap.fromTo(progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1
            }
          }
        )
      }

    }, containerRef)

    return () => ctx.revert()
  }, [features])

  return (
    <div ref={containerRef} className={cn("p-8 md:p-12 relative min-h-screen", className)}>
      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-3">
          {features.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500 cursor-pointer",
                index === currentFeature 
                  ? "bg-[#315dca] scale-125 shadow-lg shadow-[#315dca]/50" 
                  : "bg-[#666] hover:bg-[#999]"
              )}
              onClick={() => {
                const element = containerRef.current
                if (element) {
                  const scrollTo = element.offsetTop + (index * window.innerHeight * 0.8)
                  window.scrollTo({ top: scrollTo, behavior: 'smooth' })
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Instructions */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 text-white/70 text-sm">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#315dca] rounded-full animate-pulse"></div>
            <span>Scroll to navigate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#315dca] rounded-full animate-pulse"></div>
            <span>Click dots to jump</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-white">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          <div ref={stepsRef} className="order-2 md:order-1 space-y-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-6 md:gap-8 p-6 rounded-xl transition-all duration-500"
                style={{
                  backgroundColor: index === currentFeature ? 'rgba(49, 93, 202, 0.1)' : 'transparent',
                  border: index === currentFeature ? '1px solid rgba(49, 93, 202, 0.3)' : '1px solid transparent'
                }}
              >
                <div className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 flex-shrink-0",
                  index === currentFeature
                    ? "bg-[#315dca] border-[#315dca] text-white"
                    : "bg-[#333] border-[#666] text-[#999]",
                )}>
                  {index <= currentFeature ? (
                    <span className="text-xl font-bold">✓</span>
                  ) : (
                    <span className="text-xl font-semibold">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className={cn(
                    "text-2xl md:text-3xl font-semibold mb-3 transition-colors duration-500",
                    index === currentFeature ? "text-white" : "text-[#999]"
                  )}>
                    {feature.title || feature.step}
                  </h3>
                  <p className={cn(
                    "text-base md:text-lg leading-relaxed transition-colors duration-500",
                    index === currentFeature ? "text-[#dee0e5]" : "text-[#666]"
                  )}>
                    {feature.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={imagesRef}
            className="order-1 md:order-2 relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="absolute inset-0 rounded-2xl overflow-hidden"
              >
                <Image
                  src={feature.image}
                  alt={feature.step}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={600}
                />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#060606] via-[#060606]/70 to-transparent" />
                
                {/* Feature overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#315dca]/90 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="text-white font-bold text-xl mb-2">{feature.title}</h4>
                    <p className="text-white/90 text-sm">{feature.step}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

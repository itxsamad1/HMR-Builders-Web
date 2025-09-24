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

interface ScrollFeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  imageHeight?: string
}

export function ScrollFeatureSteps({
  features,
  className,
  title = "How to get Started",
  imageHeight = "h-[400px]",
}: ScrollFeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Calculate which feature should be active based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const featureIndex = Math.floor(latest * features.length)
      const clampedIndex = Math.min(Math.max(featureIndex, 0), features.length - 1)
      setCurrentFeature(clampedIndex)
    })

    return () => unsubscribe()
  }, [scrollYProgress, features.length])

  return (
    <div ref={containerRef} className={cn("p-8 md:p-12", className)}>
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
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: index === currentFeature ? 1 : 0.3,
                  scale: index === currentFeature ? 1.02 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2",
                    index === currentFeature
                      ? "bg-[#315dca] border-[#315dca] text-white scale-110"
                      : "bg-[#333] border-[#666] text-[#999]",
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {feature.title || feature.step}
                  </h3>
                  <p className="text-sm md:text-lg text-[#dee0e5]">
                    {feature.content}
                  </p>
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
                  rotateX: index === currentFeature ? 0 : -20
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={feature.image}
                  alt={feature.step}
                  className="w-full h-full object-cover transition-transform transform"
                  width={1000}
                  height={500}
                />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#060606] via-[#060606]/50 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

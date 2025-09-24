'use client';

import React, { Suspense, lazy } from 'react';
import { HMRPropertyCard } from '@/components/ui/hmr-property-card';
import OptimizedImage from '@/components/OptimizedImage';

// Lazy load heavy components
const Globe = lazy(() => import('@/components/ui/globe').then(mod => ({ default: mod.Globe })));
const HyperText = lazy(() => import('@/components/ui/hyper-text').then(mod => ({ default: mod.HyperText })));
const LampContainer = lazy(() => import('@/components/ui/lamp').then(mod => ({ default: mod.LampContainer })));

// Optimized property data with smaller images
const optimizedProperties = [
  {
    id: 1,
    imageUrl: "/projects/h1-tower/main.jpg",
    imageAlt: "H1 Tower - Flagship Development",
    logo: "Building2",
    title: "H1 Tower",
    location: "HMR Waterfront, Karachi",
    overview: "The Flagship Tower of HMR Waterfront - a G+39 floors architectural masterpiece offering panoramic Arabian Sea views with world-class amenities.",
    price: 2500000,
    pricePeriod: "Investment",
    status: "active" as const,
    roi: "18-22%",
    tokens: 1000,
    availableTokens: 342,
    className: "h-96"
  },
  {
    id: 2,
    imageUrl: "/projects/saima-tower/main.jpg", 
    imageAlt: "Saima Tower - Ultra-Luxury Development",
    logo: "TrendingUp",
    title: "Saima Tower",
    location: "HMR Waterfront, Karachi",
    overview: "Ultra-luxury commercial and residential complex with state-of-the-art facilities and smart building technology.",
    price: 1750000,
    pricePeriod: "Investment", 
    status: "coming-soon" as const,
    roi: "17-21%",
    tokens: 1000,
    availableTokens: 1000,
    className: "h-96"
  },
  {
    id: 3,
    imageUrl: "/projects/aa-waterfront/main.jpg",
    imageAlt: "AA Waterfront - Smart Luxury Development", 
    logo: "Home",
    title: "AA Waterfront",
    location: "HMR Waterfront, Karachi",
    overview: "Smart luxury residential development with stunning sea views, smart home technology, and premium amenities.",
    price: 1750000,
    pricePeriod: "Investment",
    status: "coming-soon" as const,
    roi: "16-20%",
    tokens: 1000,
    availableTokens: 1000,
    className: "h-96"
  }
];

// Optimized features data with local images
const optimizedFeatures = [
  {
    title: "Regulated Platform",
    description: "SECP-compliant investment platform ensuring legal compliance and investor protection.",
    image: "/images/regulated-platform.jpg",
    alt: "Regulated platform"
  },
  {
    title: "Trading Platform", 
    description: "Secondary market for token trading with real-time pricing and liquidity.",
    image: "/images/trading-platform.jpg",
    alt: "Trading platform"
  },
  {
    title: "High Returns Investment",
    description: "Premium real estate investments with projected 15-25% annual returns.",
    image: "/images/high-returns.jpg",
    alt: "High returns investment"
  }
];

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-96">
    <div className="w-8 h-8 border-2 border-[#315dca] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Optimized Hero Section
const OptimizedHeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* HMR Logo and Brand */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-shrink-0">
              <img 
                src="/hmr-group.svg" 
                alt="HMR Group Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>
            <div className="flex flex-col">
              <Suspense fallback={<div className="h-8 bg-gray-300 rounded animate-pulse"></div>}>
                <HyperText 
                  text="HMR BUILDERS" 
                  duration={1000}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
                />
              </Suspense>
              <Suspense fallback={<div className="h-4 bg-gray-300 rounded animate-pulse mt-2"></div>}>
                <HyperText 
                  text="REAL ESTATE INVESTMENT" 
                  duration={1200}
                  className="text-sm sm:text-base text-[#315dca] font-medium"
                />
              </Suspense>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              The Future of <br />
              <span className="text-[#315dca]">REAL ESTATE</span> <br />
              Investment
            </h1>
            
            <p className="text-lg sm:text-xl text-[#dee0e5] max-w-2xl leading-relaxed">
              Invest in premium Pakistani real estate starting from just PKR 1 Million. 
              Fractional ownership of high-yield properties with SECP compliance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105 transition-all duration-300">
              Start Investing
            </button>
            <button className="border border-[#315dca] text-[#315dca] hover:bg-[#315dca] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content - Globe */}
        <div className="relative mt-6 sm:mt-8 lg:mt-0 flex items-center justify-center">
          <div className="relative w-full max-w-lg lg:max-w-2xl xl:max-w-4xl h-96 lg:h-[840px] xl:h-[960px] group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#315dca]/10 to-transparent rounded-full blur-3xl scale-110"></div>
            
            <Suspense fallback={<LoadingFallback />}>
              <Globe 
                className="w-full h-full relative z-10"
                config={{
                  width: 960,
                  height: 960,
                  onRender: () => {},
                  devicePixelRatio: 2,
                  phi: 0,
                  theta: 0.3,
                  dark: 0,
                  diffuse: 0.4,
                  mapSamples: 16000,
                  mapBrightness: 1.2,
                  baseColor: [1, 1, 1],
                  markerColor: [251 / 255, 100 / 255, 21 / 255],
                  glowColor: [1, 1, 1],
                  markers: [
                    { location: [14.5995, 120.9842], size: 0.03 },
                    { location: [19.076, 72.8777], size: 0.1 },
                    { location: [23.8103, 90.4125], size: 0.05 },
                    { location: [30.0444, 31.2357], size: 0.07 },
                    { location: [39.9042, 116.4074], size: 0.08 },
                    { location: [-23.5505, -46.6333], size: 0.1 },
                    { location: [19.4326, -99.1332], size: 0.1 },
                    { location: [40.7128, -74.006], size: 0.1 },
                    { location: [34.6937, 135.5022], size: 0.05 },
                    { location: [41.0082, 28.9784], size: 0.06 },
                  ],
                }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Optimized Features Section
const OptimizedFeaturesSection = () => (
  <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Why Choose <span className="text-[#315dca]">HMR Builders</span>?
        </h2>
        <p className="text-xl sm:text-2xl text-[#dee0e5] max-w-4xl mx-auto leading-relaxed">
          Experience the power of blockchain technology transforming traditional real estate investment
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {optimizedFeatures.map((feature, index) => (
          <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
            <OptimizedImage 
              src={feature.image}
              alt={feature.alt}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Optimized Portfolio Section
const OptimizedPortfolioSection = () => (
  <section id="properties" className="relative">
    <Suspense fallback={<LoadingFallback />}>
      <LampContainer className="bg-[#060606]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              A glimpse of our <span className="text-[#315dca]">tokenized portfolio</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {optimizedProperties.map((property, index) => (
              <HMRPropertyCard
                key={property.id}
                imageUrl={property.imageUrl}
                imageAlt={property.imageAlt}
                logo={property.logo}
                title={property.title}
                location={property.location}
                overview={property.overview}
                price={property.price}
                pricePeriod={property.pricePeriod}
                status={property.status}
                roi={property.roi}
                tokens={property.tokens}
                availableTokens={property.availableTokens}
                onInvest={() => window.open(`/properties/${property.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank')}
                className={property.className}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="inline-block bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105 transition-all duration-300">
              Explore more
            </button>
          </div>
        </div>
      </LampContainer>
    </Suspense>
  </section>
);

// Main optimized page component
const PerformanceOptimizedPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Global Consistent Background */}
      <div className="fixed inset-0 bg-[#060606]">
        <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]"></div>
      </div>
      
      {/* Page Content */}
      <div className="relative z-10">
        <OptimizedHeroSection />
        <OptimizedFeaturesSection />
        <OptimizedPortfolioSection />
      </div>
    </div>
  );
};

export default PerformanceOptimizedPage;

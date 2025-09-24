"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, TrendingUp, Shield, Users, ArrowRight, CheckCircle, MapPin, Clock, DollarSign, Home, RefreshCw, Eye, Globe as GlobeIcon, Zap, Smartphone } from 'lucide-react';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { useAuth } from '@/components/AuthProvider';
import { HMRPropertyCard } from '@/components/ui/hmr-property-card';
import { Squares } from '@/components/ui/squares-background';
import { Globe } from '@/components/ui/globe';
import { COBEOptions } from "cobe";
import AnimatedLoadingSkeleton from '@/components/ui/animated-loading-skeleton';
import { HyperText } from '@/components/ui/hyper-text';
import SectionTransition from '@/components/SectionTransition';
import ParallaxSection from '@/components/ParallaxSection';
import ParallaxText from '@/components/ParallaxText';

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
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
};

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Handle initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 second loading animation

    return () => clearTimeout(timer);
  }, []);

  const properties = [
    {
      id: 1,
      title: "H1 Tower",
      location: "HMR Waterfront, Karachi",
      price: "PKR 8.92 - 39.11 Cr",
      marketValue: "PKR 10.71 - 46.93 Cr",
      appreciation: "20.0%",
      roi: "18-22%",
      type: "Flagship Tower",
      image: "/projects/h1-tower/main.jpg",
      status: "ACTIVE",
      tokens: 1000,
      availableTokens: 342,
      minInvestment: "PKR 89,200 - 391,100"
    },
    {
      id: 2,
      title: "Saima Tower",
      location: "HMR Waterfront, Karachi",
      price: "PKR 7.50 - 28.50 Cr",
      marketValue: "PKR 9.00 - 34.20 Cr",
      appreciation: "20.8%",
      roi: "17-21%",
      type: "Ultra-Luxury",
      image: "/projects/saima-tower/main.jpg",
      status: "COMING SOON",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 75,000 - 285,000"
    },
    {
      id: 3,
      title: "AA Waterfront",
      location: "HMR Waterfront, Karachi",
      price: "PKR 6.80 - 25.20 Cr",
      marketValue: "PKR 8.16 - 30.24 Cr",
      appreciation: "22.0%",
      roi: "16-20%",
      type: "Smart Luxury",
      image: "/projects/aa-waterfront/main.jpg",
      status: "COMING SOON",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 68,000 - 252,000"
    }
  ];

  const features = [
    {
      icon: Building2,
      title: "Fractional Ownership",
      description: "Own a fraction of premium Pakistani real estate starting from just PKR 1 Million. Each token represents a fraction of a real-world asset."
    },
    {
      icon: Shield,
      title: "SECP Compliant",
      description: "Fully regulated platform with blockchain-based transactions, transparent operations, and Shariah-compliant options."
    },
    {
      icon: TrendingUp,
      title: "Diaspora Friendly",
      description: "Perfect for Pakistani diaspora in UAE, UK, US, KSA, Canada. Invest in your homeland with ease."
    },
    {
      icon: Users,
      title: "Institutional Grade",
      description: "Professional property management, independent valuations, and trustee arrangements for maximum security."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Buy",
      description: "Browse and select from our curated portfolio of premium Pakistani properties. Invest from just PKR 1 Million.",
      icon: <Smartphone className="w-8 h-8" />,
      detail: "Choose your property and investment amount through our secure platform"
    },
    {
      step: "02",
      title: "Earn",
      description: "Receive monthly rental distributions and benefit from property appreciation. Track your returns in real-time.",
      icon: <DollarSign className="w-8 h-8" />,
      detail: "Earn 15-20% annual returns through rental income and capital gains"
    },
    {
      step: "03",
      title: "Sell",
      description: "Trade your property tokens on our secondary market anytime. Full liquidity with transparent pricing.",
      icon: <RefreshCw className="w-8 h-8" />,
      detail: "Exit your investment anytime through our liquid secondary market"
    }
  ];

  const stats = [
    { value: "PKR 1M", label: "Minimum Investment" },
    { value: "15-20%", label: "Expected Returns" },
    { value: "1,000+", label: "Active Investors" },
    { value: "25+", label: "Properties Listed" }
  ];

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#060606] flex flex-col items-center justify-center overflow-hidden z-50">
        {/* Squares Background */}
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.3}
            squareSize={30}
            borderColor="#333"
            hoverFillColor="#222"
            className="w-full h-full"
          />
        </div>
        
        {/* Loading Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
          <div className="text-center mb-8">
           
            
          
            
         
          </div>
            {/* Animated Loading Skeleton - Full Width */}
            <div className="w-full max-w-6xl">
            <AnimatedLoadingSkeleton />
          </div>
         
          
        
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Global Consistent Background */}
      <div className="fixed inset-0 bg-[#060606]">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
          className="w-full h-full"
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
        <SectionTransition className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px]">
            {/* Left Content */}
             <div className="text-white dark:text-white space-y-4 sm:space-y-6">
               <div className="space-y-3 sm:space-y-4">
                 {/* Animated Status Badge */}
                 <div className="inline-flex items-center bg-[#315dca]/20 border border-[#315dca]/30 rounded-full px-3 py-1.5 text-xs font-medium text-[#315dca] animate-pulse">
                   <div className="w-1.5 h-1.5 bg-[#315dca] rounded-full mr-2 animate-ping"></div>
                   <HyperText 
                     text="LIVE PROPERTIES" 
                     duration={1200}
                     className="text-[#315dca] font-bold"
                     framerProps={{
                       initial: { opacity: 0, scale: 0.8 },
                       animate: { opacity: 1, scale: 1 },
                       exit: { opacity: 0, scale: 1.2 }
                     }}
                   />
                 </div>
                 
                 {/* Main Hero Title with HyperText */}
                 <h1 className="text-xxxl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                   <div className="mb-2">
                     <HyperText 
                       text="MORE TOKENIZED" 
                       duration={1500}
                       className="text-white font-bold"
                       framerProps={{
                         initial: { opacity: 0, y: 20 },
                         animate: { opacity: 1, y: 0 },
                         exit: { opacity: 0, y: -20 }
                       }}
                     />
                   </div>
                   <div className="text-[#315dca]">
                     <HyperText 
                       text="PROPERTIES COMING SOON!" 
                       duration={1800}
                       className="text-[#315dca] font-bold"
                       framerProps={{
                         initial: { opacity: 0, scale: 0.9 },
                         animate: { opacity: 1, scale: 1 },
                         exit: { opacity: 0, scale: 1.1 }
                       }}
                     />
                   </div>
                 </h1>
                 
                 <p className="text-sm sm:text-base lg:text-lg text-[#dee0e5] dark:text-gray-300 leading-relaxed max-w-xl">
                   Start investing in premium Pakistani real estate from just 
                   <span className="inline-block mx-1">
                     <HyperText 
                       text="PKR 1 MILLION" 
                       duration={2000}
                       className="text-[#315dca] font-bold"
                       framerProps={{
                         initial: { opacity: 0, scale: 0.8 },
                         animate: { opacity: 1, scale: 1 },
                         exit: { opacity: 0, scale: 1.2 }
                       }}
                     />
                   </span>
                   . Fractional ownership made simple.
                 </p>
               </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <a href="/get-started" className="group bg-[#315dca] hover:bg-[#203a74] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center">
                  Get started
                  <div className="ml-2 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </a>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-xs sm:text-sm text-[#dee0e5] dark:text-gray-300">
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#315dca] mr-1.5" />
                    SECP Regulated
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#315dca] mr-1.5" />
                    15-20% Returns
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Globe */}
            <div className="relative mt-6 sm:mt-8 lg:mt-0 flex items-center justify-center">
              <div className="relative w-full max-w-lg h-96 lg:h-[500px] group">
                {/* Subtle glow effect behind globe */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#315dca]/10 to-transparent rounded-full blur-3xl scale-110"></div>
                
                <Globe 
                  className="w-full h-full relative z-10"
                  config={{
                    ...GLOBE_CONFIG,
                    width: 600,
                    height: 600,
                    markers: [
                      { location: [24.8607, 67.0011], size: 0.15 }, // Karachi, Pakistan
                      { location: [31.5204, 74.3587], size: 0.1 },  // Lahore, Pakistan
                      { location: [33.6844, 73.0479], size: 0.08 }, // Islamabad, Pakistan
                      { location: [25.3960, 68.3578], size: 0.06 }, // Hyderabad, Pakistan
                      { location: [30.1798, 71.4925], size: 0.05 }, // Multan, Pakistan
                    ],
                    markerColor: [49 / 255, 93 / 255, 202 / 255], // HMR blue
                    glowColor: [49 / 255, 93 / 255, 202 / 255],
                    baseColor: [0.05, 0.05, 0.1],
                    diffuse: 0.8,
                    mapBrightness: 3,
                    dark: 0.1,
                  }}
                />
                
                {/* Floating stats overlay */}
                <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="text-white text-sm font-medium">Pakistan</div>
                  <div className="text-[#315dca] text-xs">5 Cities</div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div className="text-white text-sm font-medium">Global</div>
                  <div className="text-[#315dca] text-xs">Expansion</div>
                </div>
              </div>
            </div>
          </div>
        </SectionTransition>
      </section>

      {/* Modern Startup Features Section */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionTransition delay={0.2}>
            <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center bg-[#315dca]/10 border border-[#315dca]/30 rounded-full px-4 py-2 text-sm font-medium text-[#315dca] mb-6">
              <div className="w-2 h-2 bg-[#315dca] rounded-full mr-2 animate-pulse"></div>
              REVOLUTIONARY TECHNOLOGY
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              The Future of <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#315dca] to-[#14b8a6]">
                <div className="flex justify-center w-full">
                  <HyperText 
                    text="REAL ESTATE" 
                    duration={2000}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#315dca] to-[#14b8a6] font-bold text-center"
                    framerProps={{
                      initial: { opacity: 0, scale: 0.8 },
                      animate: { opacity: 1, scale: 1 },
                      exit: { opacity: 0, scale: 1.2 }
                    }}
                  />
                </div>
              </span>
            </h2>
            <ParallaxText speed={0.1} className="text-xl sm:text-2xl text-[#dee0e5] max-w-4xl mx-auto leading-relaxed">
              Experience the power of blockchain technology transforming traditional real estate investment
            </ParallaxText>
            </div>
          </SectionTransition>

          {/* Modern Feature Cards with Parallax */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {[
              {
                title: "Fractional Ownership",
                description: "Break down barriers to premium real estate. Own a piece of luxury Pakistani properties starting from just PKR 1 Million through our innovative tokenization platform.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Modern real estate investment",
                badge: "Start from PKR 1M",
                badgeDesc: "Minimum investment threshold"
              },
              {
                title: "Blockchain Security",
                description: "Your investments are secured by cutting-edge blockchain technology. Every transaction is transparent, immutable, and verifiable on the blockchain.",
                image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Blockchain technology",
                badge: "100% Transparent",
                badgeDesc: "All transactions on blockchain"
              },
              {
                title: "Global Accessibility",
                description: "Invest in Pakistani real estate from anywhere in the world. Our platform is designed for the global Pakistani diaspora and international investors.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Global investment platform",
                badge: "Worldwide Access",
                badgeDesc: "Invest from anywhere, anytime"
              },
              {
                title: "High Returns",
                description: "Earn 15-20% annual returns through rental income and property appreciation. Our carefully selected properties offer exceptional growth potential.",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "High returns investment",
                badge: "15-20% Returns",
                badgeDesc: "Annual expected returns"
              },
              {
                title: "Liquidity & Trading",
                description: "Trade your property tokens on our secondary market anytime. Full liquidity with transparent pricing and instant settlements.",
                image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Trading platform",
                badge: "Instant Trading",
                badgeDesc: "24/7 secondary market"
              },
              {
                title: "SECP Regulated",
                description: "Fully compliant with Pakistani regulations. Our platform is licensed and regulated by the Securities and Exchange Commission of Pakistan.",
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Regulated platform",
                badge: "SECP Licensed",
                badgeDesc: "Fully regulated platform"
              }
            ].map((feature, index) => (
              <SectionTransition key={index} delay={index * 0.2}>
                <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`space-y-6 sm:space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-4">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-[#dee0e5] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-[#315dca]/10 border border-[#315dca]/30 rounded-full px-4 py-2 text-sm font-medium text-[#315dca]">
                      {feature.badge}
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-medium text-white/80">
                      {feature.badgeDesc}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <img 
                    src={feature.image}
                    alt={feature.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Floating elements for parallax effect */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-[#315dca]/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-[#14b8a6]/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                      <h4 className="text-white font-bold text-lg mb-2">{feature.badge}</h4>
                      <p className="text-white/80 text-sm">{feature.badgeDesc}</p>
                    </div>
                  </div>

                </div>
                </div>
              </SectionTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="properties" className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTransition delay={0.2}>
            <div className="text-center mb-12 sm:mb-16">
              <ParallaxText speed={0.2}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  A glimpse of our <span className="text-[#315dca]">tokenized portfolio</span>
                </h2>
              </ParallaxText>
            </div>
          </SectionTransition>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <SectionTransition delay={0.4}>
              <ParallaxSection speed={0.1}>
                <HMRPropertyCard
              imageUrl="/projects/h1-tower/main.jpg"
              imageAlt="H1 Tower - Flagship Development"
              logo={<Building2 className="h-6 w-6 text-white/80" />}
              title="H1 Tower"
              location="HMR Waterfront, Karachi"
              overview="The Flagship Tower of HMR Waterfront - a G+39 floors architectural masterpiece offering panoramic Arabian Sea views with world-class amenities."
              price={2500000}
              pricePeriod="Investment"
              status="active"
              roi="18-22%"
              tokens={1000}
              availableTokens={342}
              onInvest={() => window.open('/properties/h1-tower', '_blank')}
              className="h-96"
                />
              </ParallaxSection>
            </SectionTransition>
            
            <SectionTransition delay={0.6}>
              <ParallaxSection speed={0.1}>
                <HMRPropertyCard
              imageUrl="/projects/saima-tower/main.jpg"
              imageAlt="Saima Tower - Ultra-Luxury Development"
              logo={<TrendingUp className="h-6 w-6 text-white/80" />}
              title="Saima Tower"
              location="HMR Waterfront, Karachi"
              overview="Ultra-luxury commercial and residential complex with state-of-the-art facilities and smart building technology."
              price={1750000}
              pricePeriod="Investment"
              status="coming-soon"
              roi="17-21%"
              tokens={1000}
              availableTokens={1000}
              onInvest={() => window.open('/properties/saima-tower', '_blank')}
              className="h-96"
                />
              </ParallaxSection>
            </SectionTransition>
            
            <SectionTransition delay={0.8}>
              <ParallaxSection speed={0.1}>
                <HMRPropertyCard
              imageUrl="/projects/aa-waterfront/main.jpg"
              imageAlt="AA Waterfront - Smart Luxury Development"
              logo={<Home className="h-6 w-6 text-white/80" />}
              title="AA Waterfront"
              location="HMR Waterfront, Karachi"
              overview="Smart luxury residential development with stunning sea views, smart home technology, and premium amenities."
              price={1750000}
              pricePeriod="Investment"
              status="coming-soon"
              roi="16-20%"
              tokens={1000}
              availableTokens={1000}
              onInvest={() => window.open('/properties/aa-waterfront', '_blank')}
              className="h-96"
                />
              </ParallaxSection>
            </SectionTransition>
          </div>
          
          <SectionTransition delay={1.0}>
            <div className="text-center mt-12">
              <Link href="/properties" className="inline-block bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors transform hover:scale-105 transition-all duration-300">
                Explore more
              </Link>
            </div>
          </SectionTransition>
        </div>
      </section>

      {/* Tokenization at a Glance Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white">
                Tokenization at a <span className="text-[#315dca]">glance</span>
              </h2>
              <div className="space-y-4 text-[#dee0e5] dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Real estate tokenization transforms physical properties into digital tokens on the blockchain. 
                  Each token represents fractional ownership of the underlying asset, making premium real estate 
                  accessible to everyone.
                </p>
                <p>
                  With HMR Builders, you can invest in luxury Pakistani properties starting from just PKR 1 Million, 
                  earn rental income, and benefit from property appreciation - all while maintaining full transparency 
                  and liquidity through our secure platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="/get-started" className="bg-[#315dca] hover:bg-[#203a74] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  Enter the future of Pakistani real estate from just PKR 1 Million
                </a>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">What is a token?</h3>
                <div className="relative rounded-2xl overflow-hidden">
                  <video 
                    className="w-full h-auto rounded-2xl"
                    preload="auto"
                    autoPlay
                    loop
                    playsInline
                    muted
                    onLoadedMetadata={(e) => e.currentTarget.muted = true}
                  >
                    <source src="/what_is_token.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="text-center">
                  <p className="text-base leading-relaxed mb-3">
                    A token is a digital unit of ownership stored on a blockchain.
                  </p>
                  <p className="text-sm leading-relaxed">
                    For example, in real estate, a property can be divided into 1,000,000 tokens, and each token represents a fraction of ownership. Buying 10,000 tokens would give you 1% ownership of the property.
                  </p>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-[#203a74] hover:bg-[#315dca] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                Learn more
                <div className="ml-2 w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16 sm:mb-20">
             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-6">
               It's really this <span className="text-[#315dca]">
                 <HyperText 
                   text="SIMPLE" 
                   duration={1800}
                   className="text-[#315dca] font-bold"
                   framerProps={{
                     initial: { opacity: 0, rotateX: 90 },
                     animate: { opacity: 1, rotateX: 0 },
                     exit: { opacity: 0, rotateX: -90 }
                   }}
                 />
               </span>
             </h2>
             <p className="text-lg sm:text-xl text-[#dee0e5] dark:text-gray-300 max-w-3xl mx-auto">
               Start your 
               <span className="inline-block mx-1">
                 <HyperText 
                   text="BLOCKCHAIN" 
                   duration={1600}
                   className="text-[#315dca] font-bold"
                   framerProps={{
                     initial: { opacity: 0, scale: 0.5 },
                     animate: { opacity: 1, scale: 1 },
                     exit: { opacity: 0, scale: 1.5 }
                   }}
                 />
               </span>
               real estate investment journey in just three easy steps
             </p>
           </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-8">
                  <div className="bg-[#315dca] text-white w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-[#315dca]/20 rounded-xl flex items-center justify-center text-[#315dca] mx-auto mb-6 group-hover:bg-[#315dca]/30 transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white dark:text-white mb-4">{step.title}</h3>
                <p className="text-[#dee0e5] dark:text-gray-300 leading-relaxed mb-4">{step.description}</p>
                <p className="text-sm text-[#315dca] font-medium">{step.detail}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a href="/get-started" className="inline-flex items-center bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              Get started
              <div className="ml-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#203a74] dark:border-gray-700 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <Image 
                  src="/hmr-group.svg" 
                  alt="HMR Group" 
                  width={32} 
                  height={32}
                  className="mr-2 sm:w-10 sm:h-10"
                />
                <div className="text-lg sm:text-xl font-bold text-white dark:text-white">
                  HMR <span className="text-[#315dca]">BUILDERS</span>
                </div>
              </div>
              <p className="text-[#dee0e5] dark:text-gray-300 mb-4 text-sm sm:text-base">
                Pakistan's premier tokenized real estate investment platform, regulated and secure. Start from just PKR 1 Million.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href="#" className="text-[#dee0e5] dark:text-gray-300 hover:text-white transition-colors text-sm">Facebook</a>
                <a href="#" className="text-[#dee0e5] dark:text-gray-300 hover:text-white transition-colors text-sm">Twitter</a>
                <a href="#" className="text-[#dee0e5] dark:text-gray-300 hover:text-white transition-colors text-sm">LinkedIn</a>
                <a href="#" className="text-[#dee0e5] dark:text-gray-300 hover:text-white transition-colors text-sm">Instagram</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white dark:text-white">Platform</h4>
              <ul className="space-y-2 text-[#dee0e5] dark:text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors text-sm">Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white dark:text-white">Resources</h4>
              <ul className="space-y-2 text-[#dee0e5] dark:text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Webinars</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white dark:text-white">Company</h4>
              <ul className="space-y-2 text-[#dee0e5] dark:text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#203a74] mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[#dee0e5] text-xs sm:text-sm text-center sm:text-left">&copy; 2025 HMR Builders. All rights reserved. | Licensed by SECP | Start from just PKR 1 Million</p>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-6 mt-4 sm:mt-0">
              <a href="#" className="text-[#dee0e5] hover:text-white transition-colors text-xs sm:text-sm">Privacy Policy</a>
              <a href="#" className="text-[#dee0e5] hover:text-white transition-colors text-xs sm:text-sm">Terms of Service</a>
              <a href="#" className="text-[#dee0e5] hover:text-white transition-colors text-xs sm:text-sm">Risk Disclosure</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;


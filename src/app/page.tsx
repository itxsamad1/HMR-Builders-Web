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
    <div className="min-h-screen hero-gradient overflow-x-hidden">

      {/* Hero Section - Vista Inspired */}
      <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Clean Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1f1f1f]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px]">
            {/* Left Content */}
             <div className="text-white dark:text-white space-y-4 sm:space-y-6">
               <div className="space-y-3 sm:space-y-4">
                 {/* Vista-Style Badge */}
                  <div className="inline-flex items-center bg-white/10 border border-white/20 rounded-sm px-4 py-2 text-xs font-medium text-white/90 uppercase tracking-wider">
                    <Building2 className="w-3 h-3 text-white/90 mr-2" />
                    TRUSTED REAL ESTATE PARTNER
                  </div>
                 
                 {/* Vista-Style Clean Title */}
                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white">
                   Premium Pakistani
                   <br />
                   <span className="font-normal">Real Estate</span>
                 </h1>
                 
                 <p className="text-lg text-white/80 leading-relaxed max-w-2xl font-light">
                   HMR Builders is a privately owned developer pursuing opportunities in Pakistan's most prestigious markets. Founded with a vision to democratize premium real estate, our portfolio spans luxury waterfront properties, commercial developments, and residential towers across Pakistan's prime locations.
                 </p>
               </div>
              
               <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                 <Link href="/properties" className="inline-flex items-center bg-white text-black px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-white/90 transition-colors">
                   Available Properties
                 </Link>
                 <Link href="/get-started" className="inline-flex items-center border border-white/20 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors">
                   Contact Us
                 </Link>
               </div>
            </div>

            {/* Right Content - Property Showcase */}
            <div className="relative mt-6 sm:mt-8 lg:mt-0 flex items-center justify-center">
              <div className="relative w-full max-w-lg h-96 lg:h-[500px] group">
                {/* Real estate glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-[#b8941f]/10 rounded-full blur-3xl scale-110"></div>
                
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
                    markerColor: [212 / 255, 175 / 255, 55 / 255], // Real estate gold
                    glowColor: [212 / 255, 175 / 255, 55 / 255],
                    baseColor: [0.1, 0.08, 0.06],
                    diffuse: 0.8,
                    mapBrightness: 2,
                    dark: 0.2,
                  }}
                />
                
                {/* Property stats overlay */}
                <div className="absolute top-4 left-4 bg-[#2c1810]/80 backdrop-blur-sm rounded-lg p-3 border border-[#d4af37]/30">
                  <div className="text-[#f5f1eb] text-sm font-medium">Pakistan</div>
                  <div className="text-[#d4af37] text-xs">Prime Locations</div>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-[#2c1810]/80 backdrop-blur-sm rounded-lg p-3 border border-[#d4af37]/30">
                  <div className="text-[#f5f1eb] text-sm font-medium">PKR 2.5B+</div>
                  <div className="text-[#d4af37] text-xs">Portfolio Value</div>
                </div>
                
                <div className="absolute top-1/2 -right-4 bg-[#2c1810]/80 backdrop-blur-sm rounded-lg p-3 border border-[#d4af37]/30 transform -translate-y-1/2">
                  <div className="text-[#f5f1eb] text-sm font-medium">15-20%</div>
                  <div className="text-[#d4af37] text-xs">Annual Returns</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#315dca]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#203a74]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

       {/* Vista-Style Features Section */}
       <section className="relative py-20 sm:py-24 lg:py-32 bg-white">
         <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vista-Style Three Pillars */}
          <div className="grid md:grid-cols-3 gap-16 md:gap-20">
            
            {/* Investing with Purpose */}
            <div className="text-center md:text-left">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Purpose" 
                  className="w-full h-64 object-cover rounded-sm"
                />
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">purpose</div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Investing with<br />
                <span className="font-normal">purpose</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Throughout our history, we've watched Pakistan's markets rise, fall and evolve – shaping the experience that guides our current investment philosophy. We invest creatively yet with discipline, seeking assets with compelling value and growth potential in Pakistan's most prestigious locations.
              </p>
            </div>

            {/* Delivering on Details */}
            <div className="text-center md:text-left">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Details" 
                  className="w-full h-64 object-cover rounded-sm"
                />
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">details</div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Delivering on<br />
                <span className="font-normal">details</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We thrive off solving complex problems. Our vertically integrated team drives projects through every stage of the development process, blending rich internal expertise with an extensive industry network. Drawing on our deep experience, we integrate lasting architecture with conscious functionality.
              </p>
            </div>

            {/* Relationships Matter */}
            <div className="text-center md:text-left">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Relationships" 
                  className="w-full h-64 object-cover rounded-sm"
                />
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">relationships</div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                Relationships<br />
                <span className="font-normal">are what matter</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We believe every good deal is founded on a great partnership. Our partnerships are built on trust, honesty and committed collaboration – many of them standing strong for decades. Championing transparency, we deliver on our promises and remain reachable 24/7.
              </p>
            </div>

          </div>
          
          {/* Vista-Style Process Section */}
          <div className="mt-24 pt-16 border-t border-gray-200">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-light text-gray-900 mb-8">
                We execute every project with a focus on costs, schedules, quality, and market-tailored solutions.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8 text-center">
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Property</div>
                <div className="font-light text-gray-900">Selection & Due Diligence</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Legal</div>
                <div className="font-light text-gray-900">Framework & Compliance</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Investment</div>
                <div className="font-light text-gray-900">Structure & Planning</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Portfolio</div>
                <div className="font-light text-gray-900">Management & Growth</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Returns</div>
                <div className="font-light text-gray-900">Distribution & Reporting</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Vista Style */}
      <section id="properties" className="py-20 sm:py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <div className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-4">solutions</div>
             <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
               Featured Projects
             </h2>
           </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
          </div>
          
           <div className="text-center mt-16">
             <Link href="/properties" className="inline-flex items-center bg-white text-black border border-gray-300 px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-50 transition-colors">
               Available Properties
             </Link>
           </div>
        </div>
      </section>

       {/* Vista-Style CTA Section */}
       <section className="py-20 sm:py-24 lg:py-32 bg-white">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
             Find your<br />
             <span className="font-normal">ideal space</span>
           </h2>
           <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
             See what's available or contact us for personalized assistance
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
             <Link href="/properties" className="inline-flex items-center bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors">
               Available Properties
             </Link>
             <Link href="/get-started" className="inline-flex items-center border border-gray-300 text-gray-900 px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-50 transition-colors">
               Contact Us
             </Link>
           </div>
         </div>
       </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="relative py-20 sm:py-24 lg:py-28 bg-[#060606] overflow-hidden">
        {/* Squares Background */}
        <div className="absolute inset-0 bg-[#060606]">
          <Squares
            direction="down"
            speed={0.3}
            squareSize={45}
            borderColor="#333"
            hoverFillColor="#222"
            className="w-full h-full"
          />
        </div>
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
      <footer className="bg-[#0e1521] dark:bg-gray-900 border-t border-[#203a74] dark:border-gray-700 py-8 sm:py-12 lg:py-16">
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


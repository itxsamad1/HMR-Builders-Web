'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, TrendingUp, Shield, Users, ArrowRight, CheckCircle, MapPin, Clock, DollarSign, Menu, X, Home, RefreshCw, Eye, Globe, Zap, Smartphone } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const properties = [
    {
      id: 1,
      title: "2 Bedroom Apartment, DHA Phase 8",
      location: "DHA Phase 8, Karachi",
      price: "PKR 1.7 million",
      marketValue: "PKR 1.95 million",
      appreciation: "17.5%",
      roi: "19.8%",
      type: "Residential",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      status: "FULLY FUNDED",
      tokens: 500,
      availableTokens: 0,
      minInvestment: "PKR 50,000"
    },
    {
      id: 2,
      title: "Commercial Tower, Gulberg III",
      location: "Gulberg III, Lahore",
      price: "PKR 1.2 million",
      marketValue: "PKR 1.41 million",
      appreciation: "17.5%",
      roi: "19.8%",
      type: "Commercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      status: "ACTIVE",
      tokens: 240,
      availableTokens: 134,
      minInvestment: "PKR 75,000"
    },
    {
      id: 3,
      title: "Boutique Hotel, Clifton",
      location: "Clifton, Karachi",
      price: "PKR 2.1 million",
      marketValue: "PKR 2.52 million",
      appreciation: "20.0%",
      roi: "22.5%",
      type: "Hospitality",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      status: "ACTIVE",
      tokens: 420,
      availableTokens: 256,
      minInvestment: "PKR 100,000"
    }
  ];

  const features = [
    {
      icon: Building2,
      title: "Fractional Ownership",
      description: "Own a fraction of premium Pakistani real estate starting from just PKR 50,000. Each token represents a fraction of a real-world asset."
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

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-2 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 z-50">
        <div className="bg-[#0e1521]/90 backdrop-blur-sm rounded-2xl shadow-navbar border border-[#203a74]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              <Link href="/how-it-works" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">How it works</Link>
              <Link href="/properties" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">Properties</Link>
              <Link href="/faqs" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">FAQs</Link>
              <Link href="/media" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">Media</Link>
            </nav>

            {/* Logo */}
            <div className="flex items-center">
              <Image 
                src="/hmr-group.svg" 
                alt="HMR Group" 
                width={32} 
                height={32}
                className="mr-2 sm:w-10 sm:h-10"
              />
              <div className="text-base sm:text-lg lg:text-xl font-bold text-white">
                HMR <span className="text-[#315dca]">BUILDERS</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              {/* Desktop buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <a href="/login" className="text-white bg-[#203a74] hover:bg-[#315dca] px-4 py-2 rounded-lg font-medium transition-colors">
                  Login
                </a>
                <a href="/get-started" className="text-white bg-[#315dca] hover:bg-[#203a74] px-4 py-2 rounded-lg font-medium transition-colors">
                  Get started
                </a>
              </div>
            </div>
          </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-[#203a74]/50">
                <nav className="flex flex-col space-y-4">
                  <Link href="/how-it-works" className="text-white hover:text-[#315dca] font-medium">How it works</Link>
                  <Link href="/properties" className="text-white hover:text-[#315dca] font-medium">Properties</Link>
                  <Link href="/faqs" className="text-white hover:text-[#315dca] font-medium">FAQs</Link>
                  <Link href="/media" className="text-white hover:text-[#315dca] font-medium">Media</Link>
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-[#203a74]/30">
                    <a href="/login" className="text-white bg-[#203a74] hover:bg-[#315dca] px-4 py-3 rounded-lg font-medium transition-colors text-center">
                      Login
                    </a>
                    <a href="/get-started" className="text-white bg-[#315dca] hover:bg-[#203a74] px-4 py-3 rounded-lg font-medium transition-colors text-center">
                      Get started
                    </a>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 lg:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="text-white dark:text-white space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center bg-[#315dca]/20 border border-[#315dca]/30 rounded-full px-3 py-1.5 text-xs font-medium text-[#315dca] animate-pulse">
                  <div className="w-1.5 h-1.5 bg-[#315dca] rounded-full mr-2 animate-ping"></div>
                  LIVE PROPERTIES
                </div>
                
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  <span className="text-white dark:text-white">MORE TOKENIZED</span><br />
                  <span className="text-[#315dca]">PROPERTIES COMING SOON!</span>
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg text-[#dee0e5] dark:text-gray-300 leading-relaxed max-w-xl">
                  Start investing in premium Pakistani real estate from just PKR 1 Million. Fractional ownership made simple.
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

            {/* Right Content - Property Card */}
            <div className="relative mt-6 sm:mt-8 lg:mt-0">
              <Link href="/properties/h1-tower" className="block">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer" style={{borderRadius: '24px 24px 32px 32px'}}>
                  <div className="relative h-40 sm:h-48 md:h-56">
                    <Image
                      src="/projects/h1-tower/main.jpg"
                      alt="H1 Tower"
                      fill
                      className="object-cover"
                    />
                    {/* Live Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-[#315dca] text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-ping"></div>
                        ACTIVE
                      </div>
                    </div>
                    {/* Property Type Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                        Flagship Tower
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6 space-y-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 text-[#315dca] mr-2" />
                      <span className="text-sm">HMR Waterfront, Karachi</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900">H1 Tower</h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tower Value:</span>
                        <span className="font-semibold text-[#315dca]">PKR 15M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Value:</span>
                        <span className="font-semibold text-gray-900">PKR 18M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Appreciation:</span>
                        <span className="font-semibold text-[#315dca]">20.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected ROI:</span>
                        <span className="font-semibold text-[#315dca]">18-22%</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-[#203a74] hover:bg-[#315dca] text-white py-3 rounded-lg font-semibold transition-colors">
                      View Tower Details
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#315dca]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#203a74]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0e1521]/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-6">
              Enter the future of <span className="text-[#315dca]">real estate</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#dee0e5] dark:text-gray-300 max-w-3xl mx-auto">
              Experience the power of tokenized real estate with HMR Builders
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Home className="w-8 h-8" />,
                title: "Fractional Ownership",
                description: "Own a piece of premium Pakistani real estate with as little as PKR 1 Million"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "High Returns",
                description: "Earn 15-20% annual returns through rental income and property appreciation"
              },
              {
                icon: <RefreshCw className="w-8 h-8" />,
                title: "Liquidity",
                description: "Trade your property tokens on our secondary market anytime"
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: "Transparency",
                description: "Full transparency with blockchain-secured ownership and transactions"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Diversification",
                description: "Invest across multiple properties and locations in Pakistan"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Global Access",
                description: "Access premium Pakistani real estate from anywhere in the world"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm border border-white/10 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8 hover:bg-white/10 dark:hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="w-16 h-16 bg-[#315dca]/20 rounded-2xl flex items-center justify-center text-[#315dca] mb-6 group-hover:bg-[#315dca]/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-[#dee0e5] dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="properties" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              A glimpse of our <span className="text-[#315dca]">tokenized portfolio</span>
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((property, index) => (
              <div key={property.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300 group" style={{borderRadius: '24px 24px 32px 32px'}}>
                {/* Property Image */}
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Live Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-[#315dca] text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center animate-pulse">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-ping"></div>
                      LIVE
                    </div>
                  </div>
                  {/* Property Type Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                      {property.type}
                    </div>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 text-[#315dca] mr-2" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">HMR Builders price:</span>
                      <span className="font-semibold text-[#315dca]">{property.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated market value:</span>
                      <span className="font-semibold text-gray-900">{property.marketValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated instant appreciation:</span>
                      <span className="font-semibold text-[#315dca]">{property.appreciation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. annualised net ROI over first 5 years:</span>
                      <span className="font-semibold text-[#315dca]">{property.roi}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#203a74] hover:bg-[#315dca] text-white py-3 rounded-lg font-semibold transition-colors">
                    View Property
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors mx-auto">
              Explore more
            </button>
          </div>
        </div>
      </section>

      {/* Tokenization at a Glance Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#0e1521]/30 dark:bg-gray-900/30">
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
      <section id="how-it-works" className="py-20 sm:py-24 lg:py-28 bg-[#0e1521]/20 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-6">
              It's really this <span className="text-[#315dca]">simple</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#dee0e5] dark:text-gray-300 max-w-3xl mx-auto">
              Start your real estate investment journey in just three easy steps
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
            <p className="text-[#dee0e5] text-xs sm:text-sm text-center sm:text-left">&copy; 2025 HMR Builders. All rights reserved. | Licensed by SECP | Start from just PKR 50,000</p>
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

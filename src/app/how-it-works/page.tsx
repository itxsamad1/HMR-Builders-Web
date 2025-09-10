'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Building2, Users, TrendingUp, Shield } from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      title: "Browse Properties",
      description: "Explore our curated selection of premium Pakistani real estate properties. Each property is thoroughly vetted and comes with detailed financial projections.",
      icon: Building2,
      details: [
        "SECP-compliant properties only",
        "Detailed financial projections",
        "Professional property valuations",
        "Location and market analysis"
      ]
    },
    {
      number: "02", 
      title: "Invest Securely",
      description: "Choose your investment amount starting from just PKR 1 Million. All transactions are secure and backed by blockchain technology.",
      icon: Shield,
      details: [
        "Minimum investment: PKR 1 Million",
        "Blockchain-secured transactions",
        "Instant ownership verification",
        "SECP regulatory compliance"
      ]
    },
    {
      number: "03",
      title: "Own Fractionally",
      description: "Receive digital tokens representing your fractional ownership. Each token is backed by real property assets.",
      icon: Users,
      details: [
        "Digital ownership certificates",
        "Transparent token distribution",
        "Real-time portfolio tracking",
        "Liquidity through secondary market"
      ]
    },
    {
      number: "04",
      title: "Earn Returns",
      description: "Receive your share of rental income and property appreciation. Track your returns through our comprehensive dashboard.",
      icon: TrendingUp,
      details: [
        "Monthly rental distributions",
        "Property appreciation gains",
        "15-22% expected annual returns",
        "Real-time performance tracking"
      ]
    }
  ];

  const benefits = [
    {
      title: "Low Entry Barrier",
      description: "Start investing with just PKR 1 Million",
      icon: "💰"
    },
    {
      title: "Diversified Portfolio",
      description: "Invest across multiple properties and locations",
      icon: "🏢"
    },
    {
      title: "Professional Management",
      description: "Properties managed by experienced professionals",
      icon: "👥"
    },
    {
      title: "Liquidity Options",
      description: "Sell your tokens on our secondary market",
      icon: "💱"
    },
    {
      title: "Transparent Process",
      description: "Full transparency in all transactions",
      icon: "🔍"
    },
    {
      title: "Regulatory Compliance",
      description: "SECP-regulated and fully compliant",
      icon: "✅"
    }
  ];

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-2 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 z-50">
        <div className="bg-[#0e1521]/90 backdrop-blur-sm rounded-2xl shadow-navbar border border-[#203a74]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center text-white hover:text-[#315dca] transition-colors text-sm sm:text-base">
              <ArrowLeft size={16} className="mr-1.5 sm:mr-2 sm:w-5 sm:h-5" />
              Back to Home
            </Link>

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

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              How <span className="text-[#315dca]">Tokenized Real Estate</span> Works
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#dee0e5] max-w-3xl mx-auto">
              Invest in premium Pakistani real estate with as little as PKR 1 Million. Our platform makes property investment accessible, secure, and profitable.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-20">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10">
                      <div className="flex items-center mb-6">
                        <div className="bg-[#315dca] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                          {step.number}
                        </div>
                        <IconComponent className="w-8 h-8 text-[#315dca]" />
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-[#dee0e5] mb-6 text-base sm:text-lg">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-[#dee0e5]">
                            <CheckCircle className="w-5 h-5 text-[#315dca] mr-3 flex-shrink-0" />
                            <span className="text-sm sm:text-base">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-gradient-to-br from-[#315dca]/20 to-[#203a74]/20 rounded-2xl p-8 sm:p-10 lg:p-12 text-center">
                      <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#315dca]/30 mb-4">
                        {step.number}
                      </div>
                      <div className="w-24 h-1 bg-[#315dca] mx-auto rounded-full"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0e1521]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-[#315dca]">HMR Builders</span>?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#dee0e5] max-w-3xl mx-auto">
              We make real estate investment simple, secure, and profitable for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl sm:text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#dee0e5] text-sm sm:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-base sm:text-lg text-[#dee0e5] mb-8">
            Join thousands of investors who are already earning returns from Pakistani real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="bg-[#315dca] hover:bg-[#203a74] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors">
              Get Started Now
            </Link>
            <Link href="/properties" className="border border-[#315dca] text-[#315dca] hover:bg-[#315dca] hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors">
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;

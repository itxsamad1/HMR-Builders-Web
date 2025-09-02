'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Building2, TrendingUp, Shield, Users, ArrowRight, CheckCircle, MapPin, Clock, DollarSign, Menu, X } from 'lucide-react';
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
      appreciation: "14.7%",
      roi: "18.2%",
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
      title: "Browse Tokenized Properties",
      description: "Explore our curated selection of HMR flagship projects - residential, commercial, and hospitality properties."
    },
    {
      step: "02",
      title: "Purchase Digital Tokens",
      description: "Buy fractional ownership tokens starting from PKR 50,000. Each token represents a fraction of the property."
    },
    {
      step: "03",
      title: "Earn Rental Yields + Appreciation",
      description: "Receive your share of rental income and property appreciation automatically through our platform."
    }
  ];

  const stats = [
    { value: "PKR 50K", label: "Minimum Investment" },
    { value: "15-22%", label: "Expected Returns" },
    { value: "1,000+", label: "Active Investors" },
    { value: "25+", label: "Properties Listed" }
  ];

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-2 z-50 mx-2 sm:mx-4 lg:mx-8">
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
              <a href="#how-it-works" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">How it works</a>
              <a href="#properties" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">Properties</a>
              <a href="#faqs" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">FAQs</a>
              <a href="#media" className="text-white hover:text-[#315dca] font-medium transition-colors text-sm lg:text-base">Media</a>
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
                  <a href="#how-it-works" className="text-white hover:text-[#315dca] font-medium">How it works</a>
                  <a href="#properties" className="text-white hover:text-[#315dca] font-medium">Properties</a>
                  <a href="#faqs" className="text-white hover:text-[#315dca] font-medium">FAQs</a>
                  <a href="#media" className="text-white hover:text-[#315dca] font-medium">Media</a>
                  
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
      <section className="relative min-h-screen flex items-center pt-16 sm:pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Missed our latest drop?{' '}
                  <span className="text-[#315dca]">MORE TOKENIZED PROPERTIES COMING SOON!</span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#dee0e5] leading-relaxed">
                  Start investing in premium Pakistani real estate from just PKR 50,000. Fractional ownership made simple.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <a href="/get-started" className="bg-[#315dca] hover:bg-[#203a74] text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold text-sm sm:text-base lg:text-lg transition-colors flex items-center">
                  Get started
                  <div className="ml-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[#dee0e5] rounded flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-[#315dca] rounded-sm"></div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Content - Property Card */}
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Property Image */}
                <div className="relative h-48 sm:h-56 lg:h-64">
                  <Image
                    src={properties[0].image}
                    alt={properties[0].title}
                    fill
                    className="object-cover"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className="bg-[#315dca] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#dee0e5] rounded-full mr-1.5 sm:mr-2"></div>
                      {properties[0].status}
                    </div>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#315dca] mr-1.5 sm:mr-2" />
                    <span className="text-xs sm:text-sm">{properties[0].location}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{properties[0].title}</h3>
                  
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">HMR Builders price:</span>
                      <span className="font-semibold">{properties[0].price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated market value:</span>
                      <span className="font-semibold">{properties[0].marketValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated instant appreciation:</span>
                      <span className="font-semibold text-[#315dca]">{properties[0].appreciation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Est. annualised net ROI over first 5 years:</span>
                      <span className="font-semibold text-[#315dca]">{properties[0].roi}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <div key={property.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 group">
                {/* Property Image */}
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Location Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className="bg-white/90 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#315dca] mr-1" />
                      {property.location}
                    </div>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white">{property.title}</h3>
                  
                  <div className="bg-[#0e1521]/50 rounded-lg p-3 sm:p-4 space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">Projected ROI</span>
                      <span className="text-[#315dca] font-semibold">{property.roi}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">Gross yield</span>
                      <span className="text-[#315dca] font-semibold">{property.appreciation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center mx-auto">
              Explore more
              <div className="ml-2 w-6 h-6 bg-[#dee0e5] rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-[#315dca] rounded-sm"></div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-[#dee0e5]">Simple steps to start your real estate investment journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#315dca] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">{step.step}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[#dee0e5]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0e1521] border-t border-[#203a74] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image 
                  src="/hmr-group.svg" 
                  alt="HMR Group" 
                  width={32} 
                  height={32}
                  className="mr-2"
                />
                <div className="text-xl font-bold text-white">
                  HMR <span className="text-[#315dca]">BUILDERS</span>
                </div>
              </div>
              <p className="text-[#dee0e5] mb-4">
                Pakistan's premier tokenized real estate investment platform, regulated and secure. Start from just PKR 50,000.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#dee0e5] hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-[#dee0e5] hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-[#dee0e5] hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-[#dee0e5] hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-[#dee0e5]">
                <li><a href="#" className="hover:text-white transition-colors">Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-[#dee0e5]">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-[#dee0e5]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#203a74] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#dee0e5]">&copy; 2025 HMR Builders. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-[#dee0e5] hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#dee0e5] hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-[#dee0e5] hover:text-white transition-colors">Risk Disclosure</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

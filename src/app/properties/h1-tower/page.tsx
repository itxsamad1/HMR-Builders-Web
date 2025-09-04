'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  TrendingUp, 
  Users, 
  Shield,
  Car,
  Wifi,
  Waves,
  Dumbbell,
  Camera,
  Home,
  Star,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const H1TowerPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const propertyImages = [
    "/projects/h1-tower/main.jpg",
    "/projects/h1-tower/feature1.jpg",
    "/projects/h1-tower/feature2.jpg",
    "/projects/h1-tower/feature3.jpg",
    "/projects/h1-tower/feature4.jpg"
  ];

  const features = [
    { icon: Home, title: "Elegant Reception", description: "Grand lobby with 24/7 concierge service" },
    { icon: Users, title: "24 hours Concierge", description: "Round-the-clock concierge service" },
    { icon: Waves, title: "Sea and Boulevard Apartments", description: "Stunning waterfront and city views" },
    { icon: Waves, title: "Infinity Pool", description: "Rooftop infinity pool with panoramic views" },
    { icon: Building, title: "Multi-Purpose Hall", description: "Community space for events and gatherings" },
    { icon: Dumbbell, title: "Fully Equipped Gym", description: "State-of-the-art fitness center" },
    { icon: Home, title: "Spacious Bedrooms", description: "Large bedrooms with built-in wardrobes" },
    { icon: Home, title: "Modern Bathrooms", description: "Premium fixtures and contemporary design" },
    { icon: Home, title: "Built in Kitchen", description: "Fully fitted kitchen with modern appliances" },
    { icon: Home, title: "Maid's Room", description: "Dedicated service quarters" },
    { icon: Building, title: "High Speed Elevators", description: "Fast and reliable elevator systems" },
    { icon: Building, title: "Retail Outlets", description: "Ground floor commercial spaces" },
    { icon: Shield, title: "Fire life safety certified lifts", description: "Advanced fire safety and evacuation systems" },
    { icon: Shield, title: "Evacuation System", description: "Comprehensive emergency evacuation systems" },
    { icon: Camera, title: "24/7 CCTV Surveillance", description: "Complete security monitoring" },
    { icon: Car, title: "8 Floors Parking", description: "Dedicated parking with driver's room" },
    { icon: Shield, title: "2 Emergency exit Staircases", description: "Emergency exit staircases on each floor" },
    { icon: Car, title: "Driver's room on each parking floor", description: "Dedicated driver facilities" }
  ];

  const unitTypes = [
    { type: "Townhouse", area: "2,500 sq ft", price: "PKR 8.5M", bedrooms: 3, bathrooms: 4 },
    { type: "1 Bedroom", area: "750 sq ft", price: "PKR 3.2M", bedrooms: 1, bathrooms: 1 },
    { type: "2 Bedroom", area: "1,200 sq ft", price: "PKR 4.8M", bedrooms: 2, bathrooms: 2 },
    { type: "3 Bedroom", area: "1,650 sq ft", price: "PKR 6.5M", bedrooms: 3, bathrooms: 3 },
    { type: "4 Bedroom", area: "2,100 sq ft", price: "PKR 8.2M", bedrooms: 4, bathrooms: 4 },
    { type: "Penthouse", area: "3,000 sq ft", price: "PKR 12.5M", bedrooms: 4, bathrooms: 5 }
  ];

  const investmentDetails = {
    totalValue: "PKR 15 Million",
    marketValue: "PKR 18 Million",
    appreciation: "20.0%",
    expectedROI: "18-22%",
    minInvestment: "PKR 1,000,000",
    totalTokens: 1500,
    availableTokens: 847,
    pricePerToken: "PKR 10,000"
  };

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-2 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 z-50">
        <div className="bg-[#0e1521]/90 backdrop-blur-sm rounded-2xl shadow-navbar border border-[#203a74]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <Link href="/properties" className="flex items-center text-white hover:text-[#315dca] transition-colors text-sm sm:text-base">
                <ArrowLeft size={16} className="mr-1.5 sm:mr-2 sm:w-5 sm:h-5" />
                Back to Properties
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

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image Gallery */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - Property Info */}
            <div className="space-y-6">
              <div className="flex items-center text-[#315dca] text-sm font-medium">
                <MapPin className="w-4 h-4 mr-2" />
                HMR Waterfront, Karachi
              </div>
              
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  H1 Tower
                  <span className="block text-[#315dca] text-xl sm:text-2xl lg:text-3xl font-medium mt-2">
                    The Flagship Tower
                  </span>
                </h1>
                <p className="text-[#dee0e5] text-lg leading-relaxed">
                  H1 Tower is the Flagship Tower of HMR Waterfront. A stunning skyline that will inspire residents and visitors from around the world. It is a profound architecture, comprising of Ground + 34 floors of luxury living with a grand lobby to welcome you.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Building className="w-6 h-6 text-[#315dca] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">Ground + 34</div>
                  <div className="text-[#dee0e5] text-xs">Floors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Home className="w-6 h-6 text-[#315dca] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">6 Types</div>
                  <div className="text-[#dee0e5] text-xs">Unit Options</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-[#315dca] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">18-22%</div>
                  <div className="text-[#dee0e5] text-xs">Expected ROI</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Shield className="w-6 h-6 text-[#315dca] mx-auto mb-2" />
                  <div className="text-white font-semibold text-sm">SECP</div>
                  <div className="text-[#dee0e5] text-xs">Regulated</div>
                </div>
              </div>
            </div>

            {/* Right - Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <Image
                  src={propertyImages[activeImageIndex]}
                  alt="H1 Tower"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-semibold mb-2">H1 Tower - Flagship Development</div>
                  <div className="flex space-x-2">
                    {propertyImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          activeImageIndex === index ? 'bg-[#315dca]' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                      activeImageIndex === index ? 'ring-2 ring-[#315dca]' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={image} alt={`View ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['overview', 'features', 'units', 'investment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-[#315dca] text-white shadow-lg'
                    : 'bg-white/10 text-[#dee0e5] hover:bg-white/20'
                }`}
              >
                {tab === 'investment' ? 'Investment Details' : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">About H1 Tower</h3>
                  <p className="text-[#dee0e5] leading-relaxed mb-6">
                    H1 Tower stands as the crown jewel of HMR Waterfront, representing the pinnacle of luxury living in Karachi. This architectural masterpiece rises 34 floors above the waterfront, offering residents unparalleled views of the Arabian Sea and the city skyline.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Premium waterfront location</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">World-class amenities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">24/7 concierge service</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Advanced security systems</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Location Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-[#315dca] mr-3 mt-1" />
                      <div>
                        <div className="text-white font-semibold">Prime Waterfront Location</div>
                        <div className="text-[#dee0e5] text-sm">Direct access to Karachi's premium waterfront district</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Car className="w-5 h-5 text-[#315dca] mr-3 mt-1" />
                      <div>
                        <div className="text-white font-semibold">Excellent Connectivity</div>
                        <div className="text-[#dee0e5] text-sm">Easy access to major highways and business districts</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building className="w-5 h-5 text-[#315dca] mr-3 mt-1" />
                      <div>
                        <div className="text-white font-semibold">Integrated Development</div>
                        <div className="text-[#dee0e5] text-sm">Part of the comprehensive HMR Waterfront project</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#315dca]/20 p-3 rounded-lg group-hover:bg-[#315dca]/30 transition-colors">
                        <feature.icon className="w-6 h-6 text-[#315dca]" />
                      </div>
                    </div>
                    <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                    <p className="text-[#dee0e5] text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'units' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {unitTypes.map((unit, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-bold text-lg">{unit.type}</h4>
                      <div className="text-[#315dca] font-semibold">{unit.price}</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#dee0e5]">Area:</span>
                        <span className="text-white">{unit.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#dee0e5]">Bedrooms:</span>
                        <span className="text-white">{unit.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#dee0e5]">Bathrooms:</span>
                        <span className="text-white">{unit.bathrooms}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-[#315dca] hover:bg-[#203a74] text-white py-2 rounded-lg font-medium transition-colors">
                      View Floor Plan
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'investment' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Investment Overview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-[#dee0e5]">Total Tower Value:</span>
                      <span className="text-white font-semibold text-lg">{investmentDetails.totalValue}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-[#dee0e5]">Current Market Value:</span>
                      <span className="text-white font-semibold text-lg">{investmentDetails.marketValue}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-[#dee0e5]">Appreciation:</span>
                      <span className="text-[#315dca] font-semibold text-lg">{investmentDetails.appreciation}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-[#dee0e5]">Expected ROI:</span>
                      <span className="text-[#315dca] font-semibold text-lg">{investmentDetails.expectedROI}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-[#dee0e5]">Minimum Investment:</span>
                      <span className="text-white font-semibold text-lg">{investmentDetails.minInvestment}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Token Information</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-[#dee0e5]">Total Tokens:</span>
                      <span className="text-white font-semibold">{investmentDetails.totalTokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-[#dee0e5]">Available Tokens:</span>
                      <span className="text-[#315dca] font-semibold">{investmentDetails.availableTokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-[#dee0e5]">Price per Token:</span>
                      <span className="text-white font-semibold">{investmentDetails.pricePerToken}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-[#dee0e5] mb-2">
                      <span>Token Availability</span>
                      <span>{Math.round((investmentDetails.availableTokens / investmentDetails.totalTokens) * 100)}% Available</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-[#315dca] to-[#203a74] h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${(investmentDetails.availableTokens / investmentDetails.totalTokens) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-[#315dca] to-[#203a74] hover:from-[#203a74] hover:to-[#315dca] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Invest in H1 Tower
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0e1521]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Invest in H1 Tower?
          </h2>
          <p className="text-[#dee0e5] text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of investors who have already secured their stake in Pakistan's most prestigious waterfront development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#315dca] to-[#203a74] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Investing Now
            </button>
            <button className="border-2 border-[#315dca] text-[#315dca] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#315dca] hover:text-white transition-all duration-300">
              Schedule a Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default H1TowerPage;

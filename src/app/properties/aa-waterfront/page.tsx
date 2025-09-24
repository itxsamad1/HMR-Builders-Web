"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  TrendingUp, 
  Users, 
  Home,
  Waves,
  Dumbbell,
  Shield,
  Camera,
  Car,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const AAWaterfrontPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('tokens');
  const { user } = useAuth();

  const propertyImages = [
    "/projects/aa-waterfront/main.jpg",
    "/projects/aa-waterfront/feature1.jpg",
    "/projects/aa-waterfront/feature2.jpg",
    "/projects/aa-waterfront/feature3.jpg",
    "/projects/aa-waterfront/feature4.jpg"
  ];

  const features = [
    { icon: Building, title: "Grand Reception Area", description: "Elegant entrance with luxury finishes" },
    { icon: Home, title: "Smart Home Apartments", description: "Intelligent home automation systems" },
    { icon: Home, title: "Luxury Lounge Area", description: "Premium common spaces for residents" },
    { icon: Building, title: "Community Hall", description: "Spacious venue for events and gatherings" },
    { icon: Waves, title: "Infinity Swimming Pool", description: "Stunning pool with panoramic sea views" },
    { icon: Building, title: "Premium Retail Showrooms", description: "High-end retail spaces on ground floor" },
    { icon: Building, title: "Executive Meeting Room", description: "Professional meeting facilities" },
    { icon: Home, title: "Prayer Area", description: "Dedicated prayer space for residents" },
    { icon: Home, title: "Wellness Sauna", description: "Luxury wellness and relaxation facilities" },
    { icon: Home, title: "Steam Room", description: "Premium steam and spa facilities" },
    { icon: Home, title: "Children's Play Area", description: "Safe and fun play space for children" },
    { icon: Home, title: "Gaming Zone", description: "Entertainment area with gaming facilities" },
    { icon: Dumbbell, title: "State-of-Art Gym", description: "Modern fitness center with latest equipment" },
    { icon: Car, title: "Multi-Level Parking", description: "Extensive parking facilities" }
  ];

  const unitTypes = [
    { 
      type: "1-Bedroom Smart Apartment", 
      area: "1,000-1,200 sq ft", 
      price: "PKR 6.80 Cr", 
      bedrooms: 1, 
      bathrooms: 1,
      tokens: 1000,
      tokenPrice: "PKR 68,000"
    },
    { 
      type: "2-Bedroom Sea View Apartment", 
      area: "1,600-2,000 sq ft", 
      price: "PKR 11.50-14.00 Cr", 
      bedrooms: 2, 
      bathrooms: 2,
      tokens: 1000,
      tokenPrice: "PKR 115,000-140,000"
    },
    { 
      type: "3-Bedroom Premium Apartment", 
      area: "2,200-2,800 sq ft", 
      price: "PKR 16.50-20.00 Cr", 
      bedrooms: 3, 
      bathrooms: 3,
      tokens: 1000,
      tokenPrice: "PKR 165,000-200,000"
    },
    { 
      type: "4-Bedroom Elite Apartment", 
      area: "3,000-3,600 sq ft", 
      price: "PKR 22.00-25.20 Cr", 
      bedrooms: 4, 
      bathrooms: 4,
      tokens: 1000,
      tokenPrice: "PKR 220,000-252,000"
    },
    { 
      type: "6-Bedroom Penthouse with Private Pool", 
      area: "5,000-6,500 sq ft", 
      price: "PKR 35.00+ Cr", 
      bedrooms: 6, 
      bathrooms: 6,
      tokens: 1000,
      tokenPrice: "PKR 350,000+"
    }
  ];

  const investmentDetails = {
    totalValue: "PKR 6.80 - 25.20 Cr",
    marketValue: "PKR 8.16 - 30.24 Cr", 
    appreciation: "22.0%",
    expectedROI: "16-20%",
    minInvestment: "PKR 68,000 - 252,000",
    totalTokens: 1000,
    availableTokens: 1000,
    pricePerToken: "PKR 68,000 - 252,000",
    constructionProgress: "Design Phase",
    handover: "2027-2028"
  };

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">

      {/* Main Content */}
      <main className="pt-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/properties" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={propertyImages[activeImageIndex]}
                  alt="AA Waterfront"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                      activeImageIndex === index ? 'ring-2 ring-[#315dca]' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`AA Waterfront ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">AA Waterfront</h1>
                <div className="flex items-center text-white/80 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    COMING SOON
                  </span>
                  <span className="bg-[#315dca]/20 text-[#315dca] px-3 py-1 rounded-full text-sm font-medium">
                    RWA Token
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm">Price Range</div>
                  <div className="text-white text-xl font-bold">PKR 6.80 - 25.20 Cr</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm">Expected ROI</div>
                  <div className="text-white text-xl font-bold">16-20%</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm">Floors</div>
                  <div className="text-white text-xl font-bold">Ground + 37</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm">Handover</div>
                  <div className="text-white text-xl font-bold">2027-2028</div>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed">
                AA Waterfront embodies extraordinary living at HMR Waterfront. The Ground + 37 storey project features stunning apartments with expensive sea views, smart luxurious apartments, and smart duplex penthouses that redefine comfortable coastal lifestyles.
              </p>

              <div className="flex space-x-4">
                <button className="bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Get Notified
                </button>
                <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-white/20">
            <nav className="flex space-x-8">
              {[
                { id: 'tokens', label: 'Tokens' },
                { id: 'overview', label: 'Overview' },
                { id: 'features', label: 'Features & Amenities' },
                { id: 'investment', label: 'Investment Details' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#315dca] text-[#315dca]'
                      : 'border-transparent text-white/60 hover:text-white/80'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-12">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">About AA Waterfront</h3>
                  <p className="text-[#dee0e5] leading-relaxed mb-6">
                    AA Waterfront represents the future of smart luxury living at HMR Waterfront. This innovative 37-storey residential tower combines cutting-edge technology with stunning sea views, creating an unparalleled living experience.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Smart home automation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Expensive sea views</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Premium amenities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Modern architecture</span>
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
                        <div className="text-[#dee0e5] text-sm">Direct access to Arabian Sea corridor</div>
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

            {activeTab === 'tokens' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {unitTypes.map((unit, index) => (
                  <div key={index} className="bg-white/95 backdrop-blur-sm rounded-xl p-6 hover:bg-white transition-all duration-300 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900 font-bold text-lg">{unit.type}</h4>
                      <div className="text-[#315dca] font-semibold">{unit.price}</div>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="text-gray-900 font-medium">{unit.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="text-gray-900 font-medium">{unit.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="text-gray-900 font-medium">{unit.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tokens:</span>
                        <span className="text-[#315dca] font-semibold">{unit.tokens}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Token Price:</span>
                        <span className="text-[#315dca] font-semibold">{unit.tokenPrice}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Floor plan for ${unit.type} will be available soon!`)}
                      className="w-full bg-[#315dca] hover:bg-[#203a74] text-white py-2 rounded-lg font-medium transition-colors"
                    >
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
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Total Value Range</span>
                      <span className="text-white font-semibold">{investmentDetails.totalValue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Expected Market Value</span>
                      <span className="text-white font-semibold">{investmentDetails.marketValue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Expected Appreciation</span>
                      <span className="text-green-400 font-semibold">{investmentDetails.appreciation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Expected ROI</span>
                      <span className="text-green-400 font-semibold">{investmentDetails.expectedROI}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Minimum Investment</span>
                      <span className="text-[#315dca] font-semibold">{investmentDetails.minInvestment}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Token Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Total Tokens per Unit</span>
                      <span className="text-white font-semibold">{investmentDetails.totalTokens}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Available Tokens</span>
                      <span className="text-white font-semibold">{investmentDetails.availableTokens}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Price per Token</span>
                      <span className="text-[#315dca] font-semibold">{investmentDetails.pricePerToken}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Construction Progress</span>
                      <span className="text-orange-400 font-semibold">{investmentDetails.constructionProgress}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Expected Handover</span>
                      <span className="text-white font-semibold">{investmentDetails.handover}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AAWaterfrontPage;

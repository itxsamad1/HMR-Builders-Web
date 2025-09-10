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
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { useSession } from 'next-auth/react';

const GoldCrestBaySandsPage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const { data: session } = useSession();

  const propertyImages = [
    "/projects/gold-crest-bay-sands/main.jpg"
  ];

  const features = [
    { icon: Waves, title: "Resort-Style Infinity Pool", description: "Stunning infinity pool with beachfront views" },
    { icon: Building, title: "Alluring Recreational Floor", description: "Premium recreational and entertainment facilities" },
    { icon: Building, title: "Grand Community Hall", description: "Spacious venue for events and gatherings" },
    { icon: Home, title: "Premium Cafeteria", description: "High-end dining facilities for residents" },
    { icon: Dumbbell, title: "Resort Fitness Center", description: "State-of-the-art gym with resort-style amenities" },
    { icon: Building, title: "Executive Business Centre", description: "Professional business and meeting facilities" },
    { icon: Home, title: "Luxury Sauna", description: "Premium wellness and relaxation facilities" },
    { icon: Home, title: "Professional Day Care Center", description: "On-site childcare services" },
    { icon: Home, title: "Prayer Hall", description: "Dedicated prayer space for residents" },
    { icon: Home, title: "Indoor Gaming Zone", description: "Entertainment area with gaming facilities" },
    { icon: Home, title: "Kids Play Area", description: "Safe and fun play space for children" },
    { icon: Building, title: "Double Height Premium Shops", description: "Premium ground floor retail spaces" }
  ];

  const unitTypes = [
    { 
      type: "1-Bedroom Resort View Apartment", 
      area: "850-1,050 sq ft", 
      price: "PKR 5.50 Cr", 
      bedrooms: 1, 
      bathrooms: 1,
      tokens: 1000,
      tokenPrice: "PKR 55,000"
    },
    { 
      type: "2-Bedroom Beachfront Apartment", 
      area: "1,300-1,700 sq ft", 
      price: "PKR 9.00-12.00 Cr", 
      bedrooms: 2, 
      bathrooms: 2,
      tokens: 1000,
      tokenPrice: "PKR 90,000-120,000"
    },
    { 
      type: "3-Bedroom Premium Apartment", 
      area: "1,900-2,400 sq ft", 
      price: "PKR 13.50-17.00 Cr", 
      bedrooms: 3, 
      bathrooms: 3,
      tokens: 1000,
      tokenPrice: "PKR 135,000-170,000"
    },
    { 
      type: "Beachfront Townhouse", 
      area: "3,200-4,000 sq ft", 
      price: "PKR 18.50-21.00 Cr", 
      bedrooms: 4, 
      bathrooms: 4,
      tokens: 1000,
      tokenPrice: "PKR 185,000-210,000"
    },
    { 
      type: "Resort Penthouse", 
      area: "4,500-5,800 sq ft", 
      price: "PKR 28.00+ Cr", 
      bedrooms: 4, 
      bathrooms: 5,
      tokens: 1000,
      tokenPrice: "PKR 280,000+"
    }
  ];

  const investmentDetails = {
    totalValue: "PKR 5.50 - 21.00 Cr",
    marketValue: "PKR 7.04 - 26.88 Cr", 
    appreciation: "27.9%",
    expectedROI: "13-17%",
    minInvestment: "PKR 55,000 - 210,000",
    totalTokens: 1000,
    availableTokens: 1000,
    pricePerToken: "PKR 55,000 - 210,000",
    constructionProgress: "Design Phase",
    handover: "2027-2028"
  };

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-2 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 z-50">
        <div className="transparent-navbar rounded-2xl shadow-navbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center">
              <Image 
                src="/hmr-group.svg" 
                alt="HMR Builders" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
              />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white font-medium transition-colors">Home</Link>
              <Link href="/properties" className="text-white/80 hover:text-white font-medium transition-colors">Properties</Link>
              <Link href="/how-it-works" className="text-white/80 hover:text-white font-medium transition-colors">How It Works</Link>
              <Link href="/about" className="text-white/80 hover:text-white font-medium transition-colors">About</Link>
              <Link href="/faqs" className="text-white/80 hover:text-white font-medium transition-colors">FAQs</Link>
              <Link href="/media" className="text-white/80 hover:text-white font-medium transition-colors">Media</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {session?.user ? (
                <UserProfileDropdown />
              ) : (
                <>
                  <Link href="/login" className="text-white/80 hover:text-white font-medium transition-colors">
                    Sign In
                  </Link>
                  <Link href="/get-started" className="text-white bg-[#315dca] hover:bg-[#203a74] px-4 py-2 rounded-lg font-medium transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      </header>

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
                  alt="Gold Crest Bay Sands"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Gold Crest Bay Sands</h1>
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
                  <div className="text-white text-xl font-bold">PKR 5.50 - 21.00 Cr</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm">Expected ROI</div>
                  <div className="text-white text-xl font-bold">13-17%</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm">Floors</div>
                  <div className="text-white text-xl font-bold">Ground + 33</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-white/60 text-sm">Handover</div>
                  <div className="text-white text-xl font-bold">2027-2028</div>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed">
                Gold Crest Bay Sands, where luxury meets elegance. Greeted by an attractive roundabout adorned with lush tropical foliage, befitting the magnificent 33-storey beachfront towers offering resort-style living by the Arabian Sea.
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
                { id: 'overview', label: 'Overview' },
                { id: 'features', label: 'Features & Amenities' },
                { id: 'units', label: 'Unit Types' },
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
                  <h3 className="text-2xl font-bold text-white mb-4">About Gold Crest Bay Sands</h3>
                  <p className="text-[#dee0e5] leading-relaxed mb-6">
                    Gold Crest Bay Sands represents the ultimate in resort-style beachfront living at HMR Waterfront. This magnificent 33-storey tower offers residents a tropical paradise with lush landscaping and world-class resort amenities.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Resort-style beachfront living</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Lush tropical landscaping</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">Magnificent beachfront towers</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#315dca] mr-3" />
                      <span className="text-white">World-class resort amenities</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Location Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-[#315dca] mr-3 mt-1" />
                      <div>
                        <div className="text-white font-semibold">Prime Beachfront Location</div>
                        <div className="text-[#dee0e5] text-sm">Direct access to Arabian Sea beachfront</div>
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

export default GoldCrestBaySandsPage;

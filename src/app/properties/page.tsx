"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Building, TrendingUp, Users, Filter, Search } from 'lucide-react';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { useAuth } from '@/components/AuthProvider';

const PropertiesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const properties = [
    {
      id: 1,
      title: "H1 Tower",
      location: "Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi",
      price: "PKR 8.92 - 39.11 Cr",
      marketValue: "PKR 10.71 - 46.93 Cr",
      appreciation: "20.0%",
      roi: "18-22%",
      type: "Luxury Residential",
      status: "ACTIVE",
      tokens: 1000,
      availableTokens: 342,
      minInvestment: "PKR 950,000 - 1,200,000",
      tokenPrice: "PKR 95,000 - 120,000",
      image: "/projects/h1-tower/main.jpg",
      description: "H1 Tower is the Flagship Tower of HMR Waterfront - a G+39 floors architectural masterpiece offering panoramic Arabian Sea views. Located right by the Arabian Sea corridor with easy walking access to HMR promenade. Construction 40% complete, handover late 2025.",
      features: ["Elegant Reception & Grand Lobby", "24 hours Concierge Service", "Panoramic Sea & Boulevard Views", "Infinity Pool", "Multi-Purpose Hall", "Fully Equipped Gym", "Spacious Bedrooms with Ensuite", "Modern European-Style Bathrooms", "Built-in Kitchen with Smart-Home Tech", "Maid's Room", "High Speed Elevators", "Retail Outlets", "Fire Life Safety Certified Lifts", "Advanced Evacuation System", "24/7 CCTV Surveillance", "8 Floors Parking", "2 Emergency Exit Staircases", "Driver's Room on Each Parking Floor"],
      floors: "Ground + 39",
      units: ["1-Bedroom Apartment (907-1,121 sq ft)", "2-Bedroom Apartment (2,037-2,433 sq ft)", "3-Bedroom Apartment", "4-Bedroom Apartment", "Townhouse (6,899-7,589 sq ft)", "Penthouse (8,356-8,933 sq ft)"],
      constructionProgress: "40%",
      handover: "Late 2025",
      unitPricing: [
        { type: "1-Bedroom Apartment", price: "PKR 8.92 Cr", size: "907-1,121 sq ft", tokens: 1000, tokenPrice: "PKR 89,200" },
        { type: "2-Bedroom Apartment", price: "PKR 8.92-10.30 Cr", size: "2,037-2,433 sq ft", tokens: 1000, tokenPrice: "PKR 89,200-103,000" },
        { type: "3-Bedroom Apartment", price: "PKR 12.18-13.60 Cr", size: "2,800-3,200 sq ft", tokens: 1000, tokenPrice: "PKR 121,800-136,000" },
        { type: "4-Bedroom Apartment", price: "PKR 16.72-18.95 Cr", size: "3,500-4,000 sq ft", tokens: 1000, tokenPrice: "PKR 167,200-189,500" },
        { type: "Townhouse", price: "PKR 25.00+ Cr", size: "6,899-7,589 sq ft", tokens: 1000, tokenPrice: "PKR 250,000+" },
        { type: "Penthouse", price: "PKR 39.11 Cr", size: "8,356-8,933 sq ft", tokens: 1000, tokenPrice: "PKR 391,100" }
      ]
    },
    {
      id: 2,
      title: "Saima Tower",
      location: "Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi",
      price: "PKR 7.50 - 28.50 Cr",
      marketValue: "PKR 9.00 - 34.20 Cr",
      appreciation: "20.8%",
      roi: "17-21%",
      type: "Ultra-Luxury Residential",
      status: "ACTIVE",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 850,000 - 1,100,000",
      tokenPrice: "PKR 85,000 - 110,000",
      image: "/projects/saima-tower/main.jpg",
      description: "Saima Tower is a Ground + 40 storey residential project of iconic significance positioned right in front of the Arabian Sea at HMR Waterfront. Ultra-luxury apartments with unobstructed sea views and every conceivable modern amenity.",
      features: ["24 ft Height Grand Lobby", "Luxury Lounge Area", "24/7 Concierge Service", "West-Open Seafront Apartments", "Exclusive Swimming Pool", "State-of-the-Art Gym", "Prayer Area", "Spacious Bedrooms", "Children's Play Area", "7 Floors Car Parking", "24 ft Height Retail Outlets", "24/7 CCTV Surveillance", "Backup Generators", "Variable Refrigerant Flow Units"],
      floors: "Ground + 40",
      units: ["1-Bedroom Apartment", "2-Bedroom Apartment", "3-Bedroom Apartment", "4-Bedroom Apartment", "Townhouses", "Penthouses with Infinity Pool"],
      constructionProgress: "Planning Phase",
      handover: "2026-2027"
    },
    {
      id: 3,
      title: "AA Waterfront",
      location: "Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi",
      price: "PKR 6.80 - 25.20 Cr",
      marketValue: "PKR 8.16 - 30.24 Cr",
      appreciation: "22.0%",
      roi: "16-20%",
      type: "Smart Luxury Residential",
      status: "ACTIVE",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 750,000 - 1,000,000",
      tokenPrice: "PKR 75,000 - 100,000",
      image: "/projects/aa-waterfront/main.jpg",
      description: "AA Waterfront embodies extraordinary living at HMR Waterfront. The Ground + 37 storey project features stunning apartments with expensive sea views, smart luxurious apartments, and smart duplex penthouses that redefine comfortable coastal lifestyles.",
      features: ["Grand Reception Area", "Smart Home Apartments", "Luxury Lounge Area", "Community Hall", "Infinity Swimming Pool", "Premium Retail Showrooms", "Executive Meeting Room", "Prayer Area", "Wellness Sauna", "Steam Room", "Children's Play Area", "Gaming Zone", "State-of-Art Gym", "Multi-Level Parking"],
      floors: "Ground + 37",
      units: ["1-Bedroom Smart Apartment", "2-Bedroom Sea View Apartment", "3-Bedroom Premium Apartment", "4-Bedroom Elite Apartment", "6-Bedroom Penthouses with Private Pool"],
      constructionProgress: "Design Phase",
      handover: "2027-2028"
    },
    {
      id: 4,
      title: "H&S Residence",
      location: "Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi",
      price: "PKR 6.50 - 24.50 Cr",
      marketValue: "PKR 8.03 - 30.23 Cr",
      appreciation: "23.5%",
      roi: "15-19%",
      type: "Japanese-Inspired Residential",
      status: "ACTIVE",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 700,000 - 950,000",
      tokenPrice: "PKR 70,000 - 95,000",
      image: "/projects/hs-residence/main.jpg",
      description: "H&S Residence is a coastal haven standing 39 storeys tall along Karachi's vibrant shoreline. Inspired by the Japanese Nami design philosophy, our architecture reflects the fluidity of ocean waves, creating a unique living experience.",
      features: ["Architectural Design By Nicken Sekkei", "3 & 4 Bedroom Apartments with Plunge Pools", "Multiple Infinity Pools", "Creative Workspaces", "Multi-Level Car Parking", "Premium Fitness Center", "High Speed Elevators", "Executive Snooker Lounge", "Double Height Retail Shops", "Double Height Grand Lobby", "Kids Play & Pool Area", "Social Areas with 8 Lifts (1 FLS & 1 Cargo)", "Luxury Spa & Sauna"],
      floors: "Ground + 39",
      units: ["1-Bedroom Apartment", "2-Bedroom Apartment", "3-Bedroom Apartment with Plunge Pool", "4-Bedroom Apartment with Plunge Pool", "Japanese-Style Penthouse"],
      constructionProgress: "Design Phase",
      handover: "2027-2028"
    },
    {
      id: 5,
      title: "Saima Marina Residence",
      location: "Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi",
      price: "PKR 5.80 - 22.50 Cr",
      marketValue: "PKR 7.33 - 28.46 Cr",
      appreciation: "26.4%",
      roi: "14-18%",
      type: "Modern Marina Residential",
      status: "ACTIVE",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 650,000 - 900,000",
      tokenPrice: "PKR 65,000 - 90,000",
      image: "/projects/saima-marina-residence/main.jpg",
      description: "Saima Marina Residence offers an unparalleled living experience across Ground + 40 floors at HMR Waterfront. Awaken to breathtaking sea views from your modern residence, where every detail exudes sophistication and marina lifestyle.",
      features: ["Luxury Changing Rooms", "Open-Air Yoga Area", "Premium Shower Facilities", "Professional Salon", "State-of-Art Gym", "Prayer Area", "Kids Play Area", "7 Floors Parking", "Double Height Premium Shops", "Double Height Grand Lobby", "5 Passenger Lifts (1 FLS & 1 Cargo)", "Indoor Gaming Zone", "Open & Covered Dining Areas", "Luxury Sauna & Jacuzzi"],
      floors: "Ground + 40",
      units: ["1-Bedroom Marina View Apartment", "2-Bedroom Sea View Apartment", "3-Bedroom Premium Apartment", "4-Bedroom Elite Apartment", "Marina Penthouses"],
      constructionProgress: "Design Phase",
      handover: "2027-2028"
    },
    {
      id: 6,
      title: "Gold Crest Bay Sands",
      location: "Abdul Sattar Edhi Ave, D.H.A. Phase 8 Zone D, Karachi",
      price: "PKR 5.50 - 21.00 Cr",
      marketValue: "PKR 7.04 - 26.88 Cr",
      appreciation: "27.9%",
      roi: "13-17%",
      type: "Beachfront Resort Residential",
      status: "ACTIVE",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 600,000 - 850,000",
      tokenPrice: "PKR 60,000 - 85,000",
      image: "/projects/gold-crest-bay-sands/main.jpg",
      description: "Gold Crest Bay Sands, where luxury meets elegance. Greeted by an attractive roundabout adorned with lush tropical foliage, befitting the magnificent 33-storey beachfront towers offering resort-style living by the Arabian Sea.",
      features: ["Resort-Style Infinity Pool", "Alluring Recreational Floor", "Grand Community Hall", "Premium Cafeteria", "Resort Fitness Center", "Executive Business Centre", "Luxury Sauna", "Professional Day Care Center", "Prayer Hall", "Indoor Gaming Zone", "Kids Play Area", "Double Height Premium Shops"],
      floors: "Ground + 33",
      units: ["1-Bedroom Resort View Apartment", "2-Bedroom Beachfront Apartment", "3-Bedroom Premium Apartment", "Beachfront Townhouse", "Resort Penthouse"],
      constructionProgress: "Design Phase",
      handover: "2027-2028"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Active' },
    { id: 'coming-soon', label: 'Coming Soon' },
    { id: 'flagship', label: 'Flagship' }
  ];

  const filteredProperties = properties.filter(property => {
    let matchesFilter = true;
    if (activeFilter === 'active') {
      matchesFilter = property.status === 'ACTIVE';
    } else if (activeFilter === 'coming-soon') {
      matchesFilter = property.status === 'COMING SOON';
    } else if (activeFilter === 'flagship') {
      matchesFilter = property.id === 1; // H1 Tower is flagship
    }
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FULLY FUNDED':
        return 'bg-green-500';
      case 'ACTIVE':
        return 'bg-[#315dca]';
      case 'COMING SOON':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
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
                alt="HMR Group" 
                width={32} 
                height={32}
                className="mr-2 sm:w-10 sm:h-10"
              />
              <div className="text-base sm:text-lg lg:text-xl font-bold text-white">
                HMR <span className="text-[#315dca]">BUILDERS</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white font-medium transition-colors">Home</Link>
              <Link href="/properties" className="text-white font-medium">Properties</Link>
              <Link href="/how-it-works" className="text-white/80 hover:text-white font-medium transition-colors">How it Works</Link>
              <Link href="/about" className="text-white/80 hover:text-white font-medium transition-colors">About</Link>
              <Link href="/faqs" className="text-white/80 hover:text-white font-medium transition-colors">FAQs</Link>
              <Link href="/media" className="text-white/80 hover:text-white font-medium transition-colors">Media</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <UserProfileDropdown />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white/80 hover:text-white font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/get-started"
                    className="bg-[#315dca] hover:bg-[#24246c] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              HMR <span className="text-[#315dca]">RWA Tokens</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#dee0e5] max-w-3xl mx-auto">
              Invest in Pakistan's most prestigious waterfront development through Real World Asset (RWA) tokens. Six luxury projects offering premium residential units with stunning sea views and world-class amenities.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#dee0e5] w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-[#203a74]/50 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-[#dee0e5] focus:outline-none focus:border-[#315dca]"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-[#315dca] text-white'
                      : 'bg-white/10 text-[#dee0e5] hover:bg-white/20'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property) => {
              const getPropertyLink = (id: number) => {
                switch (id) {
                  case 1: return "/properties/h1-tower";
                  case 2: return "/properties/saima-tower";
                  case 3: return "/properties/aa-waterfront";
                  case 4: return "/properties/hs-residence";
                  case 5: return "/properties/saima-marina-residence";
                  case 6: return "/properties/gold-crest-bay-sands";
                  default: return "#";
                }
              };
              
              return (
              <Link key={property.id} href={getPropertyLink(property.id)} className="block">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white transition-all duration-500 group cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl border border-gray-200">
                {/* Property Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Corner Animation Lines */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#315dca] animate-pulse"></div>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#315dca] animate-pulse"></div>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#315dca] animate-pulse"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#315dca] animate-pulse"></div>
                  </div>
                  {/* RWA Token Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-gradient-to-r from-[#315dca] to-[#203a74] text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm shadow-lg">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                        RWA TOKEN
                      </div>
                    </div>
                  </div>
                  
                  {/* Tower Info Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                      {property.floors} • {property.units?.length || 0} Types
                    </div>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#315dca] mr-1.5 sm:mr-2" />
                    <span className="text-xs sm:text-sm text-gray-600">{property.location}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{property.title}</h3>
                  
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                    {property.description}
                  </p>
                  
                  {/* Financial Details */}
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 border border-gray-200">
                    <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                      <span className="text-gray-600">Status:</span>
                      <div className={`${getStatusColor(property.status)} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
                        {property.status}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Tower Value:</span>
                      <span className="font-semibold text-gray-900">{property.price}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Market Value:</span>
                      <span className="font-semibold text-gray-900">{property.marketValue}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Appreciation:</span>
                      <span className="font-semibold text-[#315dca]">{property.appreciation}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Expected ROI:</span>
                      <span className="font-semibold text-[#315dca]">{property.roi}</span>
                    </div>
                  </div>

                  {/* Investment Info */}
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600">Min. Investment:</span>
                    <span className="font-semibold text-gray-900">{property.minInvestment}</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-[#315dca]/10 text-[#315dca] px-2 py-1 rounded-full text-xs border border-[#315dca]/20">
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs border border-gray-200">
                        +{property.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-[#315dca] to-[#203a74] hover:from-[#203a74] hover:to-[#315dca] text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    {property.status === 'ACTIVE' ? 'Invest Now' : 'View Details'}
                  </button>
                </div>
              </div>
              </Link>
              );
            })}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-[#dee0e5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
              <p className="text-[#dee0e5]">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-[#0e1521]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#315dca] mb-2">25+</div>
              <div className="text-[#dee0e5] text-sm sm:text-base">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#315dca] mb-2">1,000+</div>
              <div className="text-[#dee0e5] text-sm sm:text-base">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#315dca] mb-2">15-22%</div>
              <div className="text-[#dee0e5] text-sm sm:text-base">Expected Returns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#315dca] mb-2">PKR 1M</div>
              <div className="text-[#dee0e5] text-sm sm:text-base">Min. Investment</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;

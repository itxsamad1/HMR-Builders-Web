'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Building, TrendingUp, Users, Filter, Search } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const PropertiesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const properties = [
    {
      id: 1,
      title: "H1 Tower",
      location: "HMR Waterfront, Karachi",
      price: "PKR 15 million",
      marketValue: "PKR 18 million",
      appreciation: "20.0%",
      roi: "18-22%",
      type: "Residential",
      status: "ACTIVE",
      tokens: 1500,
      availableTokens: 847,
      minInvestment: "PKR 1,000,000",
      image: "/projects/h1-tower/main.jpg",
      description: "H1 Tower is the Flagship Tower of HMR Waterfront. A stunning skyline that will inspire residents and visitors from around the world. It is a profound architecture, comprising of Ground + 34 floors of luxury living with a grand lobby to welcome you.",
      features: ["Elegant Reception", "24 hours Concierge", "Sea and Boulevard Apartments", "Infinity Pool", "Multi-Purpose Hall", "Fully Equipped Gym", "Spacious Bedrooms", "Modern Bathrooms", "Built in Kitchen", "Maid's Room", "High Speed Elevators", "Retail Outlets", "Fire life safety certified lifts", "Evacuation System", "24/7 CCTV Surveillance", "8 Floors Parking", "2 Emergency exit Staircases", "Driver's room on each parking floor"],
      floors: "Ground + 34",
      units: ["Townhouse", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "Penthouse"]
    },
    {
      id: 2,
      title: "Saima Tower",
      location: "HMR Waterfront, Karachi",
      price: "PKR 12 million",
      marketValue: "PKR 14.5 million",
      appreciation: "20.8%",
      roi: "17-21%",
      type: "Residential",
      status: "COMING SOON",
      tokens: 1200,
      availableTokens: 1200,
      minInvestment: "PKR 1,000,000",
      image: "/projects/saima-tower/main.jpg",
      description: "Saima Tower is a Ground + 40 storey residential project of iconic significance coming up right in front of sea at HMR Waterfront. The project comprises of ultra-luxury apartments provided with almost every conceivable amenity of the modern era.",
      features: ["24 ft Height Lobby", "Lounge Area", "Concierge", "West Open Sea front Apartments", "Exclusive Swimming Pool", "State of the art Gym", "Prayer Area", "Spacious Bedroom", "Children Play area", "7 floors of Car Parking", "24 ft Height Retail Outlets", "24/7 CCTV Surveillance", "Backup Generators", "Variable Refrigerant Flow Units"],
      floors: "Ground + 40",
      units: ["Townhouses", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "Penthouses with Infinity Pool"]
    },
    {
      id: 3,
      title: "AA Waterfront",
      location: "HMR Waterfront, Karachi",
      price: "PKR 10 million",
      marketValue: "PKR 12.2 million",
      appreciation: "22.0%",
      roi: "16-20%",
      type: "Residential",
      status: "COMING SOON",
      tokens: 1000,
      availableTokens: 1000,
      minInvestment: "PKR 1,000,000",
      image: "/projects/aa-waterfront/main.jpg",
      description: "Our passion for extraordinary living at HMR Waterfront. The Ground + 37 storey project comprises of stunning apartments and expensive views of the sea, the smart luxurious apartments and smart duplex penthouses are rewriting comfortable lifestyles.",
      features: ["Reception Area", "Smart Apartments", "Lounge Area", "Community Hall", "Swimming Pool", "Showrooms", "Meeting Room", "Prayer Area", "Sauna", "Steam Room", "Children's Play Area", "Gaming Zone", "Gym", "Parking Area"],
      floors: "Ground + 37",
      units: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "6 Bedroom Penthouses with Pool"]
    },
    {
      id: 4,
      title: "H&S Residence",
      location: "HMR Waterfront, Karachi",
      price: "PKR 8.5 million",
      marketValue: "PKR 10.5 million",
      appreciation: "23.5%",
      roi: "15-19%",
      type: "Residential",
      status: "COMING SOON",
      tokens: 850,
      availableTokens: 850,
      minInvestment: "PKR 1,000,000",
      image: "/projects/hs-residence/main.jpg",
      description: "Welcome to H&S Residence, a coastal haven standing 39 storeys tall along Karachi's vibrant shoreline. Inspired by the Japanese Nami design philosophy, our architecture reflects the fluidity of ocean waves.",
      features: ["Architectural Designed By Nicken Sekkei", "3 & 4 Bedrooms Apartment With Plunged Pools", "Infinity Pools", "Creative Workspaces", "Car Parking", "Gym", "High Speed Elevators", "Snooker Lounge", "Double Height Shops", "Double Height Lobby", "Kids Play & Pool Area", "Social Area 8 Lifts (1 Fls & 1 Cargo)", "Spa & Sauna"],
      floors: "Ground + 39",
      units: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "Penthouse"]
    },
    {
      id: 5,
      title: "Saima Marina Residence",
      location: "HMR Waterfront, Karachi",
      price: "PKR 7.2 million",
      marketValue: "PKR 9.1 million",
      appreciation: "26.4%",
      roi: "14-18%",
      type: "Residential",
      status: "COMING SOON",
      tokens: 720,
      availableTokens: 720,
      minInvestment: "PKR 1,000,000",
      image: "/projects/saima-marina-residence/main.jpg",
      description: "Saima Marina Residence offers an unparalleled living experience comprises of Ground + 40 floors at HMR Waterfront. Awaken to breathtaking sea views from your modern residence, where every detail exudes sophistication.",
      features: ["Changing Rooms", "Yoga Area (Open Air)", "Showers", "Salon", "Gym", "Prayer Area", "Kids Play Area", "7 Floors for Parking", "Double Height Shops", "Double Height Lobby", "5 Passenger Lifts (1 FLS & 1 Cargo)", "Indoor Games", "Open & Covered Dining Area", "Sauna & Jacuzzi"],
      floors: "Ground + 40",
      units: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "4 Bedroom", "Penthouses"]
    },
    {
      id: 6,
      title: "Gold Crest Bay Sands",
      location: "HMR Waterfront, Karachi",
      price: "PKR 6.8 million",
      marketValue: "PKR 8.7 million",
      appreciation: "27.9%",
      roi: "13-17%",
      type: "Residential",
      status: "COMING SOON",
      tokens: 680,
      availableTokens: 680,
      minInvestment: "PKR 1,000,000",
      image: "/projects/gold-crest-bay-sands/main.jpg",
      description: "Goldcrest Bay Sands, where luxury meets elegance. As you approach the resort, you are greeted by an attractive roundabout adorned with lush tropical foliage, befitting the magnificent 33 storeys beachfront towers.",
      features: ["Infinity Pool", "Alluring Floor", "Community Hall", "Cafeteria", "Gym", "Business Centre", "Sauna", "Day Care Center", "Prayer Hall", "Indoor Games", "Kids Play Area", "Double Height Shops"],
      floors: "Ground + 33",
      units: ["1 Bedroom", "2 Bedroom", "3 Bedroom", "Townhouse", "Penthouse"]
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

            <ThemeToggle />
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
            {filteredProperties.map((property) => (
              <Link key={property.id} href={property.id === 1 ? "/properties/h1-tower" : "#"} className="block">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-500 group cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl">
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
                    <span className="text-xs sm:text-sm">{property.location}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white">{property.title}</h3>
                  
                  <p className="text-[#dee0e5] text-sm sm:text-base line-clamp-2">
                    {property.description}
                  </p>
                  
                  {/* Financial Details */}
                  <div className="bg-[#0e1521]/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 space-y-2 border border-[#315dca]/20">
                    <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                      <span className="text-[#dee0e5]">Status:</span>
                      <div className={`${getStatusColor(property.status)} text-white px-2 py-1 rounded-full text-xs font-bold flex items-center`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
                        {property.status}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">Tower Value:</span>
                      <span className="font-semibold text-white">{property.price}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">Market Value:</span>
                      <span className="font-semibold text-white">{property.marketValue}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">Appreciation:</span>
                      <span className="font-semibold text-[#315dca]">{property.appreciation}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">Expected ROI:</span>
                      <span className="font-semibold text-[#315dca]">{property.roi}</span>
                    </div>
                  </div>

                  {/* Investment Info */}
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-[#dee0e5]">Min. Investment:</span>
                    <span className="font-semibold text-white">{property.minInvestment}</span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-[#315dca]/20 text-[#315dca] px-2 py-1 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full text-xs">
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
            ))}
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
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#315dca] mb-2">PKR 50K</div>
              <div className="text-[#dee0e5] text-sm sm:text-base">Min. Investment</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;

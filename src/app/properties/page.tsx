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
      title: "2 Bedroom Apartment, DHA Phase 8",
      location: "DHA Phase 8, Karachi",
      price: "PKR 1.7 million",
      marketValue: "PKR 1.95 million",
      appreciation: "14.7%",
      roi: "18.2%",
      type: "Residential",
      status: "FULLY FUNDED",
      tokens: 500,
      availableTokens: 0,
      minInvestment: "PKR 50,000",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      description: "Premium 2-bedroom apartment in the heart of DHA Phase 8, featuring modern amenities and excellent connectivity.",
      features: ["Swimming Pool", "Gym", "Parking", "Security", "Garden"]
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
      status: "ACTIVE",
      tokens: 240,
      availableTokens: 134,
      minInvestment: "PKR 75,000",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: "Modern commercial tower in the business district of Gulberg III, perfect for office spaces and retail.",
      features: ["Elevator", "Parking", "Security", "Cafeteria", "Conference Rooms"]
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
      status: "ACTIVE",
      tokens: 420,
      availableTokens: 256,
      minInvestment: "PKR 100,000",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      description: "Luxury boutique hotel in the prestigious Clifton area, offering premium hospitality services.",
      features: ["Restaurant", "Spa", "Pool", "Room Service", "Concierge"]
    },
    {
      id: 4,
      title: "3 Bedroom Villa, Bahria Town",
      location: "Bahria Town, Rawalpindi",
      price: "PKR 1.8 million",
      marketValue: "PKR 2.16 million",
      appreciation: "20.0%",
      roi: "21.5%",
      type: "Residential",
      status: "COMING SOON",
      tokens: 360,
      availableTokens: 360,
      minInvestment: "PKR 60,000",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      description: "Spacious 3-bedroom villa in the gated community of Bahria Town, featuring modern design and amenities.",
      features: ["Garden", "Garage", "Security", "Community Center", "Playground"]
    },
    {
      id: 5,
      title: "Office Complex, Blue Area",
      location: "Blue Area, Islamabad",
      price: "PKR 1.5 million",
      marketValue: "PKR 1.8 million",
      appreciation: "20.0%",
      roi: "20.8%",
      type: "Commercial",
      status: "ACTIVE",
      tokens: 300,
      availableTokens: 180,
      minInvestment: "PKR 80,000",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      description: "Premium office complex in the heart of Islamabad's business district, Blue Area.",
      features: ["Parking", "Security", "Cafeteria", "Meeting Rooms", "High-Speed Internet"]
    },
    {
      id: 6,
      title: "Retail Plaza, F-8",
      location: "F-8, Islamabad",
      price: "PKR 1.3 million",
      marketValue: "PKR 1.56 million",
      appreciation: "20.0%",
      roi: "19.2%",
      type: "Commercial",
      status: "ACTIVE",
      tokens: 260,
      availableTokens: 156,
      minInvestment: "PKR 70,000",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      description: "Modern retail plaza in F-8 sector, offering excellent foot traffic and commercial potential.",
      features: ["Parking", "Security", "Food Court", "ATM", "Restrooms"]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Properties' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'hospitality', label: 'Hospitality' }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesFilter = activeFilter === 'all' || property.type.toLowerCase() === activeFilter;
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
              Our <span className="text-[#315dca]">Property Portfolio</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#dee0e5] max-w-3xl mx-auto">
              Invest in carefully selected premium properties across Pakistan. Each property offers excellent returns and growth potential.
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
              <div key={property.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 group">
                {/* Property Image */}
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <div className={`${getStatusColor(property.status)} text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center`}>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1.5 sm:mr-2"></div>
                      {property.status}
                    </div>
                  </div>
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {property.type}
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
                  <div className="bg-[#0e1521]/50 rounded-lg p-3 sm:p-4 space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">HMR Builders price:</span>
                      <span className="font-semibold text-white">{property.price}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-[#dee0e5]">Market value:</span>
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
                  <button className="w-full bg-[#315dca] hover:bg-[#203a74] text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors">
                    {property.status === 'FULLY FUNDED' ? 'View Details' : 'Invest Now'}
                  </button>
                </div>
              </div>
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

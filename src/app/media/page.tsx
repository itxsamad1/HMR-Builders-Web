'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Play, Calendar, User, ExternalLink, FileText, Video, Image as ImageIcon } from 'lucide-react';

const MediaPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const mediaItems = [
    {
      id: 1,
      title: "HMR Builders: Revolutionizing Real Estate Investment in Pakistan",
      type: "article",
      category: "news",
      date: "2024-01-15",
      author: "Business Recorder",
      description: "How HMR Builders is making real estate investment accessible to everyone through tokenization.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      url: "#",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Tokenized Real Estate: The Future of Property Investment",
      type: "video",
      category: "education",
      date: "2024-01-10",
      author: "HMR Builders",
      description: "Learn about the benefits and mechanics of tokenized real estate investment.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
      url: "#",
      duration: "8:30"
    },
    {
      id: 3,
      title: "SECP Approves HMR Builders for Tokenized Real Estate Platform",
      type: "article",
      category: "regulatory",
      date: "2024-01-08",
      author: "Dawn Business",
      description: "The Securities and Exchange Commission of Pakistan grants approval for HMR Builders' innovative platform.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
      url: "#",
      readTime: "3 min read"
    },
    {
      id: 4,
      title: "Property Investment Guide: Getting Started with PKR 1 Million",
      type: "article",
      category: "education",
      date: "2024-01-05",
      author: "HMR Builders",
      description: "A comprehensive guide to starting your real estate investment journey with minimal capital.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      url: "#",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Market Analysis: Karachi Real Estate Trends 2024",
      type: "video",
      category: "analysis",
      date: "2024-01-03",
      author: "Property Expert",
      description: "In-depth analysis of Karachi's real estate market and investment opportunities.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      url: "#",
      duration: "12:45"
    },
    {
      id: 6,
      title: "Success Story: How Sarah Built Her Property Portfolio",
      type: "article",
      category: "success",
      date: "2024-01-01",
      author: "HMR Builders",
      description: "Meet Sarah, a young investor who built a diverse property portfolio starting with just PKR 1 Million.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop",
      url: "#",
      readTime: "6 min read"
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Media' },
    { id: 'news', label: 'News' },
    { id: 'education', label: 'Education' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'success', label: 'Success Stories' },
    { id: 'regulatory', label: 'Regulatory' }
  ];

  const filteredMedia = mediaItems.filter(item => 
    activeTab === 'all' || item.category === activeTab
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-500';
      case 'article':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news':
        return 'bg-green-500';
      case 'education':
        return 'bg-purple-500';
      case 'analysis':
        return 'bg-orange-500';
      case 'success':
        return 'bg-pink-500';
      case 'regulatory':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Media & <span className="text-[#315dca]">Resources</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#dee0e5] max-w-3xl mx-auto">
              Stay updated with the latest news, insights, and educational content about tokenized real estate investment.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#315dca] text-white'
                    : 'bg-white/10 text-[#dee0e5] hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMedia.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 group">
                {/* Media Image */}
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <div className={`${getTypeColor(item.type)} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center`}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <div className={`${getCategoryColor(item.category)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                      {item.category}
                    </div>
                  </div>
                  
                  {/* Play Button for Videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  
                  {/* Duration/Read Time */}
                  <div className="absolute bottom-3 right-3">
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      {item.type === 'video' ? item.duration : item.readTime}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#dee0e5] text-sm sm:text-base line-clamp-3">
                    {item.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-[#dee0e5]">
                    <div className="flex items-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* Read More Button */}
                  <button className="w-full bg-[#315dca] hover:bg-[#203a74] text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors flex items-center justify-center">
                    {item.type === 'video' ? 'Watch Now' : 'Read More'}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-[#dee0e5] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No media found</h3>
              <p className="text-[#dee0e5]">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-[#0e1521]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-base sm:text-lg text-[#dee0e5] mb-8">
            Subscribe to our newsletter for the latest updates on tokenized real estate and investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 backdrop-blur-sm border border-[#203a74]/50 rounded-lg px-4 py-3 text-white placeholder-[#dee0e5] focus:outline-none focus:border-[#315dca]"
            />
            <button className="bg-[#315dca] hover:bg-[#203a74] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaPage;

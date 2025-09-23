"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Users, Shield, TrendingUp, Award, Globe, Target, Heart } from 'lucide-react';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { useAuth } from '@/components/AuthProvider';

const AboutPage = () => {
  const { user } = useAuth();

  const stats = [
    { value: "1,000+", label: "Active Investors" },
    { value: "25+", label: "Properties Listed" },
    { value: "PKR 1B+", label: "Assets Under Management" },
    { value: "15-20%", label: "Average Annual Returns" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "All investments are backed by real assets and protected by blockchain technology."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making premium real estate investment accessible to everyone, starting from PKR 1 Million."
    },
    {
      icon: TrendingUp,
      title: "Transparency",
      description: "Complete transparency in all transactions, property valuations, and financial reporting."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Leading the digital transformation of real estate investment in Pakistan."
    }
  ];


  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About HMR Builders
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We're revolutionizing real estate investment in Pakistan by making premium properties accessible to everyone through blockchain technology and fractional ownership.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#315dca] mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 mb-6">
                To democratize real estate investment in Pakistan by leveraging blockchain technology to create a transparent, secure, and accessible platform for fractional property ownership.
              </p>
              <p className="text-lg text-white/80 mb-8">
                We believe that everyone should have the opportunity to invest in premium real estate, regardless of their financial capacity. Our platform makes this possible by tokenizing properties and allowing investments starting from just PKR 1 Million.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#315dca] rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Vision 2030</h3>
                  <p className="text-white/80">To become Pakistan's leading RWA tokenization platform</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#315dca] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Why We Do This</h3>
                <p className="text-white/80">
                  Real estate has always been one of the most stable and profitable investment classes, but it's been out of reach for most people. We're changing that by making it accessible, transparent, and profitable for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-white/80">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-[#315dca] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of investors who are already earning 15-20% annual returns through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
              </Link>
              <Link
                href="/properties"
                className="border border-[#315dca] text-[#315dca] hover:bg-[#315dca] hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                View Properties
              </Link>
            </div>
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
              <p className="text-white/80 text-sm">
                Pakistan's premier RWA tokenization platform for real estate investment.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/properties" className="text-white/80 hover:text-white">Properties</Link></li>
                <li><Link href="/how-it-works" className="text-white/80 hover:text-white">How it Works</Link></li>
                <li><Link href="/about" className="text-white/80 hover:text-white">About</Link></li>
                <li><Link href="/faqs" className="text-white/80 hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
                <li><Link href="/help" className="text-white/80 hover:text-white">Help Center</Link></li>
                <li><Link href="/terms" className="text-white/80 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-white/80 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/media" className="text-white/80 hover:text-white">Media</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-white">Blog</Link></li>
                <li><Link href="/newsletter" className="text-white/80 hover:text-white">Newsletter</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#203a74] mt-12 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 HMR Builders. All rights reserved. | SECP Regulated
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;

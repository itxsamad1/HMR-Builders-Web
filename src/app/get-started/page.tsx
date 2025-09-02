'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Building2, TrendingUp, Shield, Users, MapPin, DollarSign } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

const GetStartedPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    investmentAmount: '',
    experience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const benefits = [
    {
      icon: Building2,
      title: "Fractional Ownership",
      description: "Own a fraction of premium Pakistani real estate starting from just PKR 50,000"
    },
    {
      icon: Shield,
      title: "SECP Compliant",
      description: "Fully regulated platform with blockchain-based transactions and transparent operations"
    },
    {
      icon: TrendingUp,
      title: "High Returns",
      description: "Earn competitive returns from Pakistan's thriving real estate market"
    },
    {
      icon: Users,
      title: "Diaspora Friendly",
      description: "Perfect for Pakistani diaspora worldwide. Invest in your homeland with ease"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Complete Registration",
      description: "Fill out our simple registration form with your basic information"
    },
    {
      step: "02",
      title: "Verify Your Identity",
      description: "Complete KYC verification process for secure transactions"
    },
    {
      step: "03",
      title: "Start Investing",
      description: "Browse properties and start investing from as low as PKR 50,000"
    }
  ];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8">
        <div className="bg-[#0e1521]/90 backdrop-blur-sm rounded-2xl shadow-navbar border border-[#203a74]/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center text-white hover:text-[#315dca] transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center">
              <Image 
                src="/hmr-group.svg" 
                alt="HMR Group" 
                width={40} 
                height={40}
                className="mr-2"
              />
              <div className="text-2xl font-bold text-white">
                HMR <span className="text-[#315dca]">BUILDERS</span>
              </div>
            </div>

            <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Start Your <span className="text-[#315dca]">Investment Journey</span>
            </h1>
            <p className="text-xl text-[#dee0e5] max-w-3xl mx-auto">
              Join thousands of investors who are already earning from Pakistan's premium real estate market. 
              Start with just PKR 50,000 and build your portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose HMR Builders?</h2>
            <p className="text-xl text-[#dee0e5]">Revolutionizing real estate investment with blockchain technology</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="w-16 h-16 bg-[#315dca] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-[#dee0e5]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Get Started Today</h2>
              <p className="text-[#dee0e5]">Complete your registration to start investing in tokenized real estate</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#315dca]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#315dca]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#315dca]"
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#315dca]"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="PK">Pakistan</option>
                    <option value="AE">UAE</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Investment Amount</label>
                  <select
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#315dca]"
                    required
                  >
                    <option value="">Select investment range</option>
                    <option value="50k-100k">PKR 50,000 - 100,000</option>
                    <option value="100k-250k">PKR 100,000 - 250,000</option>
                    <option value="250k-500k">PKR 250,000 - 500,000</option>
                    <option value="500k-1m">PKR 500,000 - 1,000,000</option>
                    <option value="1m+">PKR 1,000,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Investment Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#315dca]"
                    required
                  >
                    <option value="">Select your experience</option>
                    <option value="beginner">Beginner (New to investing)</option>
                    <option value="intermediate">Intermediate (Some experience)</option>
                    <option value="advanced">Advanced (Experienced investor)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#315dca] mt-1 flex-shrink-0" />
                <p className="text-[#dee0e5] text-sm">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                  We'll contact you within 24 hours to complete your registration.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#315dca] hover:bg-[#203a74] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
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
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
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
              Pakistan's premier tokenized real estate investment platform. Start from just PKR 50,000.
            </p>
            <p className="text-[#dee0e5]">&copy; 2025 HMR Builders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GetStartedPage;

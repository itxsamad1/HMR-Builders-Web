"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Building2, TrendingUp, Shield, Users, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { useAuth } from '@/components/AuthProvider';
import GoogleAuth from '@/components/GoogleAuth';
import RegistrationForm from '@/components/RegistrationForm';

const GetStartedPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const router = useRouter();
  const { user, loginWithGoogle } = useAuth();


  const benefits = [
    {
      icon: Building2,
      title: "Fractional Ownership",
      description: "Own a fraction of premium Pakistani real estate starting from just PKR 1 Million"
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
      description: "Browse properties and start investing from as low as PKR 1 Million"
    }
  ];

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Start Your Investment Journey
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl">
                Join thousands of investors who are already earning 15-20% annual returns through our RWA tokenization platform.
              </p>
              
              {/* Key Benefits */}
              <div className="space-y-4 mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#315dca] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90">Minimum investment: PKR 1 Million</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#315dca] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90">Expected returns: 15-20% annually</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#315dca] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white/90">Real estate backed tokens</span>
                </div>
              </div>
            </div>

            {/* Right Content - Sign Up Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Get Started Today</h2>
                <p className="text-white/80 mb-8">Choose your preferred sign-up method</p>
                
                <div className="space-y-4">
                  {/* Email Registration Button */}
                  <button
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 px-6 rounded-xl text-white font-semibold hover:from-[#203a74] hover:to-[#315dca] transition-all"
                  >
                    Sign Up with Email & Payment Method
                  </button>
                  
                  {/* Divider */}
                  <div className="flex items-center">
                    <div className="flex-1 border-t border-white/20"></div>
                    <span className="px-4 text-white/60 text-sm">or</span>
                    <div className="flex-1 border-t border-white/20"></div>
                  </div>
                  
                  {/* Google Sign Up Button */}
                  <div className="w-full">
                    <GoogleAuth 
                      variant="signup"
                      text="signup_with"
                    />
                  </div>
                </div>

                <p className="text-white/60 text-sm mt-6">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed large form; concise CTA used instead */}

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
              Pakistan's premier tokenized real estate investment platform. Start from just PKR 1 Million.
            </p>
            <p className="text-[#dee0e5]">&copy; 2025 HMR Builders. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <RegistrationForm onClose={() => setShowRegistrationForm(false)} />
      )}
    </div>
  );
};

export default GetStartedPage;

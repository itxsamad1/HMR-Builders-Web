'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Building2, TrendingUp, Shield, Users, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserProfileDropdown from '@/components/UserProfileDropdown';

const GetStartedPage = () => {
  // Simplified onboarding: Google only
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Removed traditional form for concise flow

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: false,
      });
      
      if (result?.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Google sign-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                HMR <span className="text-[#315dca]">BUILDERS</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-white font-medium transition-colors">Home</Link>
              <Link href="/properties" className="text-white/80 hover:text-white font-medium transition-colors">Properties</Link>
              <Link href="/how-it-works" className="text-white/80 hover:text-white font-medium transition-colors">How it Works</Link>
              <Link href="/about" className="text-white/80 hover:text-white font-medium transition-colors">About</Link>
              <Link href="/faqs" className="text-white/80 hover:text-white font-medium transition-colors">FAQs</Link>
              <Link href="/media" className="text-white/80 hover:text-white font-medium transition-colors">Media</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {session?.user ? (
                <UserProfileDropdown />
              ) : (
                <Link
                  href="/login"
                  className="text-white/80 hover:text-white font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            </div>
          </div>
        </div>
      </header>

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
                <p className="text-white/80 mb-8">Sign up securely with Google to continue</p>
                
                {/* Google Sign Up Button */}
                <button
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>{isLoading ? 'Creating account...' : 'Continue with Google'}</span>
                    </>
                  )}
                </button>

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
    </div>
  );
};

export default GetStartedPage;

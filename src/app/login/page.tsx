'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { signIn, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import UserProfileDropdown from '@/components/UserProfileDropdown';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle traditional login (you can implement this later)
    console.log('Login submitted:', formData);
  };

  const handleGoogleSignIn = async () => {
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
      console.error('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
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
                  href="/get-started"
                  className="bg-[#315dca] hover:bg-[#24246c] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
              )}
            </div>

            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <section className="py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>
              <p className="text-[#dee0e5]">Sign in to your HMR Builders account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#dee0e5] w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#315dca]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#dee0e5] w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#315dca]"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#dee0e5] hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#315dca] bg-white/10 border-white/20 rounded focus:ring-[#315dca] focus:ring-2"
                  />
                  <span className="ml-2 text-[#dee0e5] text-sm">Remember me</span>
                </label>
                <a href="#" className="text-[#315dca] hover:text-white text-sm">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#315dca] hover:bg-[#24246c] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-[#dee0e5] text-sm">Or continue with</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
            </button>

            <div className="mt-6 text-center">
              <p className="text-[#dee0e5]">
                Don't have an account?{' '}
                <Link href="/get-started" className="text-[#315dca] hover:text-white font-medium">
                  Get started
                </Link>
              </p>
            </div>
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

export default LoginPage;

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Shield, Users, CheckCircle, Home, RefreshCw, Eye, Zap } from 'lucide-react';
import { StickyDock, StickyDockIcon, StickyDockItem, StickyDockLabel } from '@/components/ui/sticky-dock';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { useAuth } from '@/components/AuthProvider';

const GlobalDock = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasAuthToken, setHasAuthToken] = useState(false);

  // Check if user has auth token in localStorage
  useEffect(() => {
    const checkAuthToken = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('hmr_token') : null;
      setHasAuthToken(!!token);
    };
    
    checkAuthToken();
    
    // Listen for storage changes (when user signs in/out)
    const handleStorageChange = () => {
      checkAuthToken();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check on focus (in case of same-tab changes)
    window.addEventListener('focus', checkAuthToken);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', checkAuthToken);
    };
  }, []);

  // Debug: Log auth state
  console.log('GlobalDock - Has auth token:', hasAuthToken);
  console.log('GlobalDock - Should show Get Started:', !hasAuthToken);

  useEffect(() => {
    // Ease-out cubic for smoothness
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    // Ease-in cubic for smoothness
    const easeIn = (t: number) => t * t * t;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200; // Distance over which to animate (0px to 200px)
      
      // Scroll Progress (using ease-out for smoother acceleration)
      const progress = Math.min(easeOut(scrollY / maxScroll), 1);
      setScrollProgress(progress);
    };

    // Initial check to prevent pop on page load
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home',
      isActive: pathname === '/'
    },
    {
      href: '/properties',
      icon: Building2,
      label: 'Properties',
      isActive: pathname.startsWith('/properties')
    },
    {
      href: '/how-it-works',
      icon: RefreshCw,
      label: 'How it Works',
      isActive: pathname.startsWith('/how-it-works')
    },
    {
      href: '/about',
      icon: Users,
      label: 'About',
      isActive: pathname.startsWith('/about')
    },
    {
      href: '/faqs',
      icon: CheckCircle,
      label: 'FAQs',
      isActive: pathname.startsWith('/faqs')
    },
    {
      href: '/media',
      icon: Eye,
      label: 'Media',
      isActive: pathname.startsWith('/media')
    },
    {
      href: '/get-started',
      icon: Zap,
      label: 'Get Started',
      isActive: pathname.startsWith('/get-started')
    }
  ];

  // Full navbar content for expanded mode
  const fullNavContent = (
    <div className="flex items-center justify-between w-full px-6">
      {/* Logo/Brand - with opacity fade */}
      <div 
        className="flex items-center space-x-3 flex-shrink-0"
        style={{ 
          opacity: Math.max(0, 1 - scrollProgress * 2), // Fade out faster
          transition: "opacity 150ms ease-out" 
        }}
      >
        <img src="/hmr-group.svg" alt="HMR Group" className="w-8 h-8" />
        <span className="text-xl font-bold text-white">HMR BUILDERS</span>
      </div>
      
      {/* Centered Navigation Links */}
      <nav className="flex items-center space-x-8 flex-1 justify-center" style={{ marginLeft: '10%' }}>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
              item.isActive 
                ? 'text-[#315dca] bg-[#315dca]/10' 
                : 'text-white/80 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* Auth Only - Get Started moved to dock */}
      <div className="flex items-center flex-shrink-0">
        {user ? (
          <UserProfileDropdown />
        ) : (
          <Link
            href="/login"
            className="flex items-center space-x-2 px-4 py-2 text-[#315dca] hover:text-[#315dca]/80 transition-colors duration-200 whitespace-nowrap"
          >
            <Shield className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Sign In</span>
          </Link>
        )}
      </div>
    </div>
  );

  // Easing functions for smooth transitions
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeIn = (t: number) => t * t * t;

  // Calculate smooth interpolated values with easing
  const scale = 1 - easeOut(scrollProgress) * 0.05; // Slight easing for smooth shrinkage
  const offsetY = scrollProgress * 3; // From 0px to 3px (less offset)
  
  // Width: Apply ease-in for smooth shrinking of width
  const dockWidth = scrollProgress < 1 ? `${100 - easeIn(scrollProgress) * 48}vw` : 'auto';
  const dockMaxWidth = scrollProgress < 1 ? `${1500 - easeIn(scrollProgress) * 700}px` : 'auto';
  
  // Opacity Fade: Fade starts later, easing out for smoothness
  const fullNavOpacity = Math.max(0, 1 - easeOut(Math.max(0, scrollProgress - 0.2)) * 3);
  const compactNavOpacity = Math.max(0, easeOut(Math.max(0, scrollProgress - 0.4)) * 2.5);
  
  // Mode Switch: Smooth transition around 50% scroll point
  const modeSwitch = easeOut(Math.min(1, Math.max(0, (scrollProgress - 0.4) / 0.2)));
  const isCompact = scrollProgress > 0.6; // Switch mode at 50% for smoother transition

  return (
    <div 
      className="fixed left-1/2 z-50"
      style={{
        top: `${16 + offsetY}px`, // 16px (1rem) + smooth offset
        transform: `translate(-50%, 0) scale(${scale})`,
        transformOrigin: "50% 0%",
        width: dockWidth,
        maxWidth: dockMaxWidth,
        transition: "none" // Remove transition for smooth scroll-sync
      }}
    >
      <StickyDock
        className="bg-[#0a0a0a]/95 border border-[#333]/50 shadow-2xl"
        isCompact={isCompact}
        fullNavContent={
          <div style={{ opacity: fullNavOpacity, transition: "opacity 150ms ease-out" }}>
            {fullNavContent}
          </div>
        }
        magnification={50}
        distance={100}
        spring={{ mass: 0.1, stiffness: 200, damping: 15 }}
        compactOpacity={compactNavOpacity}
      >
        {/* Navigation Items for Dock Mode */}
        {navigationItems.map((item) => (
          <StickyDockItem key={item.href}>
            <StickyDockIcon>
              <Link 
                href={item.href} 
                className={`flex items-center justify-center w-full h-full transition-colors duration-200 ${
                  item.isActive ? 'text-[#315dca]' : 'text-white/80 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            </StickyDockIcon>
            <StickyDockLabel className="bg-[#0a0a0a]/95 text-white border border-[#333]/50 whitespace-nowrap">
              {item.label}
            </StickyDockLabel>
          </StickyDockItem>
        ))}

        {/* User Profile / Auth for Dock Mode */}
        <StickyDockItem>
          <StickyDockIcon>
            {user ? (
              <div className="flex items-center justify-center w-full h-full">
                <UserProfileDropdown />
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center justify-center w-full h-full text-[#315dca] hover:text-[#315dca]/80 transition-colors duration-200"
              >
                <Shield className="w-5 h-5" />
              </Link>
            )}
          </StickyDockIcon>
          <StickyDockLabel className="bg-[#0a0a0a]/95 text-white border border-[#333]/50 whitespace-nowrap">
            {user ? 'Profile' : 'Sign In'}
          </StickyDockLabel>
        </StickyDockItem>

        {/* Get Started for Dock Mode - Only show when no auth token (Sign In is present) */}
        {!hasAuthToken && (
          <StickyDockItem>
            <StickyDockIcon>
              <Link 
                href="/get-started" 
                className="flex items-center justify-center w-full h-full bg-[#315dca] hover:bg-[#315dca]/90 rounded-lg transition-colors duration-200 shadow-lg shadow-[#315dca]/25"
              >
                <Zap className="w-5 h-5 text-white" />
              </Link>
            </StickyDockIcon>
            <StickyDockLabel className="bg-[#315dca] text-white border border-[#315dca] whitespace-nowrap font-medium">
              Get Started
            </StickyDockLabel>
          </StickyDockItem>
        )}
      </StickyDock>
    </div>
  );
};

export default GlobalDock;
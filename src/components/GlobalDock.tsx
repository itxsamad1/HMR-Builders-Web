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
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsAtTop(currentScrollY <= 10); // Consider "at top" if within 10px
    };

    // Initial check
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
    }
  ];

  return (
    <div className={`fixed z-50 transition-all duration-700 ease-out ${
      isAtTop 
        ? 'top-4 left-1/2 transform -translate-x-1/2' 
        : 'top-4 left-1/2 transform -translate-x-1/2'
    }`}>
       <div className={`transition-all duration-700 ease-out ${
         isAtTop 
           ? 'w-[95vw] max-w-7xl h-16 rounded-2xl' 
           : 'w-auto h-auto rounded-2xl'
       }`}>
        
        {/* Single Transforming Dock */}
        <div className={`bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#333]/50 shadow-2xl transition-all duration-700 ease-out ${
          isAtTop 
            ? 'w-full h-full rounded-2xl flex items-center justify-between px-6' 
            : 'rounded-2xl p-2'
        }`}>
          
          {/* Full View Content - Only visible at top */}
          {isAtTop && (
            <>
              {/* Logo/Brand */}
              <div className="flex items-center space-x-3">
                <img src="/hmr-group.svg" alt="HMR Group" className="w-8 h-8" />
                <span className="text-xl font-bold text-white">HMR BUILDERS</span>
              </div>
              
               {/* Navigation Links */}
               <nav className="hidden lg:flex items-center space-x-8">
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
              
               {/* Auth & CTA */}
               <div className="flex items-center space-x-4">
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
                 <Link
                   href="/get-started"
                   className="flex items-center space-x-2 px-4 py-2 bg-[#315dca] hover:bg-[#315dca]/90 text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                 >
                   <Zap className="w-4 h-4 flex-shrink-0" />
                   <span className="text-sm font-medium">Get Started</span>
                 </Link>
               </div>
            </>
          )}
          
          {/* Collapsed Dock View - Only visible when scrolled */}
          {!isAtTop && (
            <StickyDock 
              className="bg-transparent border-none shadow-none"
              magnification={50}
              distance={100}
              spring={{ mass: 0.1, stiffness: 200, damping: 15 }}
            >
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

              {/* User Profile / Auth */}
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

              {/* Get Started */}
              <StickyDockItem>
                <StickyDockIcon>
                  <Link 
                    href="/get-started" 
                    className="flex items-center justify-center w-full h-full bg-[#315dca] hover:bg-[#315dca]/90 rounded-lg transition-colors duration-200"
                  >
                    <Zap className="w-5 h-5" />
                  </Link>
                </StickyDockIcon>
                 <StickyDockLabel className="bg-[#0a0a0a]/95 text-white border border-[#333]/50 whitespace-nowrap">
                   Get Started
                 </StickyDockLabel>
              </StickyDockItem>
            </StickyDock>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalDock;

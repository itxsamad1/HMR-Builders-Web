"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Shield, Users, CheckCircle, Home, RefreshCw, Eye, Zap } from 'lucide-react';
import { StickyDock, StickyDockIcon, StickyDockItem, StickyDockLabel } from '@/components/ui/sticky-dock';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { useAuth } from '@/components/AuthProvider';

const GlobalDock = () => {
  const pathname = usePathname();
  const { user } = useAuth();

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
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    <StickyDock
      className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg"
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
                  item.isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </Link>
            </StickyDockIcon>
            <StickyDockLabel className="bg-white/95 text-gray-900 border border-gray-200 shadow-sm">
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
          <StickyDockLabel className="bg-[#0a0a0a]/95 text-white border border-[#333]/50">
            {user ? 'Profile' : 'Sign In'}
          </StickyDockLabel>
        </StickyDockItem>

        {/* Get Started */}
        <StickyDockItem>
          <StickyDockIcon>
            <Link 
              href="/get-started" 
              className="flex items-center justify-center w-full h-full bg-black hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <Building2 className="w-5 h-5 text-white" />
            </Link>
          </StickyDockIcon>
          <StickyDockLabel className="bg-black/95 text-white border border-gray-700 shadow-sm">
            Get Started
          </StickyDockLabel>
        </StickyDockItem>
      </StickyDock>
    </div>
  );
};

export default GlobalDock;

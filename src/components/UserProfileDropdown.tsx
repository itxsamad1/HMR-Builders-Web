'use client';

import React from 'react';
import { User, LogOut, Wallet, BarChart3 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useAuth } from './AuthProvider';

const UserProfileDropdown = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    logout();
  };

  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const userName = user.name || user.email || 'User';
  const userEmail = user.email || '';
  const firstLetter = getFirstLetter(userName);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#315dca] text-white font-semibold text-lg hover:bg-[#203a74] transition-colors focus:outline-none focus:ring-2 focus:ring-[#315dca] focus:ring-offset-2 focus:ring-offset-[#0e1521]">
          {firstLetter}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-[#0e1521] rounded-lg shadow-lg border border-[#203a74] p-1 z-50"
          sideOffset={5}
        >
          <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm text-white hover:bg-[#203a74] rounded cursor-pointer focus:outline-none">
            <User className="w-4 h-4 mr-2" />
            <div className="flex flex-col">
              <span className="font-medium">{userName}</span>
              <span className="text-xs text-[#64748b]">{userEmail}</span>
            </div>
          </DropdownMenu.Item>
          
          <DropdownMenu.Separator className="h-px bg-[#203a74] my-1" />

          <DropdownMenu.Item asChild>
            <Link href="/wallet" className="flex items-center px-3 py-2 text-sm text-white hover:bg-[#203a74] rounded cursor-pointer focus:outline-none">
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link href="/portfolio" className="flex items-center px-3 py-2 text-sm text-white hover:bg-[#203a74] rounded cursor-pointer focus:outline-none">
              <BarChart3 className="w-4 h-4 mr-2" />
              Portfolio
            </Link>
          </DropdownMenu.Item>
          
          <DropdownMenu.Separator className="h-px bg-[#203a74] my-1" />
          
          <DropdownMenu.Item 
            className="flex items-center px-3 py-2 text-sm text-white hover:bg-[#203a74] rounded cursor-pointer focus:outline-none"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserProfileDropdown;


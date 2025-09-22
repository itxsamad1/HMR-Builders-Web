'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Wallet, TrendingUp, DollarSign, Building2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import UserProfileDropdown from '@/components/UserProfileDropdown';

interface Investment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertySlug: string;
  tokensPurchased: number;
  investmentAmount: number;
  totalEarned: number;
  status: string;
  createdAt: string;
}

interface WalletData {
  id: string;
  userId: string;
  totalBalance: number;
  availableBalance: number;
  investedAmount: number;
  totalReturns: number;
  createdAt: string;
  updatedAt: string;
}

const WalletPage = () => {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && token) {
      fetchWalletData();
      fetchInvestments();
    }
  }, [user, token, isLoading, router]);

  const fetchWalletData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/users/wallet`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const data = await res.json();
        setWalletData(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
    }
  };

  const fetchInvestments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/investments/my-investments?limit=50`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const data = await res.json();
        setInvestments(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch investments:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-white text-xl">Loading your wallet...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-2 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 z-50">
        <div className="transparent-navbar rounded-2xl shadow-navbar">
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center space-x-3 text-white hover:text-[#315dca] transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/portfolio" className="text-white hover:text-[#315dca] font-medium transition-colors">
                Portfolio
              </Link>
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-[#315dca]">Wallet</span>
            </h1>
            <p className="text-[#dee0e5] text-lg">Manage your investments and track your returns</p>
          </div>

          {/* Wallet Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Balance */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-[#315dca]/20 rounded-xl">
                  <Wallet className="w-6 h-6 text-[#315dca]" />
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Total Balance</h3>
              <p className="text-2xl font-bold text-white">
                {showBalance ? `PKR ${(walletData?.totalBalance || 0).toLocaleString()}` : '••••••'}
              </p>
            </div>

            {/* Available Balance */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Available Balance</h3>
              <p className="text-2xl font-bold text-white">
                {showBalance ? `PKR ${(walletData?.availableBalance || 0).toLocaleString()}` : '••••••'}
              </p>
            </div>

            {/* Invested Amount */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Invested Amount</h3>
              <p className="text-2xl font-bold text-white">
                {showBalance ? `PKR ${(walletData?.investedAmount || 0).toLocaleString()}` : '••••••'}
              </p>
            </div>

            {/* Total Returns */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Total Returns</h3>
              <p className="text-2xl font-bold text-white">
                {showBalance ? `PKR ${(walletData?.totalReturns || 0).toLocaleString()}` : '••••••'}
              </p>
            </div>
          </div>

          {/* Recent Investments */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Investments</h2>
              <Link 
                href="/portfolio" 
                className="text-[#315dca] hover:text-white font-medium transition-colors"
              >
                View All →
              </Link>
            </div>

            {investments.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Investments Yet</h3>
                <p className="text-white/60 mb-6">Start your real estate investment journey today</p>
                <Link 
                  href="/properties" 
                  className="inline-flex items-center px-6 py-3 bg-[#315dca] hover:bg-[#203a74] text-white font-semibold rounded-lg transition-colors"
                >
                  Browse Properties
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {investments.slice(0, 5).map((investment) => (
                  <div key={investment.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {investment.propertyTitle}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {investment.tokensPurchased} tokens • {new Date(investment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          PKR {investment.investmentAmount.toLocaleString()}
                        </p>
                        <p className="text-green-400 text-sm">
                          +PKR {investment.totalEarned.toLocaleString()} returns
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
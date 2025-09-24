'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/apiUtils';
import { ArrowLeft, Wallet, TrendingUp, DollarSign, Building2, Eye, EyeOff, Plus } from 'lucide-react';
import Link from 'next/link';
import WalletTopUp from '@/components/WalletTopUp';

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
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: 'demo-investment-1',
      propertyId: 'h1-tower',
      propertyTitle: 'H1 Tower',
      propertySlug: 'h1-tower',
      tokensPurchased: 100,
      investmentAmount: 250000,
      totalEarned: 37500,
      status: 'active',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'demo-investment-2',
      propertyId: 'saima-tower',
      propertyTitle: 'Saima Tower',
      propertySlug: 'saima-tower',
      tokensPurchased: 50,
      investmentAmount: 125000,
      totalEarned: 18750,
      status: 'active',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);
  const [walletData, setWalletData] = useState<WalletData | null>({
    id: 'demo-wallet-123',
    userId: 'demo-user-123',
    totalBalance: 2500000,
    availableBalance: 1500000,
    investedAmount: 1000000,
    totalReturns: 150000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [showTopUpModal, setShowTopUpModal] = useState(false);

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
      const response = await api.getWalletData(token!);
      setWalletData(response.data);
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
    }
  };

  const fetchInvestments = async () => {
    try {
      const response = await api.getInvestments(token!, 50);
      setInvestments(response.data);
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
              <p className="text-xl font-bold text-white break-words">
                {showBalance ? `PKR ${Number(walletData?.totalBalance || 0).toLocaleString()}` : '••••••'}
              </p>
            </div>

            {/* Available Balance */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <button
                  onClick={() => setShowTopUpModal(true)}
                  className="bg-[#315dca] hover:bg-[#203a74] text-white p-2 rounded-lg transition-all"
                  title="Top Up Wallet"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Available Balance</h3>
              <p className="text-xl font-bold text-white break-words">
                {showBalance ? `PKR ${Number(walletData?.availableBalance || 0).toLocaleString()}` : '••••••'}
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
              <p className="text-xl font-bold text-white break-words">
                {showBalance ? `PKR ${Number(walletData?.investedAmount || 0).toLocaleString()}` : '••••••'}
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
              <p className="text-xl font-bold text-white break-words">
                {showBalance ? `PKR ${Number(walletData?.totalReturns || 0).toLocaleString()}` : '••••••'}
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

      {/* Wallet Top-Up Modal */}
      {showTopUpModal && (
        <WalletTopUp 
          onClose={() => setShowTopUpModal(false)}
          onSuccess={() => {
            fetchWalletData();
            setShowTopUpModal(false);
          }}
        />
      )}
    </div>
  );
};

export default WalletPage;
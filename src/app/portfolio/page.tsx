'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, TrendingUp, DollarSign, Calendar, MapPin, BarChart3, Wallet, RefreshCw, Menu, ArrowRight, CheckCircle, Coins } from 'lucide-react';
import Link from 'next/link';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { GradientDots } from '@/components/gradient-dots';

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

interface PortfolioStats {
  totalInvestments: number;
  totalInvested: number;
  totalTokens: number;
  totalReturns: number;
}

const PortfolioPage = () => {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [stats, setStats] = useState<PortfolioStats>({
    totalInvestments: 0,
    totalInvested: 0,
    totalTokens: 0,
    totalReturns: 0
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }

    if (user && token) {
      fetchInvestments();
      fetchPortfolioStats();
    }
  }, [user, token, isLoading, router]);

  const fetchInvestments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/investments/my-investments?limit=100`, {
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

  const fetchPortfolioStats = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/investments/my-investments?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const data = await res.json();
        const investments = data.data || [];
        
        // Calculate portfolio stats
        const uniqueProperties = new Set(investments.map((inv: Investment) => inv.propertyId));
        
        const portfolioStats = investments.reduce((acc: PortfolioStats, investment: Investment) => {
          acc.totalInvested += Number(investment.investmentAmount) || 0;
          acc.totalTokens += Number(investment.tokensPurchased) || 0;
          acc.totalReturns += Number(investment.totalEarned) || 0;
          return acc;
        }, {
          totalInvestments: uniqueProperties.size,
          totalInvested: 0,
          totalTokens: 0,
          totalReturns: 0
        });

        setStats(portfolioStats);
      }
    } catch (error) {
      console.error('Failed to fetch portfolio stats:', error);
    }
  };

  // Group investments by property and filter by status
  const groupedInvestments = investments.reduce((acc, investment) => {
    const key = investment.propertyId;
    if (!acc[key]) {
      acc[key] = {
        propertyId: investment.propertyId,
        propertyTitle: investment.propertyTitle,
        propertySlug: investment.propertySlug,
        totalTokens: 0,
        totalInvested: 0,
        totalReturns: 0,
        status: investment.status,
        transactions: []
      };
    }
    acc[key].totalTokens += Number(investment.tokensPurchased);
    acc[key].totalInvested += Number(investment.investmentAmount);
    acc[key].totalReturns += Number(investment.totalEarned);
    acc[key].transactions.push(investment);
    return acc;
  }, {} as Record<string, any>);

  const filteredInvestments = Object.values(groupedInvestments).filter((investment: any) => {
    if (activeTab === 'all') return true;
    return investment.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'completed': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  // Calculate ROI percentage
  const roiPercentage = stats.totalInvested > 0 ? ((stats.totalReturns / stats.totalInvested) * 100).toFixed(1) : '0.0';
  const monthlyYield = stats.totalInvested > 0 ? ((stats.totalReturns / stats.totalInvested) * 100 / 12).toFixed(1) : '0.0';

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="text-white text-xl">Loading your portfolio...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
      {/* Gradient Dots Background */}
      <GradientDots 
        backgroundColor="#0F172A" 
        duration={40} 
        colorCycleDuration={8}
        dotSize={6}
        spacing={12}
      />

      {/* Navigation Bar */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-[#38BDF8]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-white font-orbitron">
                HMR
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/portfolio" className="text-[#38BDF8] font-medium border-b-2 border-[#38BDF8] pb-1">
                  Dashboard
                </Link>
                <Link href="/portfolio" className="text-white/70 hover:text-white font-medium transition-colors">
                  Portfolio
                </Link>
                <Link href="/properties" className="text-white/70 hover:text-white font-medium transition-colors">
                  Marketplace
                </Link>
                <Link href="/wallet" className="text-white/70 hover:text-white font-medium transition-colors">
                  Transactions
                </Link>
                <Link href="/analytics" className="text-white/70 hover:text-white font-medium transition-colors">
                  Analytics
                </Link>
                <Link href="/settings" className="text-white/70 hover:text-white font-medium transition-colors">
                  Settings
                </Link>
              </div>
            </div>

            {/* Connect Wallet Button */}
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-black px-6 py-2 rounded-lg font-semibold shadow-lg shadow-[#38BDF8]/25 hover:shadow-[#38BDF8]/40 transition-all duration-300 transform hover:scale-105">
                Connect Wallet
              </button>
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Portfolio Balance Card */}
          <div className="lg:col-span-2 bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-[#38BDF8]/20 shadow-xl shadow-[#38BDF8]/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white font-orbitron">Portfolio Balance</h2>
              <div className="w-8 h-8 bg-[#38BDF8]/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#38BDF8]" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2 font-orbitron">
                PKR {Number(stats.totalInvested).toLocaleString()}
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 font-semibold">+{roiPercentage}%</span>
                  <span className="text-white/60 text-sm">Return on Investment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{monthlyYield}%</span>
                  <span className="text-white/60 text-sm">Monthly Yield</span>
                </div>
              </div>
            </div>

            {/* Mini Chart Area */}
            <div className="h-24 bg-gradient-to-r from-[#38BDF8]/10 to-[#0EA5E9]/10 rounded-xl border border-[#38BDF8]/20 flex items-end justify-center space-x-1 p-4">
              <div className="w-2 bg-[#38BDF8] rounded-t h-8"></div>
              <div className="w-2 bg-[#38BDF8] rounded-t h-12"></div>
              <div className="w-2 bg-[#38BDF8] rounded-t h-16"></div>
              <div className="w-2 bg-[#38BDF8] rounded-t h-20"></div>
              <div className="w-2 bg-[#38BDF8] rounded-t h-14"></div>
              <div className="w-2 bg-[#38BDF8] rounded-t h-18"></div>
            </div>
          </div>

          {/* Secondary Market Card */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-[#38BDF8]/20 shadow-xl shadow-[#38BDF8]/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white font-orbitron">Secondary Market</h2>
              <Coins className="w-8 h-8 text-[#FACC15]" />
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-white/60">R+</span>
                <span className="text-white font-semibold">PKR 1.34</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">A+</span>
                <span className="text-white font-semibold">PKR 1.35</span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-black py-3 rounded-lg font-semibold shadow-lg shadow-[#38BDF8]/25 hover:shadow-[#38BDF8]/40 transition-all duration-300 transform hover:scale-105">
              Sell
            </button>
          </div>
        </div>

        {/* Holdings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-[#38BDF8]/20 shadow-xl shadow-[#38BDF8]/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white font-orbitron">Holdings</h2>
              <div className="flex space-x-2">
                <button className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'all' ? 'bg-[#38BDF8] text-black' : 'bg-white/10 text-white/70 hover:text-white'
                }`}>
                  Buy
                </button>
                <button className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'active' ? 'bg-[#38BDF8] text-black' : 'bg-white/10 text-white/70 hover:text-white'
                }`}>
                  Sell
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredInvestments.slice(0, 3).map((investment: any) => (
                <div key={investment.propertyId} className="bg-black/20 backdrop-blur-xl rounded-xl p-4 border border-[#38BDF8]/10 hover:border-[#38BDF8]/30 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(investment.status)}`}>
                      {investment.status.toUpperCase()}
                    </span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#38BDF8] transition-colors" />
                  </div>
                  
                  <div className="w-full h-32 bg-gradient-to-br from-[#38BDF8]/20 to-[#0EA5E9]/20 rounded-lg mb-3 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-[#38BDF8]" />
                  </div>
                  
                  <h3 className="text-white font-semibold mb-1">{investment.propertyTitle}</h3>
                  <p className="text-[#38BDF8] font-semibold">PKR {Number(investment.totalInvested).toLocaleString()}</p>
                </div>
              ))}
              
              {/* Placeholder for additional properties */}
              {filteredInvestments.length < 3 && (
                <div className="bg-black/20 backdrop-blur-xl rounded-xl p-4 border border-dashed border-[#38BDF8]/30 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-8 h-8 text-[#38BDF8]/50 mx-auto mb-2" />
                    <p className="text-white/50 text-sm">More Properties</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Secondary Orders */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-[#38BDF8]/20 shadow-xl shadow-[#38BDF8]/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white font-orbitron">Secondary</h2>
              <RefreshCw className="w-5 h-5 text-white/60" />
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2 text-xs text-white/60 mb-2">
                <span>Bid</span>
                <span>Ask</span>
                <span>Orders</span>
                <span>Trades</span>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <span className="text-white">PKR 1.34</span>
                  <span className="text-white">PKR 1.35</span>
                  <span className="text-white">12,500</span>
                  <span className="text-[#38BDF8]">406</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <span className="text-white">PKR 1.35</span>
                  <span className="text-white">PKR 1.35</span>
                  <span className="text-white">5,600</span>
                  <span className="text-[#38BDF8]">325</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-[#38BDF8]/20 shadow-xl shadow-[#38BDF8]/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white font-orbitron">Activity</h2>
            <Menu className="w-5 h-5 text-white/60" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Purchased 17,000 Tokens</p>
                <p className="text-white/50 text-xs">12:15</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Completed KYC verification</p>
                <p className="text-white/50 text-xs">12:13</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">Invested in H1 Tower</p>
                <p className="text-white/50 text-xs">11:08</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FACC15]/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#FACC15]" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">New feature: Auto-staking enabled</p>
                <p className="text-white/50 text-xs">10:55</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
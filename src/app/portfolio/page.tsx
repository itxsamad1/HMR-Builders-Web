'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Building2, TrendingUp, DollarSign, Calendar, MapPin, BarChart3 } from 'lucide-react';
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
        
        const portfolioStats = investments.reduce((acc: PortfolioStats, investment: Investment) => {
          acc.totalInvestments++;
          acc.totalInvested += parseFloat(investment.investmentAmount) || 0;
          acc.totalTokens += parseInt(investment.tokensPurchased) || 0;
          acc.totalReturns += parseFloat(investment.totalEarned) || 0;
          return acc;
        }, {
          totalInvestments: 0,
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

  const filteredInvestments = investments.filter(investment => {
    if (activeTab === 'all') return true;
    return investment.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-white text-xl">Loading your portfolio...</div>
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
            <Link href="/wallet" className="flex items-center space-x-3 text-white hover:text-[#315dca] transition-colors">
              <ArrowLeft className="w-6 h-6" />
              <span className="font-semibold">Back to Wallet</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/wallet" className="text-white hover:text-[#315dca] font-medium transition-colors">
                Wallet
              </Link>
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-[#315dca]">Portfolio</span>
            </h1>
            <p className="text-[#dee0e5] text-lg">Track your real estate investments and performance</p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[#315dca]/20 rounded-xl">
                  <Building2 className="w-6 h-6 text-[#315dca]" />
                </div>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Total Properties</h3>
              <p className="text-2xl font-bold text-white">{stats.totalInvestments}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Total Invested</h3>
              <p className="text-xl font-bold text-white break-words">PKR {Number(stats.totalInvested).toLocaleString()}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Total Tokens</h3>
              <p className="text-xl font-bold text-white">{Number(stats.totalTokens).toLocaleString()}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-white/80 text-sm font-medium mb-2">Total Returns</h3>
              <p className="text-xl font-bold text-white">PKR {Number(stats.totalReturns).toLocaleString()}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20 w-fit mx-auto">
            {[
              { key: 'all', label: 'All Investments', count: investments.length },
              { key: 'active', label: 'Active', count: investments.filter(i => i.status === 'active').length },
              { key: 'completed', label: 'Completed', count: investments.filter(i => i.status === 'completed').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#315dca] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Investments List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            {filteredInvestments.length === 0 ? (
              <div className="text-center py-16">
                <Building2 className="w-20 h-20 text-white/40 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {activeTab === 'all' ? 'No Investments Yet' : `No ${activeTab} investments`}
                </h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  {activeTab === 'all' 
                    ? 'Start building your real estate portfolio by investing in tokenized properties'
                    : `You don't have any ${activeTab} investments at the moment`
                  }
                </p>
                <Link 
                  href="/properties" 
                  className="inline-flex items-center px-8 py-4 bg-[#315dca] hover:bg-[#203a74] text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  Browse Properties
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {filteredInvestments.map((investment) => (
                  <div key={investment.id} className="p-6 hover:bg-white/5 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {investment.propertyTitle}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                            {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-white/60 text-sm">
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="w-4 h-4" />
                            <span>{investment.tokensPurchased} tokens</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(investment.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold text-white mb-1">
                          PKR {investment.investmentAmount.toLocaleString()}
                        </p>
                        <p className="text-green-400 text-sm font-medium">
                          +PKR {investment.totalEarned.toLocaleString()} returns
                        </p>
                        <Link 
                          href={`/properties/${investment.propertySlug}`}
                          className="text-[#315dca] hover:text-white text-sm font-medium transition-colors mt-2 inline-block"
                        >
                          View Property →
                        </Link>
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

export default PortfolioPage;


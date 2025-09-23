'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  MapPin, 
  BarChart3, 
  Wallet, 
  RefreshCw, 
  Menu, 
  ArrowRight, 
  CheckCircle, 
  Coins,
  Lock,
  ExternalLink,
  AlertTriangle,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import { GradientDots } from '@/components/gradient-dots';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { HMRPropertyCard } from '@/components/ui/hmr-property-card';
import { GlowingEffect } from '@/components/ui/glowing-effect';

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

// Sample chart data for portfolio performance
const chartData = [
  { month: 'Jan', value: 3200000 },
  { month: 'Feb', value: 3800000 },
  { month: 'Mar', value: 4200000 },
  { month: 'Apr', value: 4600000 },
  { month: 'May', value: 4900000 },
  { month: 'Jun', value: 5235000 },
];

const chartConfig = {
  value: {
    label: 'Portfolio Value',
    color: '#14b8a6',
  },
};

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
  const [activeHoldingsTab, setActiveHoldingsTab] = useState<'buy' | 'sell'>('buy');

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

  // Group investments by property
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

  const propertiesData = Object.values(groupedInvestments).slice(0, 3);

  // Calculate metrics
  const roiPercentage = stats.totalInvested > 0 ? ((stats.totalReturns / stats.totalInvested) * 100).toFixed(1) : '24.5';
  const monthlyYield = '1.8';

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1426] to-[#1a2332] flex items-center justify-center">
        <div className="text-white text-xl">Loading your portfolio...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1426] to-[#1a2332] relative overflow-hidden">
      {/* Flickering Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(20, 184, 166)"
          maxOpacity={0.4}
        />
      </div>

      {/* Header Navigation */}
      <header className="relative z-50 bg-[#0f1629]/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#f59e0b] rounded-sm flex items-center justify-center">
                  <span className="text-black font-bold text-sm">H</span>
                </div>
                <span className="text-white text-xl font-semibold">HMR</span>
              </div>
              
              {/* Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-8">
               
                <Link href="/portfolio" className="text-[#14b8a6] font-medium border-b-2 border-[#14b8a6] pb-1">
                  Portfolio
                </Link>
               
                <Link href="/wallet" className="text-white hover:text-[#14b8a6] font-medium transition-colors">
                  Transactions
                </Link>
                <Link href="/analytics" className="text-white hover:text-[#14b8a6] font-medium transition-colors">
                  Analytics
                </Link>
                <Link href="/settings" className="text-white hover:text-[#14b8a6] font-medium transition-colors">
                  Settings
                </Link>
              </nav>
            </div>

            {/* Connect Wallet Button */}
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-[#1e293b] to-[#334155] hover:from-[#334155] hover:to-[#475569] text-white border border-gray-600 flex items-center space-x-2 shadow-lg shadow-gray-600/20 hover:shadow-gray-600/30 transition-all duration-300">
                <Lock className="w-4 h-4" />
                <span>Connect Wallet</span>
              </Button>
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* Left Column - 60% width (3 of 5 columns) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Portfolio Balance Card */}
            <div className="relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <Card className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] border border-[#14b8a6]/30 relative overflow-hidden shadow-2xl shadow-[#14b8a6]/10 before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-[#14b8a6]/50 before:via-[#0ea5e9]/30 before:to-[#14b8a6]/50 before:-z-10">
                <div className="absolute inset-0 opacity-5">
                  <FlickeringGrid
                    squareSize={3}
                    gridGap={4}
                    flickerChance={0.1}
                    color="rgb(20, 184, 166)"
                    maxOpacity={0.3}
                  />
                </div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-white text-lg font-medium">Portfolio Balance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                <div>
                  <div className="text-4xl font-bold text-white mb-4">
                    PKR {stats.totalInvested > 0 ? Number(stats.totalInvested).toLocaleString() : '5,235,000'}
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-semibold">+{roiPercentage}%</span>
                      <span className="text-[#94a3b8] text-sm">Return on Investment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{monthlyYield}%</span>
                      <span className="text-[#94a3b8] text-sm">Monthly Yield</span>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-24">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#14b8a6" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                </CardContent>
              </Card>
            </div>

            {/* Holdings Section */}
            <div className="relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <Card className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] border border-[#14b8a6]/30 relative overflow-hidden shadow-2xl shadow-[#14b8a6]/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg font-medium">Holdings</CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        variant={activeHoldingsTab === 'buy' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveHoldingsTab('buy')}
                        className={activeHoldingsTab === 'buy' ? 'bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] hover:from-[#0f9488] hover:to-[#0284c7] shadow-lg shadow-[#14b8a6]/30 text-black' : 'border-gray-600 text-black hover:bg-gradient-to-r hover:from-[#334155] hover:to-[#475569]'}
                      >
                        Buy
                      </Button>
                      <Button 
                        variant={activeHoldingsTab === 'sell' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveHoldingsTab('sell')}
                        className={activeHoldingsTab === 'sell' ? 'bg-gradient-to-r from-[#14b8a6] to-[#0ea5e9] hover:from-[#0f9488] hover:to-[#0284c7] shadow-lg shadow-[#14b8a6]/30 text-black' : 'border-gray-600 text-black hover:bg-gradient-to-r hover:from-[#334155] hover:to-[#475569]'}
                      >
                        Sell
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Property Cards */}
                  {propertiesData.length > 0 ? propertiesData.map((property: any, index: number) => (
                    <HMRPropertyCard
                      key={property.propertyId}
                      imageUrl={`/projects/${property.propertySlug}/main.jpg`}
                      imageAlt={`${property.propertyTitle} - Investment Property`}
                      logo={<Building2 className="h-6 w-6 text-white/80" />}
                      title={property.propertyTitle}
                      location="HMR Waterfront, Karachi"
                      overview={`Your investment in ${property.propertyTitle} with ${property.totalTokens} tokens purchased.`}
                      price={Number(property.totalInvested)}
                      pricePeriod="Invested"
                      status="active"
                      roi="18-22%"
                      tokens={property.totalTokens}
                      availableTokens={0}
                      onInvest={() => window.open(`/properties/${property.propertySlug}`, '_blank')}
                      className="h-80"
                    />
                  )) : (
                    // Default property cards when no data
                    <>
                      <HMRPropertyCard
                        imageUrl="/projects/h1-tower/main.jpg"
                        imageAlt="H1 Tower - Investment Property"
                        logo={<Building2 className="h-6 w-6 text-white/80" />}
                        title="H1 Tower"
                        location="HMR Waterfront, Karachi"
                        overview="Premium residential tower offering luxury living with stunning city views and world-class amenities."
                        price={2500000}
                        pricePeriod="Investment"
                        status="active"
                        roi="18-22%"
                        tokens={1000}
                        availableTokens={342}
                        onInvest={() => window.open('/properties/h1-tower', '_blank')}
                        className="h-80"
                      />

                      <HMRPropertyCard
                        imageUrl="/projects/saima-tower/main.jpg"
                        imageAlt="Saima Tower - Investment Property"
                        logo={<TrendingUp className="h-6 w-6 text-white/80" />}
                        title="Saima Tower"
                        location="HMR Waterfront, Karachi"
                        overview="Ultra-luxury commercial and residential complex with state-of-the-art facilities and smart building technology."
                        price={1750000}
                        pricePeriod="Investment"
                        status="active"
                        roi="17-21%"
                        tokens={1000}
                        availableTokens={1000}
                        onInvest={() => window.open('/properties/saima-tower', '_blank')}
                        className="h-80"
                      />

                      <HMRPropertyCard
                        imageUrl="/projects/aa-waterfront/main.jpg"
                        imageAlt="AA Waterfront - Investment Property"
                        logo={<Building2 className="h-6 w-6 text-white/80" />}
                        title="AA Waterfront"
                        location="HMR Waterfront, Karachi"
                        overview="Smart luxury residential development with stunning sea views and premium amenities."
                        price={1750000}
                        pricePeriod="Investment"
                        status="coming-soon"
                        roi="16-20%"
                        tokens={1000}
                        availableTokens={1000}
                        onInvest={() => window.open('/properties/aa-waterfront', '_blank')}
                        className="h-80"
                      />
                    </>
                  )}
                </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - 40% width (2 of 5 columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Secondary Market Card */}
            <div className="relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <Card className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] border border-[#f59e0b]/30 relative overflow-hidden shadow-2xl shadow-[#f59e0b]/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg font-medium">Secondary Market</CardTitle>
                    <div className="w-8 h-8 bg-gradient-to-br from-[#f59e0b] to-[#f97316] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/30">
                      <span className="text-black font-bold text-sm">M</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#94a3b8]">R+</span>
                      <span className="text-white font-medium">-</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#94a3b8]">A+</span>
                      <span className="text-white font-medium">-</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#94a3b8]">PKR</span>
                      <span className="text-white font-medium">1.34</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#94a3b8]">PKR</span>
                      <span className="text-white font-medium">1.35</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#1e293b] to-[#334155] hover:from-[#334155] hover:to-[#475569] text-white border border-gray-600 shadow-lg shadow-gray-600/20 hover:shadow-gray-600/30 transition-all duration-300">
                    Sell
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Trading Table */}
            <div className="relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <Card className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] border border-[#14b8a6]/30 relative overflow-hidden shadow-2xl shadow-[#14b8a6]/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg font-medium">Secondary Trading</CardTitle>
                    <Menu className="w-5 h-5 text-[#94a3b8]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-xs text-[#94a3b8] pb-2 border-b border-gray-700">
                      <span>Bid</span>
                      <span>Ask</span>
                      <span>Orders</span>
                      <span></span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <span className="text-white">PKR 1.34</span>
                        <span className="text-white">PKR 1.35</span>
                        <span className="text-white">12,500</span>
                        <span className="text-[#14b8a6]">406</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <span className="text-white">PKR 1.35</span>
                        <span className="text-white">PKR 1.35</span>
                        <span className="text-white">5,600</span>
                        <span className="text-[#14b8a6]">325</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Feed */}
            <div className="relative">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <Card className="bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] border border-[#14b8a6]/30 relative overflow-hidden shadow-2xl shadow-[#14b8a6]/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg font-medium">Activity Feed</CardTitle>
                    <Menu className="w-5 h-5 text-[#94a3b8]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Purchased 17.000 Hickens</p>
                      <p className="text-[#94a3b8] text-xs">12:15</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Completed KYC verification</p>
                      <p className="text-[#94a3b8] text-xs">12:13</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-3 h-3 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">Invested in Sarna Tower</p>
                      <p className="text-[#94a3b8] text-xs">11:08</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <AlertTriangle className="w-3 h-3 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">New feature: Auto-staking</p>
                      <p className="text-[#94a3b8] text-xs">10:55</p>
                    </div>
                  </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
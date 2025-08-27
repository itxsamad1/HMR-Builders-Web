import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthenticatedFetch } from '@/lib/auth';
import { useTranslation, formatCurrency } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  TrendingUp, 
  Building2, 
  DollarSign, 
  PlusCircle, 
  FileText,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  language: 'en' | 'ur';
}

interface DashboardData {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    language: string;
  };
  wallet: {
    balance: number;
    totalInvested: number;
    totalDistributions: number;
  };
  portfolio: {
    totalValue: number;
    totalReturn: number;
    investments: Array<{
      id: string;
      units: number;
      amount: number;
      currentValue: number;
      property: {
        name: string;
        nameUrdu: string;
        type: string;
        expectedYield: number;
      } | null;
    }>;
  };
}

export default function Dashboard({ language }: DashboardProps) {
  const { t } = useTranslation(language);
  const { user, isAuthenticated } = useAuth();
  const authenticatedFetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await authenticatedFetch('/api/user/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading || !dashboardData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4 rounded" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-24 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      title: t('dashboard.portfolio.totalValue'),
      value: formatCurrency(dashboardData.portfolio.totalValue, language),
      icon: Building2,
      trend: '+5.2%',
      positive: true,
    },
    {
      title: t('dashboard.portfolio.totalInvested'),
      value: formatCurrency(dashboardData.wallet.totalInvested, language),
      icon: TrendingUp,
      trend: 'All time',
      positive: true,
    },
    {
      title: t('dashboard.portfolio.totalReturns'),
      value: formatCurrency(dashboardData.portfolio.totalReturn, language),
      icon: DollarSign,
      trend: '+12.5%',
      positive: true,
    },
    {
      title: t('dashboard.portfolio.availableBalance'),
      value: formatCurrency(dashboardData.wallet.balance, language),
      icon: Wallet,
      trend: 'Available',
      positive: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {t('dashboard.welcome')}, {dashboardData.user.firstName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'en' 
                ? 'Here\'s an overview of your real estate investment portfolio'
                : 'یہاں آپ کے رئیل اسٹیٹ سرمایہ کاری پورٹ فولیو کا جائزہ ہے'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/documents')}>
              <FileText className="w-4 h-4 mr-2" />
              {t('dashboard.viewReports')}
            </Button>
            <Button variant="investment" onClick={() => navigate('/offerings')}>
              <PlusCircle className="w-4 h-4 mr-2" />
              {t('dashboard.browseProperties')}
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, index) => (
            <Card key={index} className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="actions">Quick Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {t('dashboard.portfolio.title')}
                </CardTitle>
                <CardDescription>
                  Your current real estate investments and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.portfolio.investments.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No investments yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start building your real estate portfolio today
                    </p>
                    <Button variant="investment" onClick={() => navigate('/offerings')}>
                      Browse Properties
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.portfolio.investments.map((investment) => (
                      <div
                        key={investment.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">
                                {language === 'ur' && investment.property?.nameUrdu 
                                  ? investment.property.nameUrdu 
                                  : investment.property?.name || 'Unknown Property'
                                }
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {investment.property?.type || 'Unknown'}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {investment.units.toLocaleString()} units
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatCurrency(investment.currentValue, language)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Invested: {formatCurrency(investment.amount, language)}
                          </div>
                          {investment.property?.expectedYield && (
                            <div className="text-sm text-green-600">
                              {investment.property.expectedYield}% yield
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                  <p>No recent activity to show</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="card-premium cursor-pointer hover:shadow-premium transition-shadow" onClick={() => navigate('/offerings')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    {t('dashboard.browseProperties')}
                  </CardTitle>
                  <CardDescription>
                    Discover new investment opportunities
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-premium cursor-pointer hover:shadow-premium transition-shadow" onClick={() => navigate('/wallet')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    {t('dashboard.addFunds')}
                  </CardTitle>
                  <CardDescription>
                    Add money to your investment wallet
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-premium cursor-pointer hover:shadow-premium transition-shadow" onClick={() => navigate('/documents')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {t('dashboard.viewReports')}
                  </CardTitle>
                  <CardDescription>
                    Download statements and reports
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Compliance Notice */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('disclaimers.riskWarning')}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
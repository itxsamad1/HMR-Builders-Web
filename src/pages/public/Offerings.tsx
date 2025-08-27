import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, formatCurrency, formatPercentage } from '@/lib/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Users, 
  Clock,
  AlertCircle,
  Eye,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Property } from '@/lib/db';

interface OfferingsProps {
  language: 'en' | 'ur';
}

const PropertyCard = ({ property, language }: { property: Property; language: 'en' | 'ur' }) => {
  const { t } = useTranslation(language);
  const navigate = useNavigate();
  
  const fundingProgress = ((property.totalUnits - property.availableUnits) / property.totalUnits) * 100;
  const daysRemaining = Math.ceil((property.fundingDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'funded': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'residential': return '🏠';
      case 'commercial': return '🏢';
      case 'hospitality': return '🏨';
      case 'industrial': return '🏭';
      default: return '🏢';
    }
  };

  return (
    <Card className="card-premium hover:shadow-premium transition-all duration-300 group">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-lg flex items-center justify-center text-6xl">
          {getTypeIcon(property.type)}
        </div>
        <Badge className={`absolute top-3 right-3 ${getStatusColor(property.status)}`}>
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {language === 'ur' && property.nameUrdu ? property.nameUrdu : property.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {language === 'ur' && property.locationUrdu ? property.locationUrdu : property.location}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            {t(`properties.type.${property.type}`)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {formatPercentage(property.expectedYield, language)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t('properties.details.expectedYield')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {formatPercentage(property.targetIRR, language)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t('properties.details.targetIrr')}
            </div>
          </div>
        </div>

        {/* Investment Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {t('properties.details.minimumInvestment')}:
            </span>
            <span className="font-medium">
              {formatCurrency(property.minimumInvestment, language)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {t('properties.details.tenure')}:
            </span>
            <span className="font-medium">
              {property.tenure} {language === 'en' ? 'months' : 'مہینے'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {t('properties.details.occupancyRate')}:
            </span>
            <span className="font-medium">
              {formatPercentage(property.occupancyRate, language)}
            </span>
          </div>
        </div>

        {/* Funding Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t('properties.details.fundingProgress')}
            </span>
            <span className="font-medium">
              {Math.round(fundingProgress)}%
            </span>
          </div>
          <Progress value={fundingProgress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {formatCurrency((property.totalUnits - property.availableUnits) * property.unitPrice, language)} raised
            </span>
            <span>
              {property.availableUnits.toLocaleString()} units left
            </span>
          </div>
        </div>

        {/* Time Remaining */}
        {property.status === 'active' && daysRemaining > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-orange-600 font-medium">
              {daysRemaining} {language === 'en' ? 'days remaining' : 'دن باقی'}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/offerings/${property.id}`)}
          >
            <Eye className="w-4 h-4 mr-1" />
            {t('properties.viewDetails')}
          </Button>
          <Button
            variant="investment"
            size="sm"
            className="flex-1"
            disabled={property.status !== 'active'}
            onClick={() => navigate(`/offerings/${property.id}/invest`)}
          >
            <DollarSign className="w-4 h-4 mr-1" />
            {t('properties.invest')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Offerings({ language }: OfferingsProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'funded'>('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to load properties',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    if (filter === 'all') return true;
    return property.status === filter;
  });

  const stats = {
    totalProperties: properties.length,
    activeOffers: properties.filter(p => p.status === 'active').length,
    totalValue: properties.reduce((sum, p) => sum + p.totalValue, 0),
    averageYield: properties.reduce((sum, p) => sum + p.expectedYield, 0) / properties.length || 0,
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-video w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            {language === 'en' 
              ? 'Real Estate Investment Opportunities'
              : 'رئیل اسٹیٹ سرمایہ کاری کے مواقع'
            }
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en'
              ? 'Discover premium real estate investments across Pakistan. Start building your portfolio with fractional ownership of high-yield properties.'
              : 'پورے پاکستان میں بہترین رئیل اسٹیٹ سرمایہ کاریوں کو دریافت کریں۔ زیادہ منافع والی جائیدادوں کی جزوی ملکیت کے ساتھ اپنا پورٹ فولیو بنانا شروع کریں۔'
            }
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="card-premium">
            <CardContent className="flex items-center p-6">
              <Building2 className="h-8 w-8 text-primary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                <p className="text-2xl font-bold">{stats.totalProperties}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-premium">
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Offers</p>
                <p className="text-2xl font-bold">{stats.activeOffers}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-premium">
            <CardContent className="flex items-center p-6">
              <DollarSign className="h-8 w-8 text-accent" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalValue, language)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-premium">
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg. Yield</p>
                <p className="text-2xl font-bold">{formatPercentage(stats.averageYield, language)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="funded">Funded</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-6">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No properties found</h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? 'No properties are currently available' 
                    : `No ${filter} properties found`
                  }
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    language={language}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Risk Warning */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('disclaimers.riskWarning')} {t('disclaimers.secp')}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
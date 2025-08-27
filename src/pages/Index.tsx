import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation, formatCurrency, formatPercentage } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { Building2, TrendingUp, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface IndexProps {
  language: 'en' | 'ur';
}

const Index = ({ language }: IndexProps) => {
  const { t } = useTranslation(language);
  const navigate = useNavigate();

  const features = [
    {
      icon: Building2,
      title: t('home.features.accessibility.title'),
      description: t('home.features.accessibility.description')
    },
    {
      icon: TrendingUp,
      title: t('home.features.liquidity.title'),
      description: t('home.features.liquidity.description')
    },
    {
      icon: Shield,
      title: t('home.features.compliance.title'),
      description: t('home.features.compliance.description')
    },
    {
      icon: Users,
      title: t('home.features.transparency.title'),
      description: t('home.features.transparency.description')
    }
  ];

  const steps = [
    {
      step: '01',
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description')
    },
    {
      step: '02', 
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description')
    },
    {
      step: '03',
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description')
    },
    {
      step: '04',
      title: t('home.howItWorks.step4.title'),
      description: t('home.howItWorks.step4.description')
    }
  ];

  const stats = [
    { value: formatCurrency(50000, language), label: t('home.hero.minInvestment') },
    { value: '8-12%', label: t('home.hero.expectedReturns') },
    { value: '1,000+', label: t('home.hero.investors') }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 pattern-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 animate-pulse-slow">
              🇵🇰 Pakistan's Premier Real Estate Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-scale-in">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="gold" size="xl" onClick={() => navigate('/auth/register')} className="hover-scale">
                {t('home.hero.startInvesting')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-scale">
                {t('home.hero.learnMore')}
              </Button>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-float">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('home.howItWorks.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="card-premium text-center hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('home.features.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-premium text-center hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              {language === 'en' ? 'Ready to Start Investing?' : 'سرمایہ کاری شروع کرنے کے لیے تیار ہیں؟'}
            </h2>
            <p className="text-xl text-white/90">
              {language === 'en' 
                ? 'Join thousands of investors building wealth through Pakistani real estate'
                : 'ہزاروں سرمایہ کاروں میں شامل ہوں جو پاکستانی رئیل اسٹیٹ کے ذریعے دولت بنا رہے ہیں'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="xl" onClick={() => navigate('/offerings')} className="hover-scale">
                {language === 'en' ? 'View Properties' : 'پراپرٹیز دیکھیں'}
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-scale">
                {language === 'en' ? 'Learn More' : 'مزید جانیں'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
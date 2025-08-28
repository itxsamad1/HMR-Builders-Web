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
      <section className="hero-gradient text-white py-32 pattern-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-5xl mx-auto space-y-10">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 animate-bounce-slow backdrop-blur-sm">
              🇵🇰 Pakistan's Premier Real Estate Platform
            </Badge>
            <div className="animate-fade-up">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent mb-6">
                {t('home.hero.title')}
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-light">
                {t('home.hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in-left">
              <Button variant="gold" size="xl" onClick={() => navigate('/auth/register')} className="hover-lift group shadow-gold">
                {t('home.hero.startInvesting')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-lift backdrop-blur-sm">
                {t('home.hero.learnMore')}
              </Button>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-up hover-scale group" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                  <div className="text-white/80 text-lg font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-muted/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-5xl font-bold mb-6 text-primary">{t('home.howItWorks.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to start your real estate investment journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="card-premium text-center hover-lift group relative overflow-hidden animate-scale-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-white">{step.step}</span>
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">{step.description}</CardDescription>
                </CardContent>
                <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-5xl font-bold mb-6 text-primary">{t('home.features.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Why choose HMR for your real estate investments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-premium text-center hover-lift group border-2 border-transparent hover:border-primary/20 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium group-hover:shadow-elegant transition-shadow duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-up">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              {language === 'en' ? 'Ready to Start Investing?' : 'سرمایہ کاری شروع کرنے کے لیے تیار ہیں؟'}
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto font-light">
              {language === 'en' 
                ? 'Join thousands of investors building wealth through Pakistani real estate'
                : 'ہزاروں سرمایہ کاروں میں شامل ہوں جو پاکستانی رئیل اسٹیٹ کے ذریعے دولت بنا رہے ہیں'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-left">
              <Button variant="gold" size="xl" onClick={() => navigate('/offerings')} className="hover-lift group shadow-gold">
                {language === 'en' ? 'View Properties' : 'پراپرٹیز دیکھیں'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-lift backdrop-blur-sm">
                {language === 'en' ? 'Learn More' : 'مزید جانیں'}
              </Button>
            </div>
            <div className="pt-12">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-white/90 font-medium">
                  {language === 'en' ? 'SECP Compliant Platform' : 'SECP کمپلائنٹ پلیٹ فارم'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
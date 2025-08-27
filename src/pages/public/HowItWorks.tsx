import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Wallet, 
  Building2, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';

interface HowItWorksProps {
  language: 'en' | 'ur';
}

export default function HowItWorks({ language }: HowItWorksProps) {
  const { t } = useTranslation(language);
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      icon: UserCheck,
      title: t('home.howItWorks.step1.title'),
      description: t('home.howItWorks.step1.description'),
      details: [
        'Complete KYC with CNIC verification',
        'Upload required documents',
        'Verify your identity',
        'Set up 2FA for security'
      ]
    },
    {
      step: 2,
      icon: Wallet,
      title: t('home.howItWorks.step2.title'),
      description: t('home.howItWorks.step2.description'),
      details: [
        'Bank transfer (IBFT)',
        'Raast instant payments',
        'Digital wallet integration',
        'Secure payment processing'
      ]
    },
    {
      step: 3,
      icon: Building2,
      title: t('home.howItWorks.step3.title'),
      description: t('home.howItWorks.step3.description'),
      details: [
        'Browse verified properties',
        'Review due diligence reports',
        'Invest from PKR 50,000',
        'Receive digital tokens'
      ]
    },
    {
      step: 4,
      icon: TrendingUp,
      title: t('home.howItWorks.step4.title'),
      description: t('home.howItWorks.step4.description'),
      details: [
        'Quarterly distribution payments',
        'Capital appreciation potential',
        'Real-time portfolio tracking',
        'Secondary market liquidity'
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'SECP Regulated',
      description: 'Fully compliant with Pakistan securities law'
    },
    {
      icon: Clock,
      title: 'Quick Process',
      description: 'Start investing in under 10 minutes'
    },
    {
      icon: CheckCircle,
      title: 'Verified Properties',
      description: 'All properties undergo rigorous due diligence'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">How It Works</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' 
              ? 'Start Investing in 4 Simple Steps'
              : 'صرف 4 آسان قدموں میں سرمایہ کاری شروع کریں'
            }
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en'
              ? 'Get started with real estate investment in Pakistan through our secure and transparent platform'
              : 'ہمارے محفوظ اور شفاف پلیٹ فارم کے ذریعے پاکستان میں رئیل اسٹیٹ سرمایہ کاری شروع کریں'
            }
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {steps.map((step, index) => (
            <Card key={step.step} className="card-premium">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge variant="outline">Step {step.step}</Badge>
                    <CardTitle className="text-xl mt-2">{step.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Why Choose HMR?' : 'ایچ ایم آر کیوں منتخب کریں؟'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-premium text-center">
                <CardHeader>
                  <benefit.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-primary text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready to Get Started?' : 'شروع کرنے کے لیے تیار ہیں؟'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'en'
              ? 'Join thousands of investors building wealth through Pakistani real estate'
              : 'ہزاروں سرمایہ کاروں میں شامل ہوں جو پاکستانی رئیل اسٹیٹ کے ذریعے دولت بنا رہے ہیں'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="gold" 
              size="xl" 
              onClick={() => navigate('/auth/register')}
              className="hover-scale"
            >
              {language === 'en' ? 'Create Account' : 'اکاؤنٹ بنائیں'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate('/offerings')}
            >
              {language === 'en' ? 'View Properties' : 'پراپرٹیز دیکھیں'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
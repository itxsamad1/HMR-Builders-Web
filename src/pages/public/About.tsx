import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Award, 
  Target,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';

interface AboutProps {
  language: 'en' | 'ur';
}

export default function About({ language }: AboutProps) {
  const { t } = useTranslation(language);
  const navigate = useNavigate();

  const stats = [
    { value: '1000+', label: 'Active Investors', icon: Users },
    { value: 'PKR 250M+', label: 'Assets Under Management', icon: Building2 },
    { value: '15+', label: 'Premium Properties', icon: Award },
    { value: '8.5%', label: 'Average Annual Return', icon: Target }
  ];

  const team = [
    {
      name: 'Ahmed Hassan',
      role: 'CEO & Founder',
      description: '15+ years in Pakistani real estate development',
      image: '👨‍💼'
    },
    {
      name: 'Sarah Khan', 
      role: 'CTO',
      description: 'Former fintech executive with blockchain expertise',
      image: '👩‍💻'
    },
    {
      name: 'Muhammad Ali',
      role: 'Head of Compliance',
      description: 'Former SECP regulatory specialist',
      image: '👨‍💼'
    }
  ];

  const values = [
    {
      icon: Building2,
      title: 'Quality First',
      description: 'We only select premium properties with strong fundamentals'
    },
    {
      icon: Users,
      title: 'Transparency',
      description: 'Full disclosure on all investments with real-time reporting'
    },
    {
      icon: Award,
      title: 'Compliance',
      description: 'Strict adherence to SECP regulations and best practices'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">About HMR</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' 
              ? 'Building Pakistan\'s Future Through Real Estate'
              : 'رئیل اسٹیٹ کے ذریعے پاکستان کا مستقبل بنانا'
            }
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en'
              ? 'HMR Builders is Pakistan\'s leading real estate tokenization platform, making premium property investment accessible to everyone through innovative blockchain technology.'
              : 'ایچ ایم آر بلڈرز پاکستان کا سرکردہ رئیل اسٹیٹ ٹوکنائزیشن پلیٹ فارم ہے، جو جدید بلاک چین ٹیکنالوجی کے ذریعے ہر ایک کے لیے پریمیم پراپرٹی سرمایہ کاری کو قابل رسائی بناتا ہے۔'
            }
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="card-premium text-center">
              <CardContent className="p-6">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                {language === 'en'
                  ? 'To democratize real estate investment in Pakistan by providing transparent, secure, and accessible investment opportunities through innovative technology and regulatory compliance.'
                  : 'جدید ٹیکنالوجی اور ریگولیٹری کمپلائنس کے ذریعے شفاف، محفوظ اور قابل رسائی سرمایہ کاری کے مواقع فراہم کرکے پاکستان میں رئیل اسٹیٹ سرمایہ کاری کو جمہوری بنانا۔'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                {language === 'en'
                  ? 'To become Pakistan\'s leading real estate investment platform, enabling millions of Pakistanis to build wealth through property ownership and contribute to the nation\'s economic growth.'
                  : 'پاکستان کا سرکردہ رئیل اسٹیٹ سرمایہ کاری پلیٹ فارم بننا، لاکھوں پاکستانیوں کو پراپرٹی کی ملکیت کے ذریعے دولت بنانے اور قوم کی اقتصادی ترقی میں حصہ ڈالنے کے قابل بنانا۔'
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Our Values' : 'ہماری اقدار'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-premium text-center">
                <CardHeader>
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            {language === 'en' ? 'Meet Our Team' : 'ہماری ٹیم سے ملیں'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-premium text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-primary text-white p-12 rounded-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'en' ? 'Get in Touch' : 'رابطہ کریں'}
            </h2>
            <p className="text-xl opacity-90">
              {language === 'en'
                ? 'Have questions? Our team is here to help you get started'
                : 'سوالات ہیں؟ ہماری ٹیم آپ کو شروع کرنے میں مدد کے لیے موجود ہے'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <Mail className="w-8 h-8 mx-auto mb-2" />
              <div className="font-medium">Email</div>
              <div className="opacity-90">info@hmr.pk</div>
            </div>
            <div className="text-center">
              <Phone className="w-8 h-8 mx-auto mb-2" />
              <div className="font-medium">Phone</div>
              <div className="opacity-90">+92 21 1234-5678</div>
            </div>
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="font-medium">Address</div>
              <div className="opacity-90">Karachi, Pakistan</div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              variant="gold" 
              size="xl" 
              onClick={() => navigate('/auth/register')}
              className="hover-scale"
            >
              {language === 'en' ? 'Start Investing Today' : 'آج ہی سرمایہ کاری شروع کریں'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
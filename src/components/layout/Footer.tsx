import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';
import { DollarSign, Mail, Phone, MapPin, Building2 } from 'lucide-react';

interface FooterProps {
  language: 'en' | 'ur';
}

export const Footer = ({ language }: FooterProps) => {
  const { t } = useTranslation(language);

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/src/assets/hmr-logo.jpg" 
                alt="HMR Logo" 
                className="h-8 w-8 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center hidden">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                HMR<span className="text-primary">.pk</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              {language === 'en' 
                ? "Pakistan's premier real estate tokenization platform. Invest in premium properties with transparency and compliance."
                : "پاکستان کا بہترین رئیل اسٹیٹ ٹوکنائزیشن پلیٹ فارم۔ شفافیت اور مطابقت کے ساتھ بہترین جائیدادوں میں سرمایہ کاری کریں۔"
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium">
              {language === 'en' ? 'Quick Links' : 'فوری لنکس'}
            </h3>
            <div className="space-y-2 text-sm">
              <Link to="/offerings" className="block hover:text-primary transition-colors">
                {t('nav.offerings')}
              </Link>
              <Link to="/how-it-works" className="block hover:text-primary transition-colors">
                {t('nav.howItWorks')}
              </Link>
              <Link to="/yields" className="block hover:text-primary transition-colors">
                {t('nav.yields')}
              </Link>
              <Link to="/safety" className="block hover:text-primary transition-colors">
                {t('nav.safety')}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-medium">
              {language === 'en' ? 'Legal' : 'قانونی'}
            </h3>
            <div className="space-y-2 text-sm">
              <Link to="/terms" className="block hover:text-primary transition-colors">
                {language === 'en' ? 'Terms of Service' : 'خدمات کی شرائط'}
              </Link>
              <Link to="/privacy" className="block hover:text-primary transition-colors">
                {language === 'en' ? 'Privacy Policy' : 'رازداری کی پالیسی'}
              </Link>
              <Link to="/compliance" className="block hover:text-primary transition-colors">
                {language === 'en' ? 'Regulatory Compliance' : 'ریگولیٹری کمپلائنس'}
              </Link>
              <Link to="/risk-disclosure" className="block hover:text-primary transition-colors">
                {language === 'en' ? 'Risk Disclosure' : 'خطرے کا انکشاف'}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-medium">
              {language === 'en' ? 'Contact Us' : 'رابطہ کریں'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@hmr.pk</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+92 21 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  {language === 'en' 
                    ? 'Karachi, Pakistan'
                    : 'کراچی، پاکستان'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 HMR Builders. {language === 'en' ? 'All rights reserved.' : 'تمام حقوق محفوظ ہیں۔'}
            </div>
            <div className="text-xs text-muted-foreground max-w-md text-center">
              {language === 'en' 
                ? 'SECP Licensed. This platform operates under Pakistan securities regulations. Investments carry risk.'
                : 'SECP لائسنس یافتہ۔ یہ پلیٹ فارم پاکستان کے سیکیورٹیز ریگولیشنز کے تحت کام کرتا ہے۔ سرمایہ کاری میں خطرہ ہے۔'
              }
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
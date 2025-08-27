import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  TrendingUp, 
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  DollarSign
} from 'lucide-react';

interface LearnProps {
  language: 'en' | 'ur';
}

export default function Learn({ language }: LearnProps) {
  const { t } = useTranslation(language);
  const navigate = useNavigate();

  const topics = [
    {
      icon: BookOpen,
      title: 'Real Estate Basics',
      description: 'Understanding property investment fundamentals',
      articles: 8
    },
    {
      icon: Calculator,
      title: 'Investment Analysis',
      description: 'How to evaluate property returns and risks',
      articles: 6
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Pakistan real estate market trends and forecasts',
      articles: 12
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Protecting your investments and understanding risks',
      articles: 5
    }
  ];

  const faqs = [
    {
      question: 'What is real estate tokenization?',
      answer: 'Real estate tokenization is the process of converting ownership rights in a property into digital tokens on a blockchain. This allows investors to buy fractional shares of premium properties with lower minimum investments.'
    },
    {
      question: 'How much can I invest?',
      answer: 'The minimum investment varies by property but typically starts from PKR 50,000. There is no maximum limit, allowing you to invest according to your financial capacity.'
    },
    {
      question: 'What returns can I expect?',
      answer: 'Historical returns range from 8-12% annually, depending on the property type and market conditions. Returns come from both rental income distributions and potential capital appreciation.'
    },
    {
      question: 'Is this investment safe?',
      answer: 'While all investments carry risk, we minimize this through thorough due diligence, regulatory compliance, and diversified property portfolios. All investments are subject to market risks.'
    },
    {
      question: 'How do I receive my returns?',
      answer: 'Returns are distributed quarterly directly to your HMR wallet. You can then withdraw funds to your bank account or reinvest in other properties.'
    },
    {
      question: 'Can I sell my tokens?',
      answer: 'Yes, tokens can be traded on our secondary marketplace (subject to availability and regulatory restrictions). This provides liquidity compared to traditional real estate investments.'
    }
  ];

  const glossary = [
    {
      term: 'IRR (Internal Rate of Return)',
      definition: 'The annualized rate of return on an investment, taking into account the time value of money'
    },
    {
      term: 'Yield',
      definition: 'The annual rental income from a property expressed as a percentage of the property value'
    },
    {
      term: 'WAULT',
      definition: 'Weighted Average Unexpired Lease Term - measures the average time remaining on all leases'
    },
    {
      term: 'Occupancy Rate',
      definition: 'The percentage of rentable space that is occupied by paying tenants'
    },
    {
      term: 'Cap Rate',
      definition: 'Capitalization rate - the ratio of net operating income to property asset value'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Learning Center</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'en' 
              ? 'Master Real Estate Investment'
              : 'رئیل اسٹیٹ سرمایہ کاری میں مہارت حاصل کریں'
            }
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'en'
              ? 'Learn everything you need to know about real estate investment in Pakistan. From basics to advanced strategies.'
              : 'پاکستان میں رئیل اسٹیٹ سرمایہ کاری کے بارے میں جو کچھ جاننے کی ضرورت ہے وہ سب سیکھیں۔ بنیادی باتوں سے لے کر اعلیٰ درجے کی حکمت عملیوں تک۔'
            }
          </p>
        </div>

        <Tabs defaultValue="topics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="topics">Learning Topics</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="glossary">Glossary</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {topics.map((topic, index) => (
                <Card key={index} className="card-premium hover:shadow-premium transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <topic.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>{topic.title}</CardTitle>
                        <Badge variant="secondary">{topic.articles} articles</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{topic.description}</CardDescription>
                    <Button variant="ghost" className="mt-4 p-0 h-auto text-primary">
                      Read Articles <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-8">
            <Card className="card-premium max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Investment Calculator
                </CardTitle>
                <CardDescription>
                  Estimate your potential returns from real estate investment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Investment Amount (PKR)</label>
                    <input 
                      type="number" 
                      className="w-full p-3 border border-border rounded-lg"
                      placeholder="100,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Annual Yield (%)</label>
                    <input 
                      type="number" 
                      className="w-full p-3 border border-border rounded-lg"
                      placeholder="8.5"
                    />
                  </div>
                </div>
                
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Projected Returns</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">PKR 8,500</div>
                      <div className="text-sm text-muted-foreground">Annual Income</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">PKR 2,125</div>
                      <div className="text-sm text-muted-foreground">Quarterly</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">PKR 708</div>
                      <div className="text-sm text-muted-foreground">Monthly</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4" />
                  This is an estimate. Actual returns may vary based on market conditions.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-8">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions about real estate investment with HMR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="glossary" className="space-y-8">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Investment Glossary</CardTitle>
                <CardDescription>
                  Key terms and definitions for real estate investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {glossary.map((item, index) => (
                    <div key={index} className="border-b border-border pb-4">
                      <h3 className="font-semibold text-lg mb-2">{item.term}</h3>
                      <p className="text-muted-foreground">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center bg-gradient-primary text-white p-12 rounded-2xl mt-16">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'en' ? 'Ready to Apply Your Knowledge?' : 'اپنے علم کو لاگو کرنے کے لیے تیار ہیں؟'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === 'en'
              ? 'Start your real estate investment journey with as little as PKR 50,000'
              : 'صرف 50,000 روپے سے اپنا رئیل اسٹیٹ سرمایہ کاری کا سفر شروع کریں'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="gold" 
              size="xl" 
              onClick={() => navigate('/offerings')}
              className="hover-scale"
            >
              <DollarSign className="mr-2 h-5 w-5" />
              {language === 'en' ? 'View Properties' : 'پراپرٹیز دیکھیں'}
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => navigate('/auth/register')}
            >
              {language === 'en' ? 'Create Account' : 'اکاؤنٹ بنائیں'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Shield, TrendingUp, Users } from 'lucide-react';

const FAQsPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is tokenized real estate?",
          answer: "Tokenized real estate is a digital representation of real property ownership. Instead of buying an entire property, you can purchase digital tokens that represent fractional ownership of the property. Each token is backed by real assets and gives you proportional rights to rental income and property appreciation."
        },
        {
          question: "How does HMR Builders work?",
          answer: "HMR Builders is Pakistan's premier tokenized real estate platform. We acquire premium properties, divide them into digital tokens, and allow investors to purchase these tokens starting from just PKR 1 Million. Investors receive their share of rental income and property appreciation based on their token ownership."
        },
        {
          question: "Is HMR Builders regulated?",
          answer: "Yes, HMR Builders is fully regulated by the Securities and Exchange Commission of Pakistan (SECP). We operate under strict regulatory guidelines to ensure investor protection and platform security. All our properties are vetted and comply with Pakistani real estate laws."
        },
        {
          question: "What is the minimum investment amount?",
          answer: "The minimum investment amount is PKR 1 Million. This low entry barrier makes real estate investment accessible to a wider range of investors, allowing you to start building your property portfolio with a modest initial investment."
        }
      ]
    },
    {
      category: "Investment",
      questions: [
        {
          question: "What returns can I expect?",
          answer: "Our properties typically offer 15-22% expected annual returns, which include both rental income and property appreciation. Returns vary by property and market conditions, but we focus on high-yield properties in prime locations to maximize investor returns."
        },
        {
          question: "How often do I receive rental income?",
          answer: "Rental income is distributed monthly to all token holders. The amount you receive depends on your token ownership percentage and the property's rental performance. All distributions are processed automatically through our platform."
        },
        {
          question: "Can I sell my tokens?",
          answer: "Yes, you can sell your tokens on our secondary market. We provide liquidity options for investors who want to exit their positions. Token prices are determined by market demand and property performance."
        },
        {
          question: "What happens if the property value decreases?",
          answer: "Like all investments, real estate values can fluctuate. However, we focus on properties in prime locations with strong fundamentals. Our properties are carefully selected based on location, market trends, and growth potential to minimize downside risk."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          question: "How are tokens secured?",
          answer: "All tokens are secured using blockchain technology, ensuring transparency and immutability. Each token represents a verifiable ownership stake in the underlying property, and all transactions are recorded on the blockchain for complete transparency."
        },
        {
          question: "What documents do I receive?",
          answer: "You receive digital ownership certificates and detailed investment reports. All documents are stored securely on our platform and can be accessed anytime. We also provide regular updates on property performance and market conditions."
        },
        {
          question: "How do I track my investments?",
          answer: "Our comprehensive dashboard allows you to track all your investments in real-time. You can monitor property performance, rental income, token values, and overall portfolio performance through our user-friendly interface."
        },
        {
          question: "Is my personal information secure?",
          answer: "Yes, we use bank-level encryption and security measures to protect your personal and financial information. We comply with all data protection regulations and never share your information with third parties without your consent."
        }
      ]
    },
    {
      category: "Property Management",
      questions: [
        {
          question: "Who manages the properties?",
          answer: "Our experienced property management team handles all aspects of property management, including tenant relations, maintenance, rent collection, and property upkeep. We ensure properties are well-maintained to protect and enhance their value."
        },
        {
          question: "How are properties selected?",
          answer: "We have a rigorous property selection process that includes location analysis, market research, financial projections, and due diligence. We only select properties in prime locations with strong growth potential and reliable rental income."
        },
        {
          question: "What if a property needs major repairs?",
          answer: "Major repairs and improvements are funded through property reserves and, if necessary, through additional capital calls to token holders. All major expenses are transparently communicated to investors with detailed explanations and cost breakdowns."
        },
        {
          question: "Can I visit the properties?",
          answer: "Yes, we organize property visits for token holders. You can schedule visits to see your investments in person and meet with our property management team. We also provide virtual tours and detailed property documentation."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const stats = [
    { icon: Users, value: "1,000+", label: "Active Investors" },
    { icon: TrendingUp, value: "15-22%", label: "Expected Returns" },
    { icon: Shield, value: "SECP", label: "Regulated Platform" }
  ];

  return (
    <div className="min-h-screen hero-gradient overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-2 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 z-50">
        <div className="bg-[#0e1521]/90 backdrop-blur-sm rounded-2xl shadow-navbar border border-[#203a74]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center text-white hover:text-[#315dca] transition-colors text-sm sm:text-base">
              <ArrowLeft size={16} className="mr-1.5 sm:mr-2 sm:w-5 sm:h-5" />
              Back to Home
            </Link>

            <div className="flex items-center">
              <Image 
                src="/hmr-group.svg" 
                alt="HMR Group" 
                width={32} 
                height={32}
                className="mr-2 sm:w-10 sm:h-10"
              />
              <div className="text-base sm:text-lg lg:text-xl font-bold text-white">
                HMR <span className="text-[#315dca]">BUILDERS</span>
              </div>
            </div>

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Frequently Asked <span className="text-[#315dca]">Questions</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#dee0e5] max-w-3xl mx-auto">
              Find answers to common questions about tokenized real estate investment with HMR Builders.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center">
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#315dca] mx-auto mb-4" />
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-[#dee0e5] text-sm sm:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center">
                  <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#315dca] mr-3" />
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openFAQ === globalIndex;
                    
                    return (
                      <div key={faqIndex} className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full p-4 sm:p-6 text-left flex justify-between items-center hover:bg-white/20 transition-colors"
                        >
                          <h3 className="text-base sm:text-lg font-semibold text-white pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#315dca] flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#315dca] flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="border-t border-[#203a74]/50 pt-4">
                              <p className="text-[#dee0e5] text-sm sm:text-base leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 bg-[#0e1521]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-base sm:text-lg text-[#dee0e5] mb-8">
            Our support team is here to help you with any questions about tokenized real estate investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#315dca] hover:bg-[#203a74] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors">
              Contact Support
            </Link>
            <Link href="/get-started" className="border border-[#315dca] text-[#315dca] hover:bg-[#315dca] hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-colors">
              Start Investing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQsPage;

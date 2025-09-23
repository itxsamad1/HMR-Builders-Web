'use client'

import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { CreditCard, MapPin, User, Building, Globe, ArrowRight, SkipForward, CheckCircle } from 'lucide-react';
import OTPVerification from './OTPVerification';

interface PostLoginBillingSetupProps {
  onComplete: () => void;
  onSkip: () => void;
}

const PostLoginBillingSetup = ({ onComplete, onSkip }: PostLoginBillingSetupProps) => {
  const { token } = useAuth();
  const [step, setStep] = useState<'currency' | 'billing' | 'payment' | 'otp' | 'success'>('currency');
  const [billingData, setBillingData] = useState({
    currency: 'PKR',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    country: 'Pakistan',
    postalCode: '',
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currencies = [
    { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰', rate: 1.0 },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rate: 278.50 },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 305.20 },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 352.80 }
  ];

  const validateCurrencyStep = () => {
    if (!billingData.currency) {
      setErrors({ currency: 'Please select a currency' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateBillingStep = () => {
    const newErrors: Record<string, string> = {};

    if (!billingData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!billingData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!billingData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!billingData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!billingData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!billingData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!billingData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!billingData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentStep = () => {
    const newErrors: Record<string, string> = {};

    if (!billingData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(billingData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!billingData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }

    if (!billingData.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required';
    }

    if (!billingData.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required';
    }

    if (!billingData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(billingData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    // Luhn algorithm validation
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const detectCardType = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\D/g, '');
    
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return 'mastercard';
    
    return null;
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(' ').substring(0, 19);
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;

    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
    }

    if (field === 'expiryMonth' || field === 'expiryYear' || field === 'cvv') {
      processedValue = value.replace(/\D/g, '');
    }

    const newBillingData = { ...billingData, [field]: processedValue };
    setBillingData(newBillingData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleNext = () => {
    if (step === 'currency' && validateCurrencyStep()) {
      setStep('billing');
    } else if (step === 'billing' && validateBillingStep()) {
      setStep('payment');
    } else if (step === 'payment' && validatePaymentStep()) {
      setStep('otp');
    }
  };

  const handleBack = () => {
    if (step === 'billing') {
      setStep('currency');
    } else if (step === 'payment') {
      setStep('billing');
    } else if (step === 'otp') {
      setStep('payment');
    }
  };

  const handleOTPVerified = async (otp: string) => {
    setIsLoading(true);
    setErrors({});

    try {
      // Save payment method to backend
      const paymentMethodData = {
        cardNumber: billingData.cardNumber,
        cardHolderName: billingData.cardHolderName,
        expiryMonth: billingData.expiryMonth,
        expiryYear: billingData.expiryYear,
        cvv: billingData.cvv,
        currency: billingData.currency,
        billingAddress: {
          firstName: billingData.firstName,
          lastName: billingData.lastName,
          email: billingData.email,
          phone: billingData.phone,
          company: billingData.company,
          address: billingData.address,
          city: billingData.city,
          state: billingData.state,
          country: billingData.country,
          postalCode: billingData.postalCode
        }
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/payment-methods`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentMethodData)
      });

      if (res.ok) {
        setStep('success');
        setTimeout(() => {
          onComplete();
        }, 2000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save payment method');
      }
    } catch (error) {
      console.error('Save payment method error:', error);
      setErrors({ general: (error as Error).message || 'Failed to save payment method' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPError = (error: string) => {
    setErrors({ otp: error });
  };

  const handleSkip = async () => {
    // Just complete the setup without payment method
    onComplete();
  };

  const cardType = detectCardType(billingData.cardNumber);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#315dca]/20 rounded-full mb-4">
              <CreditCard className="w-8 h-8 text-[#315dca]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
            <p className="text-white/60">
              Set up your billing information and payment method to start investing
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              {['currency', 'billing', 'payment', 'otp'].map((stepName, index) => (
                <div key={stepName} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === stepName || ['currency', 'billing', 'payment', 'otp'].indexOf(step) > index
                      ? 'bg-[#315dca] text-white' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-1 rounded mx-1 ${
                      ['currency', 'billing', 'payment', 'otp'].indexOf(step) > index
                        ? 'bg-[#315dca]' 
                        : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Currency Selection */}
          {step === 'currency' && (
            <div className="space-y-6">
              <div className="text-center">
                <Globe className="w-12 h-12 text-[#315dca] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select Your Currency</h3>
                <p className="text-white/60 text-sm">
                  Choose your preferred currency for transactions
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currencies.map((currency) => (
                  <label
                    key={currency.code}
                    className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                      billingData.currency === currency.code
                        ? 'bg-[#315dca]/20 border-[#315dca]'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="currency"
                      value={currency.code}
                      checked={billingData.currency === currency.code}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{currency.flag}</span>
                      <div>
                        <div className="font-semibold text-white">{currency.name}</div>
                        <div className="text-white/60 text-sm">{currency.code}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {errors.currency && (
                <p className="text-red-400 text-sm text-center">{errors.currency}</p>
              )}
            </div>
          )}

          {/* Billing Information */}
          {step === 'billing' && (
            <div className="space-y-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#315dca] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Billing Information</h3>
                <p className="text-white/60 text-sm">
                  Please provide your billing details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="John"
                      value={billingData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                        errors.firstName ? 'border-red-500' : 'border-white/20'
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={billingData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.lastName ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={billingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.email ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={billingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.phone ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Company (Optional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Your Company"
                      value={billingData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca]"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main Street, Apartment 4B"
                    value={billingData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.address ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    placeholder="Karachi"
                    value={billingData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.city ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    placeholder="Sindh"
                    value={billingData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.state ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.state && (
                    <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Country *
                  </label>
                  <select
                    value={billingData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#315dca]"
                  >
                    <option value="Pakistan" className="bg-gray-800">🇵🇰 Pakistan</option>
                    <option value="United States" className="bg-gray-800">🇺🇸 United States</option>
                    <option value="United Kingdom" className="bg-gray-800">🇬🇧 United Kingdom</option>
                    <option value="Canada" className="bg-gray-800">🇨🇦 Canada</option>
                    <option value="Australia" className="bg-gray-800">🇦🇺 Australia</option>
                    <option value="United Arab Emirates" className="bg-gray-800">🇦🇪 UAE</option>
                    <option value="Saudi Arabia" className="bg-gray-800">🇸🇦 Saudi Arabia</option>
                  </select>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    placeholder="75500"
                    value={billingData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.postalCode ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center">
                <CreditCard className="w-12 h-12 text-[#315dca] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Payment Method</h3>
                <p className="text-white/60 text-sm">
                  Add your VISA or Mastercard for transactions
                </p>
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={billingData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.cardNumber ? 'border-red-500' : 'border-white/20'
                    }`}
                    maxLength={19}
                  />
                  {cardType && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className={`w-8 h-5 rounded flex items-center justify-center text-xs font-bold text-white ${
                        cardType === 'visa' ? 'bg-blue-600' : 'bg-red-600'
                      }`}>
                        {cardType === 'visa' ? 'VISA' : 'MC'}
                      </div>
                    </div>
                  )}
                </div>
                {errors.cardNumber && (
                  <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              {/* Card Holder Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Card Holder Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={billingData.cardHolderName}
                  onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                    errors.cardHolderName ? 'border-red-500' : 'border-white/20'
                  }`}
                />
                {errors.cardHolderName && (
                  <p className="text-red-400 text-sm mt-1">{errors.cardHolderName}</p>
                )}
              </div>

              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Expiry Date *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={billingData.expiryMonth}
                      onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                      className={`px-3 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                        errors.expiryMonth ? 'border-red-500' : 'border-white/20'
                      }`}
                    >
                      <option value="" className="bg-gray-800">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1} className="bg-gray-800">
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="YYYY"
                      value={billingData.expiryYear}
                      onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                      className={`px-3 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                        errors.expiryYear ? 'border-red-500' : 'border-white/20'
                      }`}
                      maxLength={4}
                    />
                  </div>
                  {(errors.expiryMonth || errors.expiryYear) && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.expiryMonth || errors.expiryYear}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={billingData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                      errors.cvv ? 'border-red-500' : 'border-white/20'
                    }`}
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* OTP Verification */}
          {step === 'otp' && (
            <div>
              <OTPVerification
                onOTPVerified={handleOTPVerified}
                onOTPError={handleOTPError}
                isLoading={isLoading}
              />
              {errors.otp && (
                <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm text-center">{errors.otp}</p>
                </div>
              )}
            </div>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Setup Complete!</h3>
                <p className="text-white/60 mb-4">
                  Your billing information and payment method have been saved successfully.
                </p>
                <p className="text-white/40 text-sm">
                  You can now start investing in real estate tokens.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {step !== 'success' && (
            <div className="flex gap-3 pt-6">
              {step !== 'currency' && step !== 'otp' && (
                <button
                  onClick={handleBack}
                  className="flex-1 bg-white/10 border border-white/20 py-3 px-6 rounded-xl text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Back
                </button>
              )}
              
              <button
                onClick={handleSkip}
                className="flex-1 bg-white/10 border border-white/20 py-3 px-6 rounded-xl text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <SkipForward className="w-4 h-4" />
                Skip for Later
              </button>
              
              {step !== 'otp' && (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 px-6 rounded-xl text-white font-semibold hover:from-[#203a74] hover:to-[#315dca] transition-all flex items-center justify-center gap-2"
                >
                  {step === 'payment' ? 'Verify Card' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {errors.general && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-300 text-sm text-center">{errors.general}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostLoginBillingSetup;

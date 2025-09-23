'use client'

import { useState } from 'react';
import { CreditCard, Calendar, User, Shield } from 'lucide-react';

interface PaymentMethodFormProps {
  onPaymentMethodChange: (paymentMethod: any) => void;
  initialData?: any;
  showCurrency?: boolean;
}

const PaymentMethodForm = ({ onPaymentMethodChange, initialData, showCurrency = true }: PaymentMethodFormProps) => {
  const [formData, setFormData] = useState({
    cardNumber: initialData?.cardNumber || '',
    cardHolderName: initialData?.cardHolderName || '',
    expiryMonth: initialData?.expiryMonth || '',
    expiryYear: initialData?.expiryYear || '',
    cvv: initialData?.cvv || '',
    currency: initialData?.currency || 'PKR'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    } else {
      const cardType = detectCardType(formData.cardNumber);
      if (!cardType || !['visa', 'mastercard'].includes(cardType)) {
        newErrors.cardNumber = 'Only VISA and Mastercard are supported';
      }
    }

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }

    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required';
    } else if (parseInt(formData.expiryMonth) < 1 || parseInt(formData.expiryMonth) > 12) {
      newErrors.expiryMonth = 'Invalid month';
    }

    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required';
    } else {
      const currentYear = new Date().getFullYear();
      if (parseInt(formData.expiryYear) < currentYear) {
        newErrors.expiryYear = 'Card has expired';
      }
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;

    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
    }

    if (field === 'expiryMonth' || field === 'expiryYear') {
      processedValue = value.replace(/\D/g, '');
    }

    if (field === 'cvv') {
      processedValue = value.replace(/\D/g, '');
    }

    const newFormData = { ...formData, [field]: processedValue };
    setFormData(newFormData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }

    // Validate and pass data to parent
    if (validateForm()) {
      onPaymentMethodChange(newFormData);
    } else {
      onPaymentMethodChange(null);
    }
  };

  const cardType = detectCardType(formData.cardNumber);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-[#315dca]" />
        <h3 className="text-xl font-semibold text-white">Payment Method</h3>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
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
          Card Holder Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="John Doe"
            value={formData.cardHolderName}
            onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
            className={`w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
              errors.cardHolderName ? 'border-red-500' : 'border-white/20'
            }`}
          />
        </div>
        {errors.cardHolderName && (
          <p className="text-red-400 text-sm mt-1">{errors.cardHolderName}</p>
        )}
      </div>

      {/* Expiry Date and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Expiry Date
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <select
                value={formData.expiryMonth}
                onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                className={`w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
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
            </div>
            <input
              type="text"
              placeholder="YYYY"
              value={formData.expiryYear}
              onChange={(e) => handleInputChange('expiryYear', e.target.value)}
              className={`w-full px-3 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
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
            CVV
          </label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] ${
                errors.cvv ? 'border-red-500' : 'border-white/20'
              }`}
              maxLength={4}
            />
          </div>
          {errors.cvv && (
            <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
          )}
        </div>
      </div>

      {/* Currency Selection */}
      {showCurrency && (
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#315dca]"
          >
            <option value="PKR" className="bg-gray-800">PKR - Pakistani Rupee</option>
            <option value="USD" className="bg-gray-800">USD - US Dollar</option>
            <option value="EUR" className="bg-gray-800">EUR - Euro</option>
            <option value="GBP" className="bg-gray-800">GBP - British Pound</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;

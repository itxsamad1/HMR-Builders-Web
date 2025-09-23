'use client'

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { CreditCard, DollarSign, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import CardManagement from './CardManagement';
import OTPVerification from './OTPVerification';

interface PaymentMethod {
  id: string;
  cardType: string;
  cardNumberMasked: string;
  cardHolderName: string;
  expiryMonth: number;
  expiryYear: number;
  currency: string;
  isDefault: boolean;
  isVerified: boolean;
  status: string;
  createdAt: string;
}

interface EnhancedWalletTopUpProps {
  onClose: () => void;
  onSuccess: () => void;
}

const EnhancedWalletTopUp = ({ onClose, onSuccess }: EnhancedWalletTopUpProps) => {
  const { token } = useAuth();
  const [step, setStep] = useState<'amount' | 'card' | 'otp' | 'success'>('amount');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PKR');
  const [selectedCard, setSelectedCard] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  const exchangeRates = {
    PKR: 1,
    USD: 280,
    EUR: 305,
    GBP: 355
  };

  const amountInPKR = parseFloat(amount) * (exchangeRates[currency as keyof typeof exchangeRates] || 1);

  const handleAmountSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount.' });
      return;
    }
    setStep('card');
    setMessage(null);
  };

  const handleCardSelected = (card: PaymentMethod) => {
    setSelectedCard(card);
    setCurrency(card.currency);
    setMessage(null);
  };

  const handleCardSubmit = () => {
    if (!selectedCard) {
      setMessage({ type: 'error', text: 'Please select a payment method.' });
      return;
    }
    setStep('otp');
    setMessage(null);
  };

  const handleOTPVerify = async (otp: string) => {
    if (otp !== '1122') {
      setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' });
      return false;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      // Create wallet transaction
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/wallet-transactions/deposit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: currency,
          paymentMethodId: selectedCard?.id,
          description: `Wallet top-up via ${selectedCard?.cardType.toUpperCase()} ending in ${selectedCard?.cardNumberMasked.slice(-4)}`,
          otpVerified: true
        })
      });

      if (res.ok) {
        setStep('success');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to process wallet top-up');
      }
    } catch (error: any) {
      console.error('Wallet top-up error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to process wallet top-up. Please try again.' });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const renderStepContent = () => {
    switch (step) {
      case 'amount':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Funds to Wallet</h3>
              <p className="text-gray-600">Enter the amount you want to add to your wallet</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PKR">🇵🇰 PKR (Pakistani Rupee)</SelectItem>
                    <SelectItem value="USD">🇺🇸 USD (US Dollar)</SelectItem>
                    <SelectItem value="EUR">🇪🇺 EUR (Euro)</SelectItem>
                    <SelectItem value="GBP">🇬🇧 GBP (British Pound)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {amount && parseFloat(amount) > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Amount in PKR:</span>
                      <span className="font-semibold text-blue-900">
                        {formatAmount(amountInPKR, 'PKR')}
                      </span>
                    </div>
                    {currency !== 'PKR' && (
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">Exchange Rate:</span>
                        <span className="text-xs text-gray-500">
                          1 {currency} = {exchangeRates[currency as keyof typeof exchangeRates]} PKR
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <Button 
              onClick={handleAmountSubmit} 
              className="w-full" 
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Payment Method</h3>
              <p className="text-gray-600">Choose a payment method for your wallet top-up</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Top-up Amount:</span>
                  <span className="font-semibold">{formatAmount(parseFloat(amount), currency)}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">Amount in PKR:</span>
                  <span className="font-semibold">{formatAmount(amountInPKR, 'PKR')}</span>
                </div>
              </div>

              <CardManagement
                onCardSelected={handleCardSelected}
                showSelectButton={true}
                selectedCardId={selectedCard?.id}
                showAddButton={true}
              />
            </div>

            <Button 
              onClick={handleCardSubmit} 
              className="w-full" 
              disabled={!selectedCard}
            >
              Continue with {selectedCard?.cardType.toUpperCase()}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );

      case 'otp':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Transaction</h3>
              <p className="text-gray-600">Enter the OTP to confirm your wallet top-up</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="font-semibold">{formatAmount(parseFloat(amount), currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Method:</span>
                <span className="font-semibold">
                  {selectedCard?.cardType.toUpperCase()} ****{selectedCard?.cardNumberMasked.slice(-4)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Amount in PKR:</span>
                <span className="font-semibold">{formatAmount(amountInPKR, 'PKR')}</span>
              </div>
            </div>

            <OTPVerification
              onVerify={handleOTPVerify}
              isLoading={isProcessing}
              message={message}
              fixedOtp="1122"
            />
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Top-up Successful!</h3>
              <p className="text-gray-600 mb-4">
                {formatAmount(amountInPKR, 'PKR')} has been added to your wallet
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  Your wallet balance has been updated. You can now use these funds for investments.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Wallet Top-up</span>
          </DialogTitle>
          <DialogDescription>
            Add funds to your wallet using your saved payment methods
          </DialogDescription>
        </DialogHeader>

        {message && (
          <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : message.type === 'error'
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            {message.type === 'success' && <CheckCircle className="w-4 h-4" />}
            {message.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        <div className="mt-6">
          {renderStepContent()}
        </div>

        {step !== 'success' && (
          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              {step === 'card' && (
                <Button variant="outline" onClick={() => setStep('amount')}>
                  Back
                </Button>
              )}
              {step === 'otp' && (
                <Button variant="outline" onClick={() => setStep('card')}>
                  Back
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedWalletTopUp;

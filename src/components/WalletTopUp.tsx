'use client'

import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Wallet, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import PaymentMethodForm from './PaymentMethodForm';
import OTPVerification from './OTPVerification';

interface WalletTopUpProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const WalletTopUp = ({ onClose, onSuccess }: WalletTopUpProps) => {
  const { token } = useAuth();
  const [step, setStep] = useState<'payment' | 'otp' | 'success'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState('');
  const [userPaymentMethods, setUserPaymentMethods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const presetAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/payment-methods`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setUserPaymentMethods(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch payment methods:', error);
    }
  };

  const handlePaymentMethodChange = (method: any) => {
    setPaymentMethod(method);
    setError('');
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
    setError('');
  };

  const proceedToOTP = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (userPaymentMethods.length === 0 && !paymentMethod) {
      setError('Please add a payment method');
      return;
    }

    setStep('otp');
  };

  const handleOTPVerified = async (otp: string) => {
    setIsLoading(true);
    setError('');

    try {
      const paymentMethodId = selectedPaymentMethodId || 'new';
      const requestBody: any = {
        amount: parseFloat(amount),
        currency: paymentMethod?.currency || 'PKR'
      };

      if (paymentMethodId === 'new') {
        // Use new payment method
        requestBody.paymentMethod = paymentMethod;
      } else {
        // Use existing payment method
        requestBody.paymentMethodId = paymentMethodId;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/wallet-transactions/deposit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (res.ok) {
        const data = await res.json();
        setTransactionId(data.data.transactionId);
        setStep('success');
        onSuccess?.();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Transaction failed');
      }
    } catch (error) {
      console.error('Top-up error:', error);
      setError((error as Error).message || 'Failed to process top-up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPError = (error: string) => {
    setError(error);
  };

  const resetForm = () => {
    setStep('payment');
    setAmount('');
    setPaymentMethod(null);
    setSelectedPaymentMethodId('');
    setError('');
    setTransactionId('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-[#315dca]" />
              <h2 className="text-xl font-bold text-white">Top Up Wallet</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Amount to Add
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleAmountSelect(preset)}
                      className={`p-3 rounded-lg border transition-all ${
                        amount === preset.toString()
                          ? 'bg-[#315dca] border-[#315dca] text-white'
                          : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      PKR {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              {userPaymentMethods.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Select Payment Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="new"
                        checked={selectedPaymentMethodId === 'new'}
                        onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-[#315dca]" />
                        <span className="text-white">Add new payment method</span>
                      </div>
                    </label>
                    {userPaymentMethods.map((method) => (
                      <label key={method.id} className="flex items-center p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-all">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethodId === method.id}
                          onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-5 rounded flex items-center justify-center text-xs font-bold text-white ${
                            method.card_type === 'visa' ? 'bg-blue-600' : 'bg-red-600'
                          }`}>
                            {method.card_type === 'visa' ? 'VISA' : 'MC'}
                          </div>
                          <span className="text-white">{method.card_number_masked}</span>
                          <span className="text-white/60 text-sm">{method.currency}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Method Form */}
              {(selectedPaymentMethodId === 'new' || userPaymentMethods.length === 0) && (
                <PaymentMethodForm
                  onPaymentMethodChange={handlePaymentMethodChange}
                  showCurrency={true}
                />
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={proceedToOTP}
                disabled={!amount || parseFloat(amount) <= 0 || (selectedPaymentMethodId === 'new' && !paymentMethod)}
                className="w-full bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 px-6 rounded-xl text-white font-semibold hover:from-[#203a74] hover:to-[#315dca] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Proceed to Verification
              </button>
            </div>
          )}

          {step === 'otp' && (
            <div>
              <OTPVerification
                onOTPVerified={handleOTPVerified}
                onOTPError={handleOTPError}
                isLoading={isLoading}
              />
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm text-center">{error}</p>
                </div>
              )}
              <button
                onClick={() => setStep('payment')}
                className="w-full mt-4 text-[#315dca] hover:text-white text-sm font-medium transition-colors"
              >
                ← Back to Payment
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Top-up Successful!</h3>
                <p className="text-white/60 mb-4">
                  PKR {parseFloat(amount).toLocaleString()} has been added to your wallet
                </p>
                <p className="text-white/40 text-sm">
                  Transaction ID: {transactionId}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 px-6 rounded-xl text-white font-semibold hover:from-[#203a74] hover:to-[#315dca] transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletTopUp;

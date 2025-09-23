'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { User, Mail, Lock, Eye, EyeOff, CreditCard } from 'lucide-react';
import PaymentMethodForm from './PaymentMethodForm';
import OTPVerification from './OTPVerification';

const RegistrationForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { login } = useAuth();
  
  const [step, setStep] = useState<'form' | 'payment' | 'otp' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError('');
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      setError('Full name is required');
      return false;
    }

    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!password) {
      setError('Password is required');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStep('payment');
  };

  const handlePaymentMethodChange = (method: any) => {
    setPaymentMethod(method);
    setError('');
  };

  const proceedToOTP = () => {
    if (!paymentMethod) {
      setError('Please add a payment method');
      return;
    }
    setStep('otp');
  };

  const handleOTPVerified = async (otp: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/register-with-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName || formData.name.split(' ')[0],
          lastName: formData.lastName || formData.name.split(' ').slice(1).join(' '),
          paymentMethod: paymentMethod
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store token and user data
        localStorage.setItem('hmr_token', data.token);
        
        // Update auth context
        await login(formData.email, formData.password);
        
        setStep('success');
        
        // Redirect after success
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError((error as Error).message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPError = (error: string) => {
    setError(error);
  };

  const resetForm = () => {
    setStep('form');
    setError('');
    setPaymentMethod(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-[#315dca]" />
              <h2 className="text-xl font-bold text-white">
                {step === 'form' && 'Create Account'}
                {step === 'payment' && 'Payment Method'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'success' && 'Welcome!'}
              </h2>
            </div>
            {step !== 'success' && (
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Progress Steps */}
          {step !== 'success' && (
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === 'form' ? 'bg-[#315dca] text-white' : 'bg-white/20 text-white/60'
                }`}>
                  1
                </div>
                <div className={`w-8 h-1 rounded ${
                  ['payment', 'otp', 'success'].includes(step) ? 'bg-[#315dca]' : 'bg-white/20'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  ['payment', 'otp', 'success'].includes(step) ? 'bg-[#315dca] text-white' : 'bg-white/20 text-white/60'
                }`}>
                  2
                </div>
                <div className={`w-8 h-1 rounded ${
                  ['otp', 'success'].includes(step) ? 'bg-[#315dca]' : 'bg-white/20'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  ['otp', 'success'].includes(step) ? 'bg-[#315dca] text-white' : 'bg-white/20 text-white/60'
                }`}>
                  3
                </div>
              </div>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca]"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 px-6 rounded-xl text-white font-semibold hover:from-[#203a74] hover:to-[#315dca] transition-all"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <CreditCard className="w-12 h-12 text-[#315dca] mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Add Payment Method</h3>
                <p className="text-white/60 text-sm">
                  Add your VISA or Mastercard to start investing
                </p>
              </div>

              <PaymentMethodForm
                onPaymentMethodChange={handlePaymentMethodChange}
                showCurrency={true}
              />

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-white/10 border border-white/20 py-3 px-6 rounded-xl text-white font-semibold hover:bg-white/20 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={proceedToOTP}
                  disabled={!paymentMethod}
                  className="flex-1 bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 px-6 rounded-xl text-white font-semibold hover:from-[#203a74] hover:to-[#315dca] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Verify Card
                </button>
              </div>
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
                <h3 className="text-xl font-semibold text-white mb-2">Welcome to HMR Builders!</h3>
                <p className="text-white/60 mb-4">
                  Your account has been created successfully. You can now start investing in real estate tokens.
                </p>
              </div>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 px-6 rounded-xl text-white font-semibold hover:from-[#203a74] hover:to-[#315dca] transition-all"
              >
                Start Investing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

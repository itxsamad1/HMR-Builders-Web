'use client'

import { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, X } from 'lucide-react';

interface OTPVerificationProps {
  onVerify?: (otp: string) => Promise<boolean> | boolean;
  onOTPVerified?: (otp: string) => void;
  onOTPError?: (error: string) => void;
  isLoading?: boolean;
  autoFocus?: boolean;
  message?: { type: 'success' | 'error' | 'info', text: string } | null;
  fixedOtp?: string;
}

const OTPVerification = ({ 
  onVerify, 
  onOTPVerified, 
  onOTPError, 
  isLoading = false, 
  autoFocus = true, 
  message,
  fixedOtp = '1122'
}: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const FIXED_OTP = fixedOtp;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleOTPChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setOtp(numericValue);
    setError('');
    
    if (numericValue.length === 4) {
      verifyOTP(numericValue);
    }
  };

  const verifyOTP = async (otpValue: string) => {
    if (otpValue === FIXED_OTP) {
      setSuccess(true);
      setError('');
      
      // Use the new onVerify callback if provided, otherwise fall back to onOTPVerified
      if (onVerify) {
        try {
          const result = await onVerify(otpValue);
          if (!result) {
            setSuccess(false);
            setError('OTP verification failed');
          }
        } catch (error) {
          setSuccess(false);
          setError('OTP verification failed');
        }
      } else if (onOTPVerified) {
        onOTPVerified(otpValue);
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(`Invalid OTP. ${3 - newAttempts} attempts remaining.`);
      
      if (onOTPError) {
        onOTPError('Invalid OTP');
      }
      
      if (newAttempts >= 3) {
        setError('Maximum attempts reached. Please try again later.');
        setTimeout(() => {
          setAttempts(0);
          setOtp('');
          setError('');
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 3000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && otp.length === 4) {
      verifyOTP(otp);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#315dca]/20 rounded-full mb-4">
          <Shield className="w-8 h-8 text-[#315dca]" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">OTP Verification</h3>
        <p className="text-white/60 text-sm max-w-md mx-auto">
          Enter the OTP sent to your registered mobile number to complete the transaction
        </p>
        <p className="text-yellow-400 text-xs mt-2 font-medium">
          Demo OTP: 1122
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(e) => handleOTPChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || success}
            className={`w-full px-6 py-4 text-center text-2xl font-bold tracking-widest bg-white/10 backdrop-blur-lg border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#315dca] transition-all ${
              error 
                ? 'border-red-500 bg-red-500/10' 
                : success 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-white/20'
            }`}
            maxLength={4}
          />
          
          {success && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          )}
          
          {error && !success && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <X className="w-6 h-6 text-red-400" />
            </div>
          )}
        </div>

        {message && (
          <div className={`border rounded-lg p-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30' 
              : message.type === 'error' 
              ? 'bg-red-500/10 border-red-500/30' 
              : 'bg-blue-500/10 border-blue-500/30'
          }`}>
            <p className={`text-sm text-center ${
              message.type === 'success' 
                ? 'text-green-300' 
                : message.type === 'error' 
                ? 'text-red-300' 
                : 'text-blue-300'
            }`}>
              {message.text}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-300 text-sm text-center flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              OTP verified successfully!
            </p>
          </div>
        )}

        {isLoading && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-300 text-sm text-center">
              Verifying OTP...
            </p>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            setOtp('');
            setError('');
            setSuccess(false);
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          className="text-[#315dca] hover:text-white text-sm font-medium transition-colors"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;

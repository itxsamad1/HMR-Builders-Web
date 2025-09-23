'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { X, CreditCard, Shield, CheckCircle, Wallet, Plus } from 'lucide-react'
import { useAuth } from './AuthProvider'
import EnhancedWalletTopUp from './EnhancedWalletTopUp'

type Props = {
  open: boolean
  onClose: () => void
  propertyId: string
  tokenSymbol: string
  pricePerTokenNumber: number
}

export default function BuyTokenDialog({ open, onClose, propertyId, tokenSymbol, pricePerTokenNumber }: Props) {
  const { token, user } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info')
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [hasPaymentMethods, setHasPaymentMethods] = useState<boolean>(false)
  const [showWalletTopUp, setShowWalletTopUp] = useState(false)
  const [isLoadingWallet, setIsLoadingWallet] = useState(true)

  const total = useMemo(() => (quantity || 0) * pricePerTokenNumber, [quantity, pricePerTokenNumber])
  const hasInsufficientBalance = total > walletBalance

  useEffect(() => {
    if (open && token) {
      checkWalletAndPaymentMethods()
    }
  }, [open, token])

  const checkWalletAndPaymentMethods = async () => {
    setIsLoadingWallet(true)
    try {
      // Check wallet balance
      const walletRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/users/wallet`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (walletRes.ok) {
        const walletData = await walletRes.json()
        setWalletBalance(walletData.data?.availableBalance || 0)
      }

      // Check payment methods
      const paymentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/payment-methods`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (paymentRes.ok) {
        const paymentData = await paymentRes.json()
        setHasPaymentMethods(paymentData.data && paymentData.data.length > 0)
      }
    } catch (error) {
      console.error('Failed to check wallet and payment methods:', error)
    } finally {
      setIsLoadingWallet(false)
    }
  }

  const handleSubmit = async () => {
    if (!user) {
      setMessage('Please sign in to continue')
      setMessageType('error')
      return
    }

    if (!token) {
      setMessage('Authentication token missing. Please login again.')
      setMessageType('error')
      return
    }

    if (quantity < 1) {
      setMessage('Please enter a valid quantity')
      setMessageType('error')
      return
    }

    // Check if user has insufficient balance
    if (hasInsufficientBalance) {
      if (!hasPaymentMethods) {
        setMessage('Insufficient wallet balance and no payment methods available. Please add funds to your wallet first.')
        setMessageType('error')
        return
      } else {
        setShowWalletTopUp(true)
        return
      }
    }

    setIsSubmitting(true)
    setMessage(null)
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/investments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId,
          tokensPurchased: quantity,
          investmentAmount: total,
          payment: { method: 'bank_transfer' },
        }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data?.error || data?.message || 'Failed to create investment')
      }
      
      setMessage('🎉 Purchase successful! Your tokens have been added to your portfolio.')
      setMessageType('success')
      
      // Close dialog after 2 seconds on success
      setTimeout(() => {
        onClose()
      }, 2000)
      
    } catch (e: any) {
      console.error('Investment error:', e)
      setMessage(e.message || 'Something went wrong. Please try again.')
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 relative border border-slate-700 shadow-2xl">
        <button 
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors" 
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#315dca]/20 rounded-lg">
            <CreditCard className="text-[#315dca] w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-white">Buy Tokens</h3>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-3 mb-4 border border-slate-700">
          <p className="text-sm text-slate-300">
            <span className="text-slate-400">Token:</span> 
            <span className="ml-2 font-medium text-white">{tokenSymbol}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">Quantity</label>
            <input
              type="number"
              min={1}
              max={1000}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || '1', 10)))}
              className="w-full rounded-lg bg-slate-700 border border-slate-600 p-3 text-white placeholder-slate-400 focus:border-[#315dca] focus:ring-1 focus:ring-[#315dca] transition-colors"
              placeholder="Enter quantity"
            />
          </div>
          
          <div className="space-y-3 bg-slate-800/30 rounded-lg p-4 border border-slate-700">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Price per token</span>
              <span className="font-semibold text-white">PKR {pricePerTokenNumber.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Quantity</span>
              <span className="text-white">{quantity} tokens</span>
            </div>
            <div className="border-t border-slate-600 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-slate-300">Total</span>
                <span className="text-xl font-bold text-[#315dca]">PKR {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Wallet Balance Display */}
          {!isLoadingWallet && (
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-4 h-4 text-slate-300" />
                  <span className="text-sm text-slate-300">Wallet Balance</span>
                </div>
                <span className={`font-semibold ${hasInsufficientBalance ? 'text-red-400' : 'text-green-400'}`}>
                  PKR {walletBalance.toLocaleString()}
                </span>
              </div>
              {hasInsufficientBalance && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-300">Insufficient Balance</span>
                  {hasPaymentMethods ? (
                    <button
                      onClick={() => setShowWalletTopUp(true)}
                      className="text-xs text-[#315dca] hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Funds</span>
                    </button>
                  ) : (
                    <span className="text-xs text-red-300">No payment methods</span>
                  )}
                </div>
              )}
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
              messageType === 'success' 
                ? 'bg-green-900/30 text-green-300 border border-green-700' 
                : messageType === 'error'
                ? 'bg-red-900/30 text-red-300 border border-red-700'
                : 'bg-blue-900/30 text-blue-300 border border-blue-700'
            }`}>
              {messageType === 'success' && <CheckCircle className="w-4 h-4" />}
              {messageType === 'error' && <X className="w-4 h-4" />}
              {messageType === 'info' && <Shield className="w-4 h-4" />}
              {message}
            </div>
          )}
          
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full rounded-lg bg-gradient-to-r from-[#315dca] to-[#203a74] py-3 font-semibold text-white hover:from-[#203a74] hover:to-[#315dca] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Buy Now'
            )}
          </button>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
            <Shield className="w-3 h-3" />
            <span>Secure transaction protected</span>
          </div>
        </div>
      </div>

      {/* Enhanced Wallet Top-Up Modal */}
      {showWalletTopUp && (
        <EnhancedWalletTopUp
          onClose={() => {
            setShowWalletTopUp(false)
            // Refresh wallet data after top-up
            checkWalletAndPaymentMethods()
          }}
          onSuccess={() => {
            setShowWalletTopUp(false)
            checkWalletAndPaymentMethods()
          }}
        />
      )}
    </div>
  )
}



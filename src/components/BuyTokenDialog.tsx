'use client'

import React, { useMemo, useState } from 'react'
import { X, CreditCard, Shield, CheckCircle } from 'lucide-react'
import { useAuth } from './AuthProvider'

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

  const total = useMemo(() => (quantity || 0) * pricePerTokenNumber, [quantity, pricePerTokenNumber])

  const handleSubmit = async () => {
    console.log('Buy token submit - User:', user);
    console.log('Buy token submit - Token:', token);
    
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

    setIsSubmitting(true)
    setMessage(null)
    
    try {
      console.log('Making investment request to:', `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/investments`);
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
      console.log('Request body:', {
        propertyId,
        tokensPurchased: quantity,
        investmentAmount: total,
        payment: { method: 'bank_transfer' },
      });
      
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
      
      console.log('Investment response status:', res.status);
      console.log('Investment response headers:', Object.fromEntries(res.headers.entries()));
      
      const data = await res.json()
      console.log('Investment response data:', data);
      
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
    </div>
  )
}



'use client'

import React, { useMemo, useState } from 'react'
import { X } from 'lucide-react'
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

  const total = useMemo(() => (quantity || 0) * pricePerTokenNumber, [quantity, pricePerTokenNumber])

  const handleSubmit = async () => {
    if (!user) {
      setMessage('Please sign in to continue')
      return
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
      if (!res.ok) throw new Error(data?.error || 'Failed to create investment')
      setMessage('Purchase successful!')
    } catch (e: any) {
      setMessage(e.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 relative">
        <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold mb-2">Buy Tokens</h3>
        <p className="text-sm text-gray-600 mb-4">Token: {tokenSymbol}</p>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-700">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value || '1', 10))}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Price per token</span>
            <span className="font-semibold">PKR {pricePerTokenNumber.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total</span>
            <span className="font-semibold">PKR {total.toLocaleString()}</span>
          </div>
          {message && <div className="text-sm text-center text-[#315dca]">{message}</div>}
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#315dca] py-2.5 font-semibold text-white hover:bg-[#203a74] disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  )
}



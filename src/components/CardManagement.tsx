'use client'

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CreditCard, Plus, Edit, Trash2, Shield, CheckCircle } from 'lucide-react';
import PaymentMethodForm from './PaymentMethodForm';

interface PaymentMethod {
  id: string;
  card_type?: string; // Backend format
  cardType?: string; // Frontend format
  card_number_masked?: string; // Backend format
  cardNumberMasked?: string; // Frontend format
  card_holder_name?: string; // Backend format
  cardHolderName?: string; // Frontend format
  expiry_month?: number; // Backend format
  expiryMonth?: number; // Frontend format
  expiry_year?: number; // Backend format
  expiryYear?: number; // Frontend format
  currency: string;
  is_default?: boolean; // Backend format
  isDefault?: boolean; // Frontend format
  is_verified?: boolean; // Backend format
  isVerified?: boolean; // Frontend format
  status: string;
  created_at?: string; // Backend format
  createdAt?: string; // Frontend format
}

interface CardManagementProps {
  onCardAdded?: () => void;
  onCardSelected?: (card: PaymentMethod) => void;
  showAddButton?: boolean;
  showSelectButton?: boolean;
  selectedCardId?: string;
}

const CardManagement = ({ 
  onCardAdded, 
  onCardSelected, 
  showAddButton = true, 
  showSelectButton = false,
  selectedCardId 
}: CardManagementProps) => {
  const { token } = useAuth();
  const [cards, setCards] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/payment-methods`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setCards(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardAdded = () => {
    fetchCards();
    setShowAddForm(false);
    onCardAdded?.();
  };

  // Helper function to normalize payment method data
  const normalizePaymentMethod = (card: any): PaymentMethod => {
    return {
      id: card.id,
      cardType: card.cardType || card.card_type || '',
      cardNumberMasked: card.cardNumberMasked || card.card_number_masked || '',
      cardHolderName: card.cardHolderName || card.card_holder_name || '',
      expiryMonth: card.expiryMonth || card.expiry_month || 0,
      expiryYear: card.expiryYear || card.expiry_year || 0,
      currency: card.currency || 'PKR',
      isDefault: card.isDefault || card.is_default || false,
      isVerified: card.isVerified || card.is_verified || false,
      status: card.status || 'active',
      createdAt: card.createdAt || card.created_at || ''
    };
  };

  const getCardIcon = (cardType: string) => {
    if (!cardType) return '💳';
    switch (cardType.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      default:
        return '💳';
    }
  };

  const getCardTypeColor = (cardType: string) => {
    if (!cardType) return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    switch (cardType.toLowerCase()) {
      case 'visa':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'mastercard':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const formatExpiry = (month: number, year: number) => {
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cards List */}
      {cards.length > 0 ? (
        <div className="space-y-3">
          {cards.map((card) => {
            const normalizedCard = normalizePaymentMethod(card);
            return (
              <Card 
                key={normalizedCard.id} 
                className={`bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all ${
                  selectedCardId === normalizedCard.id ? 'ring-2 ring-[#315dca] bg-[#315dca]/20' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCardIcon(normalizedCard.cardType)}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-white">
                            {normalizedCard.cardNumberMasked}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getCardTypeColor(normalizedCard.cardType)}`}
                          >
                            {normalizedCard.cardType?.toUpperCase() || 'CARD'}
                          </Badge>
                          {normalizedCard.isDefault && (
                            <Badge className="bg-[#315dca]/20 text-[#315dca] border-[#315dca]/30 text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-white/70">
                          {normalizedCard.cardHolderName} • Expires {formatExpiry(normalizedCard.expiryMonth, normalizedCard.expiryYear)}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-white/60">
                            {normalizedCard.currency}
                          </span>
                          {normalizedCard.isVerified ? (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              <span className="text-xs">Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-yellow-600">
                              <Shield className="w-3 h-3" />
                              <span className="text-xs">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  
                    <div className="flex items-center space-x-2">
                      {showSelectButton && (
                        <Button
                          variant={selectedCardId === normalizedCard.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => onCardSelected?.(normalizedCard)}
                        >
                          {selectedCardId === normalizedCard.id ? 'Selected' : 'Select'}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-white/10 backdrop-blur-lg border-dashed border-2 border-white/30">
          <CardContent className="p-8 text-center">
            <CreditCard className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Payment Methods</h3>
            <p className="text-white/70 mb-4">
              Add a payment method to start making investments and managing your wallet.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add Card Button */}
      {showAddButton && (
        <>
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          ) : (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Add New Payment Method</CardTitle>
                <CardDescription className="text-white/70">
                  Add a new VISA or Mastercard for wallet transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethodForm
                  onSubmit={handleCardAdded}
                  onCancel={() => setShowAddForm(false)}
                />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CardManagement;

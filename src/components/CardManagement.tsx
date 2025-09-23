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

  const getCardIcon = (cardType: string) => {
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
    switch (cardType.toLowerCase()) {
      case 'visa':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mastercard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
          {cards.map((card) => (
            <Card 
              key={card.id} 
              className={`transition-all hover:shadow-md ${
                selectedCardId === card.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getCardIcon(card.cardType)}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {card.cardNumberMasked}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCardTypeColor(card.cardType)}`}
                        >
                          {card.cardType.toUpperCase()}
                        </Badge>
                        {card.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {card.cardHolderName} • Expires {formatExpiry(card.expiryMonth, card.expiryYear)}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {card.currency}
                        </span>
                        {card.isVerified ? (
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
                        variant={selectedCardId === card.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => onCardSelected?.(card)}
                      >
                        {selectedCardId === card.id ? 'Selected' : 'Select'}
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
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Payment Methods</h3>
            <p className="text-gray-600 mb-4">
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
            <Card>
              <CardHeader>
                <CardTitle>Add New Payment Method</CardTitle>
                <CardDescription>
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

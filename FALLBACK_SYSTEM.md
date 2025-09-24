# HMR Builders - Backend Fallback System

This document describes the comprehensive fallback system implemented to ensure the HMR Builders web application works seamlessly even when the backend is not reachable.

## Overview

The fallback system provides default/corrected values for all pages that expect backend data, allowing the application to function in demo mode with realistic sample data.

## Key Components

### 1. API Utilities (`/src/lib/apiUtils.ts`)

**Purpose**: Centralized API management with automatic fallbacks

**Features**:
- Generic `apiCall()` function with fallback data
- Specific API functions for each endpoint
- Demo mode detection
- Comprehensive default data sets

**Default Data Includes**:
- User authentication data
- Wallet information (PKR 2.5M balance)
- Investment portfolios (2 sample investments)
- Portfolio statistics
- Property listings (3 properties)

### 2. Enhanced AuthProvider (`/src/components/AuthProvider.tsx`)

**Updates**:
- Integrated with new API utilities
- Demo mode detection and handling
- Fallback authentication for demo users
- Demo mode indicators

**Demo Authentication**:
- Any email containing "demo" or "test" works
- Google authentication falls back to demo mode
- Demo token: `demo-token-123`

### 3. Updated Pages

#### Portfolio Page (`/src/app/portfolio/page.tsx`)
- Uses `api.getInvestments()` with fallback data
- Shows 2 sample investments (H1 Tower, Saima Tower)
- Displays realistic portfolio statistics
- Maintains all UI functionality

#### Wallet Page (`/src/app/wallet/page.tsx`)
- Uses `api.getWalletData()` with fallback data
- Shows PKR 2.5M total balance
- Displays investment history
- All wallet features functional

#### Buy Token Dialog (`/src/components/BuyTokenDialog.tsx`)
- Uses `api.createInvestment()` with fallback
- Simulates successful token purchases
- Shows demo success messages

#### Registration Form (`/src/components/RegistrationForm.tsx`)
- Demo mode registration for test emails
- Fallback to demo authentication
- Maintains full registration flow

### 4. Demo Mode Indicator (`/src/components/DemoModeIndicator.tsx`)

**Features**:
- Visual indicator when in demo mode
- Non-intrusive yellow banner
- Clear messaging about demo status

## Default Data Structure

### User Data
```typescript
{
  id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@hmrbuilders.com',
  image: null
}
```

### Wallet Data
```typescript
{
  totalBalance: 2500000,    // PKR 2.5M
  availableBalance: 1500000, // PKR 1.5M
  investedAmount: 1000000,   // PKR 1M
  totalReturns: 150000      // PKR 150K
}
```

### Investment Data
```typescript
[
  {
    id: 'demo-investment-1',
    propertyId: 'h1-tower',
    propertyTitle: 'H1 Tower',
    tokensPurchased: 100,
    investmentAmount: 250000,
    totalEarned: 37500,
    status: 'active'
  },
  {
    id: 'demo-investment-2',
    propertyId: 'saima-tower',
    propertyTitle: 'Saima Tower',
    tokensPurchased: 50,
    investmentAmount: 125000,
    totalEarned: 18750,
    status: 'active'
  }
]
```

## Demo Mode Detection

The system automatically detects demo mode when:
- Running on localhost
- Hostname contains "demo"
- No `NEXT_PUBLIC_API_URL` environment variable is set

## Usage

### For Development
1. The system automatically falls back when backend is unreachable
2. Demo mode indicator shows when using fallback data
3. All functionality remains intact with sample data

### For Production
1. Set `NEXT_PUBLIC_API_URL` environment variable
2. System will attempt real API calls first
3. Falls back to demo data only if API fails

## Benefits

1. **Seamless Development**: No backend required for frontend development
2. **Demo Capability**: Perfect for showcasing the application
3. **Graceful Degradation**: Real API calls with fallback safety
4. **Realistic Data**: Sample data matches real application structure
5. **User Experience**: No broken functionality when backend is down

## Files Modified

- `/src/lib/apiUtils.ts` (new)
- `/src/components/AuthProvider.tsx`
- `/src/app/portfolio/page.tsx`
- `/src/app/wallet/page.tsx`
- `/src/components/BuyTokenDialog.tsx`
- `/src/components/RegistrationForm.tsx`
- `/src/components/DemoModeIndicator.tsx` (new)
- `/src/app/layout.tsx`

## Testing

To test the fallback system:
1. Start the application without the backend running
2. Use any email containing "demo" or "test" for login
3. Navigate through all pages - they should work with sample data
4. Look for the yellow demo mode indicator

The system ensures the application is fully functional even without backend connectivity.

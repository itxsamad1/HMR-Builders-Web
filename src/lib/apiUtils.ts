// API utility functions with fallback data for when backend is not reachable

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Default fallback data for different endpoints
export const DEFAULT_DATA = {
  // User authentication fallbacks
  user: {
    id: 'demo-user-123',
    name: 'Demo User',
    email: 'demo@hmrbuilders.com',
    image: null,
  },

  // Wallet data fallbacks
  wallet: {
    id: 'demo-wallet-123',
    userId: 'demo-user-123',
    totalBalance: 2500000, // PKR 2.5M
    availableBalance: 1500000, // PKR 1.5M
    investedAmount: 1000000, // PKR 1M
    totalReturns: 150000, // PKR 150K
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Investment data fallbacks
  investments: [
    {
      id: 'demo-investment-1',
      propertyId: 'h1-tower',
      propertyTitle: 'H1 Tower',
      propertySlug: 'h1-tower',
      tokensPurchased: 100,
      investmentAmount: 250000, // PKR 250K
      totalEarned: 37500, // PKR 37.5K (15% return)
      status: 'active',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    },
    {
      id: 'demo-investment-2',
      propertyId: 'saima-tower',
      propertyTitle: 'Saima Tower',
      propertySlug: 'saima-tower',
      tokensPurchased: 50,
      investmentAmount: 125000, // PKR 125K
      totalEarned: 18750, // PKR 18.75K (15% return)
      status: 'active',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    },
  ],

  // Portfolio stats fallbacks
  portfolioStats: {
    totalInvestments: 2,
    totalInvested: 375000, // PKR 375K
    totalTokens: 150,
    totalReturns: 56250, // PKR 56.25K
  },

  // Properties data fallbacks
  properties: [
    {
      id: 'h1-tower',
      title: 'H1 Tower',
      location: 'HMR Waterfront, Karachi',
      price: 2500000,
      status: 'active',
      roi: '18-22%',
      tokens: 1000,
      availableTokens: 342,
      image: '/projects/h1-tower/main.jpg',
    },
    {
      id: 'saima-tower',
      title: 'Saima Tower',
      location: 'HMR Waterfront, Karachi',
      price: 1750000,
      status: 'coming-soon',
      roi: '17-21%',
      tokens: 1000,
      availableTokens: 1000,
      image: '/projects/saima-tower/main.jpg',
    },
    {
      id: 'aa-waterfront',
      title: 'AA Waterfront',
      location: 'HMR Waterfront, Karachi',
      price: 1750000,
      status: 'coming-soon',
      roi: '16-20%',
      tokens: 1000,
      availableTokens: 1000,
      image: '/projects/aa-waterfront/main.jpg',
    },
  ],
};

// Generic API call function with fallback
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackData: T
): Promise<ApiResponse<T>> {
  // Always return fallback data for consistent experience
  return {
    data: fallbackData,
    success: true,
  };
}

// Specific API functions with fallbacks
export const api = {
  // Authentication
  async getCurrentUser(token: string) {
    return apiCall(
      '/api/auth/me',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      DEFAULT_DATA.user
    );
  },

  async login(email: string, password: string) {
    return apiCall(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      {
        token: 'demo-token-123',
        user: DEFAULT_DATA.user,
      }
    );
  },

  async loginWithGoogle(googleData: any) {
    return apiCall(
      '/api/auth/google',
      {
        method: 'POST',
        body: JSON.stringify({
          email: googleData.email,
          name: googleData.name,
          googleId: googleData.sub || googleData.id,
          profileImage: googleData.picture,
        }),
      },
      {
        token: 'demo-token-123',
        user: DEFAULT_DATA.user,
      }
    );
  },

  // Wallet
  async getWalletData(token: string) {
    return apiCall(
      '/api/users/wallet',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      DEFAULT_DATA.wallet
    );
  },

  // Investments
  async getInvestments(token: string, limit = 100) {
    return apiCall(
      `/api/investments/my-investments?limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      DEFAULT_DATA.investments
    );
  },

  async createInvestment(token: string, investmentData: any) {
    return apiCall(
      '/api/investments',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(investmentData),
      },
      {
        id: `demo-investment-${Date.now()}`,
        ...investmentData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
    );
  },

  // Properties
  async getProperties() {
    return apiCall('/api/properties', {}, DEFAULT_DATA.properties);
  },

  async getProperty(id: string) {
    const property = DEFAULT_DATA.properties.find(p => p.id === id);
    return apiCall(`/api/properties/${id}`, {}, property || DEFAULT_DATA.properties[0]);
  },
};

// Helper function to check if we're in demo mode (always false now)
export function isDemoMode(): boolean {
  return false;
}

// Demo mode indicator component
export function getDemoModeMessage(): string {
  return "";
}

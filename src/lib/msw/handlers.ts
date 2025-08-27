import { http, HttpResponse } from 'msw';
import { db } from '../db';
import type { User, Session, KYCApplication } from '../db';

// Helper function to generate tokens
const generateToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper function to verify password (simplified for demo)
const verifyPassword = (inputPassword: string, storedPassword: string) => {
  return inputPassword === storedPassword; // In real app, use bcrypt
};

export const handlers = [
  // Authentication Handlers
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };
    
    try {
      const user = await db.users.where('email').equals(email).first();
      
      if (!user || !verifyPassword(password, user.password)) {
        return HttpResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      if (!user.isActive) {
        return HttpResponse.json(
          { error: 'Account is inactive' },
          { status: 403 }
        );
      }

      // Create session
      const token = generateToken();
      const session: Session = {
        id: `session-${Date.now()}`,
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        createdAt: new Date()
      };

      await db.sessions.add(session);

      return HttpResponse.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          language: user.language,
          twoFactorEnabled: user.twoFactorEnabled
        },
        token,
        requiresTwoFactor: user.twoFactorEnabled
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  http.post('/api/auth/verify-2fa', async ({ request }) => {
    const { token, code } = await request.json() as { token: string; code: string };
    
    try {
      const session = await db.sessions.where('token').equals(token).first();
      if (!session) {
        return HttpResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        );
      }

      const user = await db.users.get(session.userId);
      if (!user) {
        return HttpResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // For demo purposes, accept specific codes or generate time-based
      const validCodes = ['123456', '000000']; // Admin demo codes
      if (!validCodes.includes(code)) {
        return HttpResponse.json(
          { error: 'Invalid 2FA code' },
          { status: 401 }
        );
      }

      return HttpResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          language: user.language
        }
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const { email, password, firstName, lastName, language } = await request.json() as {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      language: 'en' | 'ur';
    };
    
    try {
      // Check if user already exists
      const existingUser = await db.users.where('email').equals(email).first();
      if (existingUser) {
        return HttpResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        password, // In real app, hash this
        firstName,
        lastName,
        role: 'investor',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        twoFactorEnabled: false,
        language
      };

      await db.users.add(newUser);

      // Create wallet for new user
      await db.wallets.add({
        id: `wallet-${Date.now()}`,
        userId: newUser.id,
        balance: 0,
        pendingBalance: 0,
        totalInvested: 0,
        totalDistributions: 0,
        currency: 'PKR',
        updatedAt: new Date()
      });

      return HttpResponse.json({
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          language: newUser.language
        }
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  http.post('/api/auth/logout', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (token) {
      await db.sessions.where('token').equals(token).delete();
    }
    
    return HttpResponse.json({ success: true });
  }),

  // Properties Handlers
  http.get('/api/properties', async () => {
    try {
      const properties = await db.properties.toArray();
      return HttpResponse.json(properties);
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch properties' },
        { status: 500 }
      );
    }
  }),

  http.get('/api/properties/:id', async ({ params }) => {
    try {
      const property = await db.properties.get(params.id as string);
      if (!property) {
        return HttpResponse.json(
          { error: 'Property not found' },
          { status: 404 }
        );
      }
      return HttpResponse.json(property);
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch property' },
        { status: 500 }
      );
    }
  }),

  // User Dashboard and Portfolio
  http.get('/api/user/dashboard', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const session = await db.sessions.where('token').equals(token).first();
      if (!session) {
        return HttpResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        );
      }

      const user = await db.users.get(session.userId);
      const wallet = await db.wallets.where('userId').equals(session.userId).first();
      const investments = await db.investments.where('userId').equals(session.userId).toArray();
      
      // Get properties for investments
      const propertyIds = investments.map(inv => inv.propertyId);
      const properties = await db.properties.where('id').anyOf(propertyIds).toArray();
      
      const dashboardData = {
        user: {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          language: user?.language
        },
        wallet: {
          balance: wallet?.balance || 0,
          totalInvested: wallet?.totalInvested || 0,
          totalDistributions: wallet?.totalDistributions || 0
        },
        portfolio: {
          totalValue: investments.reduce((sum, inv) => sum + inv.currentValue, 0),
          totalReturn: wallet?.totalDistributions || 0,
          investments: investments.map(inv => {
            const property = properties.find(p => p.id === inv.propertyId);
            return {
              ...inv,
              property: property ? {
                name: property.name,
                nameUrdu: property.nameUrdu,
                type: property.type,
                expectedYield: property.expectedYield
              } : null
            };
          })
        }
      };

      return HttpResponse.json(dashboardData);
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch dashboard data' },
        { status: 500 }
      );
    }
  }),

  // KYC Handlers
  http.post('/api/kyc/submit', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const session = await db.sessions.where('token').equals(token).first();
      if (!session) {
        return HttpResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        );
      }

      const kycData = await request.json() as any;
      
      const kycApplication: KYCApplication = {
        id: `kyc-${Date.now()}`,
        userId: session.userId,
        type: 'individual',
        status: 'pending',
        personalInfo: kycData.personalInfo,
        documents: kycData.documents || {},
        submittedAt: new Date()
      };

      await db.kycApplications.add(kycApplication);

      return HttpResponse.json({
        id: kycApplication.id,
        status: kycApplication.status,
        submittedAt: kycApplication.submittedAt
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to submit KYC application' },
        { status: 500 }
      );
    }
  }),

  // Investment Handler
  http.post('/api/investments', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const session = await db.sessions.where('token').equals(token).first();
      if (!session) {
        return HttpResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        );
      }

      const { propertyId, amount } = await request.json() as { propertyId: string; amount: number };
      
      const property = await db.properties.get(propertyId);
      if (!property) {
        return HttpResponse.json(
          { error: 'Property not found' },
          { status: 404 }
        );
      }

      const units = Math.floor(amount / property.unitPrice);
      
      const investment = {
        id: `inv-${Date.now()}`,
        userId: session.userId,
        propertyId,
        units,
        amount,
        status: 'pending' as const,
        purchaseDate: new Date(),
        currentValue: amount,
        totalDistributions: 0
      };

      await db.investments.add(investment);

      return HttpResponse.json(investment);
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to create investment' },
        { status: 500 }
      );
    }
  }),

  // Admin Handlers
  http.get('/api/admin/kyc-queue', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return HttpResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      const session = await db.sessions.where('token').equals(token).first();
      if (!session) {
        return HttpResponse.json(
          { error: 'Invalid session' },
          { status: 401 }
        );
      }

      const user = await db.users.get(session.userId);
      if (!user || !['admin', 'ops', 'compliance'].includes(user.role)) {
        return HttpResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      const kycApplications = await db.kycApplications
        .where('status')
        .anyOf(['pending', 'in_review'])
        .toArray();

      return HttpResponse.json(kycApplications);
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to fetch KYC queue' },
        { status: 500 }
      );
    }
  }),

  // Seed database endpoint
  http.post('/api/admin/seed-database', async () => {
    try {
      // Clear existing data
      await db.delete();
      await db.open();
      
      // Re-initialize with seed data
      await import('../db').then(module => module.initializeDatabase());
      
      return HttpResponse.json({ 
        success: true, 
        message: 'Database seeded successfully' 
      });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Failed to seed database' },
        { status: 500 }
      );
    }
  })
];

export default handlers;
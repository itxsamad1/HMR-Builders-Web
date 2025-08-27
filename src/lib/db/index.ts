import Dexie, { Table } from 'dexie';

// User and Auth Types
export interface User {
  id: string;
  email: string;
  password: string; // Hashed in real implementation
  firstName: string;
  lastName: string;
  role: 'investor' | 'admin' | 'ops' | 'compliance';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  language: 'en' | 'ur';
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// KYC Types
export interface KYCApplication {
  id: string;
  userId: string;
  type: 'individual' | 'corporate';
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  personalInfo: {
    cnic: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
    nationality: string;
    occupation: string;
  };
  documents: {
    cnicFront?: string;
    cnicBack?: string;
    selfie?: string;
    proofOfAddress?: string;
  };
  reviewNotes?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

// Property and Investment Types
export interface Property {
  id: string;
  name: string;
  nameUrdu: string;
  description: string;
  descriptionUrdu: string;
  location: string;
  locationUrdu: string;
  type: 'residential' | 'commercial' | 'hospitality' | 'industrial';
  totalValue: number;
  minimumInvestment: number;
  expectedYield: number;
  targetIRR: number;
  tenure: number; // months
  occupancyRate: number;
  wault: number; // Weighted Average Unexpired Lease Term
  status: 'upcoming' | 'active' | 'funded' | 'closed';
  images: string[];
  documents: string[];
  riskRating: 'low' | 'medium' | 'high';
  totalUnits: number;
  availableUnits: number;
  unitPrice: number;
  launchDate: Date;
  fundingDeadline: Date;
  expectedDistributionStart: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Investment {
  id: string;
  userId: string;
  propertyId: string;
  units: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  transactionId?: string;
  purchaseDate: Date;
  currentValue: number;
  totalDistributions: number;
}

// Payment and Wallet Types
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  pendingBalance: number;
  totalInvested: number;
  totalDistributions: number;
  currency: 'PKR';
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'distribution' | 'refund';
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  reference: string;
  description: string;
  metadata?: any;
  createdAt: Date;
  completedAt?: Date;
}

// Distribution Types
export interface Distribution {
  id: string;
  propertyId: string;
  amount: number;
  perUnit: number;
  distributionDate: Date;
  recordDate: Date;
  description: string;
  descriptionUrdu: string;
  status: 'scheduled' | 'processing' | 'completed';
  createdAt: Date;
}

export interface UserDistribution {
  id: string;
  userId: string;
  distributionId: string;
  propertyId: string;
  units: number;
  amount: number;
  status: 'pending' | 'processed';
  processedAt?: Date;
}

// Database Schema
export class HMRDatabase extends Dexie {
  users!: Table<User>;
  sessions!: Table<Session>;
  kycApplications!: Table<KYCApplication>;
  properties!: Table<Property>;
  investments!: Table<Investment>;
  wallets!: Table<Wallet>;
  transactions!: Table<Transaction>;
  distributions!: Table<Distribution>;
  userDistributions!: Table<UserDistribution>;

  constructor() {
    super('HMRDatabase');
    this.version(1).stores({
      users: 'id, email, role, isActive',
      sessions: 'id, userId, token, expiresAt',
      kycApplications: 'id, userId, status, submittedAt',
      properties: 'id, name, type, status, launchDate',
      investments: 'id, userId, propertyId, status, purchaseDate',
      wallets: 'id, userId',
      transactions: 'id, userId, type, status, createdAt',
      distributions: 'id, propertyId, distributionDate, status',
      userDistributions: 'id, userId, distributionId, propertyId, status'
    });
  }
}

export const db = new HMRDatabase();

// Initialize database with seed data
export const initializeDatabase = async () => {
  // Check if already initialized
  const userCount = await db.users.count();
  if (userCount > 0) return;

  console.log('🌱 Seeding HMR Database...');

  // Seed default users
  await db.users.bulkAdd([
    {
      id: 'admin-001',
      email: 'admin@hmr.pk',
      password: 'Admin@1234', // In real app, this would be hashed
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      twoFactorEnabled: true,
      twoFactorSecret: 'JBSWY3DPEHPK3PXP',
      language: 'en'
    },
    {
      id: 'investor-001',
      email: 'investor@hmr.pk',
      password: 'Investor@1234',
      firstName: 'Ahmed',
      lastName: 'Khan',
      role: 'investor',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      twoFactorEnabled: false,
      language: 'en'
    }
  ]);

  // Seed properties
  await db.properties.bulkAdd([
    {
      id: 'prop-001',
      name: 'HMR Waterfront Residences',
      nameUrdu: 'ایچ ایم آر واٹر فرنٹ ریزیڈنسز',
      description: 'Premium waterfront residential development in Karachi featuring modern amenities and stunning sea views.',
      descriptionUrdu: 'کراچی میں جدید سہولات اور شاندار سمندری مناظر کے ساتھ پریمیم واٹرفرنٹ رہائشی ترقیاتی منصوبہ۔',
      location: 'Clifton, Karachi',
      locationUrdu: 'کلفٹن، کراچی',
      type: 'residential',
      totalValue: 250000000, // PKR 25 Crore
      minimumInvestment: 50000, // PKR 50,000
      expectedYield: 8.2,
      targetIRR: 14.5,
      tenure: 36,
      occupancyRate: 92,
      wault: 4.2,
      status: 'active',
      images: ['/src/assets/waterfront-residences.jpg'],
      documents: ['prospectus.pdf', 'valuation.pdf'],
      riskRating: 'medium',
      totalUnits: 50000,
      availableUnits: 35000,
      unitPrice: 5000,
      launchDate: new Date('2024-01-15'),
      fundingDeadline: new Date('2024-04-15'),
      expectedDistributionStart: new Date('2024-05-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prop-002',
      name: 'HMR Business Tower',
      nameUrdu: 'ایچ ایم آر بزنس ٹاور',
      description: 'Grade-A commercial office tower in the heart of Karachi\'s financial district.',
      descriptionUrdu: 'کراچی کے مالی ضلع کے مرکز میں گریڈ اے کمرشل آفس ٹاور۔',
      location: 'I.I. Chundrigar Road, Karachi',
      locationUrdu: 'آئی آئی چندریگر روڈ، کراچی',
      type: 'commercial',
      totalValue: 500000000, // PKR 50 Crore
      minimumInvestment: 100000, // PKR 100,000
      expectedYield: 10.1,
      targetIRR: 16.8,
      tenure: 48,
      occupancyRate: 97,
      wault: 5.8,
      status: 'active',
      images: ['/src/assets/business-tower.jpg'],
      documents: ['prospectus.pdf', 'lease-summary.pdf'],
      riskRating: 'low',
      totalUnits: 100000,
      availableUnits: 20000,
      unitPrice: 5000,
      launchDate: new Date('2024-02-01'),
      fundingDeadline: new Date('2024-05-01'),
      expectedDistributionStart: new Date('2024-06-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prop-003',
      name: 'HMR Boutique Hotel',
      nameUrdu: 'ایچ ایم آر بوتیک ہوٹل',
      description: 'Luxury boutique hotel in prime location with excellent hospitality returns.',
      descriptionUrdu: 'بہترین مقام پر لگژری بوتیک ہوٹل جو بہترین ہاسپٹیلٹی منافع فراہم کرتا ہے۔',
      location: 'Gulberg, Lahore',
      locationUrdu: 'گلبرگ، لاہور',
      type: 'hospitality',
      totalValue: 150000000, // PKR 15 Crore
      minimumInvestment: 75000, // PKR 75,000
      expectedYield: 9.5,
      targetIRR: 17.2,
      tenure: 60,
      occupancyRate: 85,
      wault: 3.5,
      status: 'upcoming',
      images: ['/src/assets/boutique-hotel.jpg'],
      documents: ['feasibility.pdf'],
      riskRating: 'high',
      totalUnits: 30000,
      availableUnits: 30000,
      unitPrice: 5000,
      launchDate: new Date('2024-04-01'),
      fundingDeadline: new Date('2024-07-01'),
      expectedDistributionStart: new Date('2024-08-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  // Create default wallet for investor
  await db.wallets.add({
    id: 'wallet-001',
    userId: 'investor-001',
    balance: 100000, // PKR 100,000
    pendingBalance: 0,
    totalInvested: 0,
    totalDistributions: 0,
    currency: 'PKR',
    updatedAt: new Date()
  });

  console.log('✅ HMR Database seeded successfully!');
};
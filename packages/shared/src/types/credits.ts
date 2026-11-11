import type { AccessLevel } from '../constants/tiers.js';

export interface SparkQuota {
  tier: AccessLevel;
  totalDaily: number;
  remainingToday: number;
  resetAt: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'daily_grant' | 'usage' | 'bonus' | 'admin_adjust';
  reason?: string;
  createdAt: string;
}

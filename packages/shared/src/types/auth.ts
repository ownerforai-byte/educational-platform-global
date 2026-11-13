import type { AccessLevel } from '../constants/tiers';

export interface UserProfile {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
  tier: AccessLevel;
  role?: 'student' | 'teacher' | 'parent' | 'admin' | 'owner';
  createdAt: string;
  updatedAt?: string;
  approved?: boolean;
}

export interface UserSession {
  user: UserProfile | null;
  accessToken?: string;
  expiresAt?: number;
  tier: AccessLevel;
}

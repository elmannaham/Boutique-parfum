/**
 * User types for authentication and profile management.
 */

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export interface UserAddress {
  id: string;
  type: 'billing' | 'shipping';
  street: string;
  city: string;
  postal_code: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

export interface UserPreferences {
  language: 'fr' | 'en' | 'de' | 'es';
  email_notifications: boolean;
  sms_notifications: boolean;
  marketing_emails: boolean;
  newsletter: boolean;
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  date_of_birth?: Date;
}

export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  role: UserRole;
  verified_email: boolean;
  addresses: UserAddress[];
  preferences: UserPreferences;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
}

export interface CreateUserInput
  extends Omit<User, 'id' | 'created_at' | 'updated_at'> {
  password: string;
}

export interface UpdateUserInput
  extends Partial<Omit<User, 'id' | 'created_at' | 'updated_at' | 'role'>> {}

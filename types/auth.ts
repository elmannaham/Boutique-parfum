/**
 * Authentication and session types.
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  email_verified: boolean;
}

export interface AuthSession {
  user: AuthUser;
  expires_at: Date;
  access_token?: string;
  refresh_token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  accept_terms: boolean;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirm_password: string;
}

export interface VerifyEmailInput {
  token: string;
}

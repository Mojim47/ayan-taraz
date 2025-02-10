export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: Date;
}

export type UserRole = 'admin' | 'user' | 'editor';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

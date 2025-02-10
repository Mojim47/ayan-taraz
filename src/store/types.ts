import { AuthState } from '../types/user';

export interface RootState {
  auth: AuthState;
  settings: SettingsState;
  ui: UIState;
  cache: CacheState;
}

export interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export interface UIState {
  loading: { [key: string]: boolean };
  errors: { [key: string]: string | null };
}

export interface CacheState {
  [key: string]: {
    data: any;
    expiresAt: number;
  };
}

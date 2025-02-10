// src/types/state.ts
export interface AppState {
  auth: AuthState;
  ui: UIState;
  data: DataState;
  cache: CacheState;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  direction: 'rtl' | 'ltr';
  sidebarOpen: boolean;
  notifications: Notification[];
  loading: {
    [key: string]: boolean;
  };
  errors: {
    [key: string]: string;
  };
}

export interface DataState {
  entities: {
    [key: string]: any[];
  };
  metadata: {
    [key: string]: {
      totalCount: number;
      lastUpdated: string;
    };
  };
}

export interface CacheState {
  [key: string]: {
    data: any;
    expiresAt: number;
  };
}

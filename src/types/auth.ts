export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface AuthError {
  message: string;
  code: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

export type UserRole = 'admin' | 'user' | 'editor' | 'viewer';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData extends LoginCredentials {
  username: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type AuthError = {
  message: string;
  code?: string;
};
declare namespace Chat {
  interface Message {
    id: string;
    content: string;
    sender: string;
    timestamp: number;
    type: MessageType;
    status: MessageStatus;
  }

  type MessageType = 'text' | 'image' | 'file' | 'system';
  
  type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

  interface Room {
    id: string;
    name: string;
    participants: string[];
    lastMessage?: Message;
    unreadCount: number;
  }

  interface ChatState {
    activeRoom: string | null;
    messages: Record<string, Message[]>;
    rooms: Room[];
    loading: boolean;
    error: string | null;
  }
}

export = Chat;
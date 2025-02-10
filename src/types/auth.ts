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

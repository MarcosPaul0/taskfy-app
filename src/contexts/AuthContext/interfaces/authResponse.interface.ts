export interface AuthResponse {
  token: string;
  refreshToken: {
    id: string;
    userId: string;
    expiresAt: string;
  };
}

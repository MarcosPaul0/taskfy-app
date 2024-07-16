export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

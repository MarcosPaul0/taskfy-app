import { SignInFormData } from "@taskfy/app/out-session/sign-in/interfaces/signInFormData.interface";
import { UserResponse } from "@taskfy/interfaces/responses/userResponse.interface";

export interface AuthContextData {
  user: UserResponse | null;
  isAuthenticated: boolean;
  signIn: (signInData: SignInFormData) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

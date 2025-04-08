import { AuthError } from "@/types/error";
import { User } from "@/types/user";

export interface LoginResponse {
  error: boolean;
  message: string;
}
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  authError: AuthError | null;
  setAuthError: (error: AuthError | null) => void;
}

import { AuthenticatedUser } from './authenticated-user.interface';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthenticatedUser;
}

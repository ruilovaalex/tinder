import { AuthenticatedUser } from './authenticated-user.interface';

export interface AuthResponse {
  accessToken: string;
  user: AuthenticatedUser;
}

import { User } from './user';

export interface LoginResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: User;
}

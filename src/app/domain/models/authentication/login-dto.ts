import { UserDto } from './user-dto';

export interface LoginDto {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: UserDto;
}

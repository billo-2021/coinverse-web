import { UserDto } from './user-dto.model';

export interface LoginDto {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: UserDto;
}

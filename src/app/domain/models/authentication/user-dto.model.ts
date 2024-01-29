import { AccountDto } from './account-dto.model';

export interface UserDto {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly account: AccountDto;
}

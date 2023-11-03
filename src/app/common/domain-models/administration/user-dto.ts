import {UserAddressDto} from "./user-address-dto";
import {UserAccountDto} from "./user-account-dto";

export interface UserDto {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly account: UserAccountDto;
  readonly address: UserAddressDto;
  readonly createdAt: Date;
  readonly updateAt: Date;
}

export interface User {
  readonly username: string;
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly isVerified: boolean;
  readonly roles: readonly string[];
}

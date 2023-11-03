export interface UserPrincipal {
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isVerified: boolean;
  roles: string[];
}

export interface Account {
  username: string;
}

export interface AuthUser {
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  account: Account;
}

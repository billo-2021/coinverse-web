export interface Account {
  readonly username: string;
  readonly isVerified: boolean;
  readonly roles: readonly string[];
}

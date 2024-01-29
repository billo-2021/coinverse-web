export interface UserAccountRequest {
  readonly username: string;
  readonly roles: readonly string[];
  readonly password: string;
}

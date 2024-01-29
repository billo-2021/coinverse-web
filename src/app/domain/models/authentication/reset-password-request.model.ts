export interface ResetPasswordRequest {
  readonly username: string;
  readonly token: string;
  readonly password: string;
}

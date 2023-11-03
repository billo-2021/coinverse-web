export interface UserAccountResponse {
  readonly username: string;
  readonly roles: string[];
  readonly status: string;
  readonly isEnabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

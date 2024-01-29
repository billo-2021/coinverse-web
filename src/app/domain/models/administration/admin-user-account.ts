export interface AdminUserAccount {
  readonly username: string;
  readonly roles: readonly string[];
  readonly status: string;
  readonly isEnabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

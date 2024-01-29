export interface AdminUserAccountDto {
  readonly username: string;
  readonly roles: readonly string[];
  readonly status: string;
  readonly isEnabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

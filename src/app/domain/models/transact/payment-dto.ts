export interface PaymentDto {
  readonly id: number;
  readonly amount: number;
  readonly currency: string;
  readonly bidRate: number;
  readonly askRate: number;
  readonly method: string;
  readonly action: string;
  readonly status: string;
  readonly createdAt: Date;
}

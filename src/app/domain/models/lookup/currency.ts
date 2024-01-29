import { Country } from './country';

export interface Currency {
  readonly id: number;
  readonly type: string;
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
  readonly countries: readonly Country[];
}

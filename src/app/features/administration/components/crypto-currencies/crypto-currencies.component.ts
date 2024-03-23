import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Pagination, PAGINATION_TOKEN, TOTAL_ITEMS } from '../../../../ui-components';
import { CryptoCurrency } from '../../../../domain';

export const KEYS = {
  code: 'Code',
  name: 'Name',
  symbol: 'Symbol',
  circulatingSupply: 'Circulating Supply',
  actions: 'Actions',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface CryptoCurrenciesComponentInput {
  pagination: Pagination;
  cryptoCurrencies: readonly CryptoCurrency[];
  total: number;
}

export interface CryptoCurrenciesComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
  editCurrencyClicked: EventEmitter<string>;
}

@Component({
  selector: 'app-crypto-currencies',
  templateUrl: './crypto-currencies.component.html',
  styleUrls: ['./crypto-currencies.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoCurrenciesComponent
  implements CryptoCurrenciesComponentInput, CryptoCurrenciesComponentOutput
{
  @Input() public pagination: Pagination = this._pagination;
  @Input() public cryptoCurrencies: readonly CryptoCurrency[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<Pagination>();
  @Output() public editCurrencyClicked = new EventEmitter<string>();

  public readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;
  public readonly Keys: KeysType = KEYS;
  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination) {}

  public onEditCurrency(currencyCode: string): void {
    this.editCurrencyClicked.emit(currencyCode);
  }

  public onPagination(pagination: Pagination): void {
    this.paginationChanged.emit(pagination);
  }
}

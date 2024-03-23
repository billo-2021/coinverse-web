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
import { Currency } from '../../../../domain';

export const KEYS = {
  code: 'Code',
  name: 'Name',
  symbol: 'Symbol',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface FiatCurrenciesComponentInput {
  pagination: Pagination;
  currencies: readonly Currency[];
  total: number;
}

export interface FiatCurrenciesComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
  editCurrencyClicked: EventEmitter<string>;
}

@Component({
  selector: 'app-fiat-currencies',
  templateUrl: './fiat-currencies.component.html',
  styleUrls: ['./fiat-currencies.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiatCurrenciesComponent
  implements FiatCurrenciesComponentInput, FiatCurrenciesComponentOutput
{
  @Input() public pagination: Pagination = this._pagination;
  @Input() public currencies: readonly Currency[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<Pagination>();

  @Output() public editCurrencyClicked = new EventEmitter<string>();

  public readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;
  public readonly Keys: KeysType = KEYS;

  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination) {}

  public async onEditCurrency(currencyCode: string): Promise<void> {
    this.editCurrencyClicked.emit(currencyCode);
  }

  public onPagination(pagination: Pagination): void {
    this.paginationChanged.emit(pagination);
  }
}

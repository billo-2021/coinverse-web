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
import { Page, PageRequest } from '../../../../shared';
import { Pagination, PAGINATION_TOKEN, TOTAL_ITEMS } from '../../../../ui-components';
import { LookupService, QuoteService } from '../../../../domain';
import { CryptoCurrencyModel } from '../../models';

export const KEYS = {
  name: 'Name',
  askRate: 'Sell $',
  bidRate: 'Buy $',
  change: '24hr %',
  circulatingSupply: 'Circulating Supply',
  actions: '',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface MarketsComponentInput extends Page {
  pagination: Pagination;
  currencies: readonly CryptoCurrencyModel[];
  total: number;
}

export interface MarketsComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
  buyClicked: EventEmitter<string>;
  sellClicked: EventEmitter<string>;
}

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketsComponent implements MarketsComponentInput, MarketsComponentOutput {
  @Input() public title = 'Markets';
  @Input() public subtitle = 'Latest market prices.';
  @Input() public pagination: Pagination = this._pagination;
  @Input() public currencies: readonly CryptoCurrencyModel[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<PageRequest>();
  @Output() public buyClicked = new EventEmitter<string>();
  @Output() public sellClicked = new EventEmitter<string>();

  public readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;
  public readonly Keys: KeysType = KEYS;

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination,
    private readonly _lookupService: LookupService,
    private readonly _quoteService: QuoteService
  ) {}

  public onBuy(currencyCode: string): void {
    this.buyClicked.emit(this.getCurrencyPairName(currencyCode));
  }

  public onSell(currencyCode: string): void {
    this.sellClicked.emit(this.getCurrencyPairName(currencyCode));
  }

  public onPagination(page: PageRequest): void {
    this.paginationChanged.next(page);
  }

  private getCurrencyPairName(currencyCode: string): string {
    return `${currencyCode}/USD`;
  }
}

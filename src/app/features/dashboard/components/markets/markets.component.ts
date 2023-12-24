import { Component, EventEmitter, HostBinding, Inject, Input, Output } from '@angular/core';

import { PageRequest } from '../../../../core';
import { LookupService, QuoteService, webRoutesConfig } from '../../../../common';
import { Pagination, paginationToken } from '../../../../ui-components';

import { CryptoCurrencyModel } from '../../models';

const KEYS = {
  name: 'Name',
  askRate: 'Sell $',
  bidRate: 'Buy $',
  change: '24hr %',
  circulatingSupply: 'Circulating Supply',
  actions: '',
} as const;

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
export class MarketsComponent {
  @Input() public pagination: Pagination = this._paginationToken;
  @Input() public currencies: CryptoCurrencyModel[] = [];
  @Input() public total = 1;

  @Output() public paginationChanged = new EventEmitter<PageRequest>();
  @Output() public buyClicked = new EventEmitter<string>();
  @Output() public sellClicked = new EventEmitter<string>();

  protected readonly transactUrl = webRoutesConfig.transact;
  protected readonly title = 'Markets';
  protected readonly subtitle = 'Latest market prices.';
  protected readonly columns = Object.keys(KEYS) as Array<keyof typeof KEYS>;
  protected readonly keys = KEYS;
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _lookupService: LookupService,
    private readonly _quoteService: QuoteService
  ) {}

  public async onBuy(currencyCode: string): Promise<void> {
    this.buyClicked.emit(this.getCurrencyPairName(currencyCode));
  }

  public async onSell(currencyCode: string): Promise<void> {
    this.sellClicked.emit(this.getCurrencyPairName(currencyCode));
  }

  public onPagination(page: PageRequest): void {
    this.paginationChanged.next(page);
  }

  private getCurrencyPairName(currencyCode: string): string {
    return `${currencyCode}/USD`;
  }
}

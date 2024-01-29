import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { PageResponse } from '../../../../core';
import { NavigationService, ViewPage } from '../../../../common';
import { PAGE_OPTIONS, Pagination, paginationToken } from '../../../../ui-components';
import { CurrencyTransaction, TradeService } from '../../../../domain';

export interface ManageTradesViewModel {
  readonly tradesPagination: Pagination;
  readonly tradePage: PageResponse<CurrencyTransaction>;
}

export type ManageTradesView = ViewPage<ManageTradesViewModel>;

@Component({
  selector: 'app-manage-trades',
  templateUrl: './manage-trades.component.html',
  styleUrls: ['./manage-trades.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageTradesComponent implements ManageTradesView {
  public readonly title = 'Trade History';
  public readonly subtitle = 'Your trade history.';

  @HostBinding('class') private _classes = 'block';
  private readonly _tradesPagination$ = new BehaviorSubject<Pagination>(this._paginationToken);

  private readonly _tradesRequest$ = combineLatest([this._tradesPagination$.asObservable()]).pipe(
    switchMap((query) => this._tradeService.getTrades(...query).pipe(shareReplay(1))),
    startWith(null)
  );

  private readonly _tradePage$: Observable<PageResponse<CurrencyTransaction>> = combineLatest([
    this._tradesPagination$.asObservable(),
  ]).pipe(
    switchMap((query) => this._tradeService.getTrades(...query).pipe(shareReplay(1))),
    startWith<PageResponse<CurrencyTransaction>>(PAGE_OPTIONS)
  );

  public readonly viewModel$: Observable<ManageTradesViewModel> = combineLatest([
    this._tradesPagination$,
    this._tradePage$,
  ]).pipe(map(([tradesPagination, tradePage]) => ({ tradesPagination, tradePage })));

  public constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _navigationService: NavigationService,
    private readonly _tradeService: TradeService
  ) {}

  public set tradesPagination(value: Pagination) {
    this._tradesPagination$.next(value);
  }

  public onTrade(): void {
    this._navigationService.to('trade').then();
  }

  public onPagination(pagination: Pagination): void {
    this.tradesPagination = pagination;
  }
}

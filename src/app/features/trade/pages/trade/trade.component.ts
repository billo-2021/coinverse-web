import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { NavigationController, ParamsService, ViewPage, WebRoute } from '../../../../shared';
import { ListOption } from '../../../../form-components';
import {
  Currency,
  CurrencyExchangeRate,
  CurrencyPair,
  CurrencyQuote,
  CurrencyTransaction,
  ListOptionsService,
  QuoteService,
  TradeRequest,
  TradeService,
} from '../../../../domain';
import { TradeModel } from '../../models';
import { TradeStep, TradeTab } from '../../enums';
import { TradeFormService } from '../../components';

export type TradeStepsType = readonly [string, string, string];
export type TradeStepType = typeof TradeStep;
export type TradeActionType = 'buy' | 'sell';
export type TradeActionsType = readonly [TradeActionType, TradeActionType];

export interface TradeViewModel {
  readonly activeTabIndex: TradeTab;
  readonly currentStepIndex: TradeStep;
  readonly tradeAction: TradeActionType;
  readonly currencyPairName: string | null;
  readonly currencyPairOptions: readonly ListOption<CurrencyPair>[];
  readonly currencyOptions: readonly ListOption<Currency>[];
  readonly tradeModel: TradeModel | null;
  readonly currencyExchangeRate: CurrencyExchangeRate | null;
  readonly currencyQuote: CurrencyQuote | null;
  readonly tradeResponse: CurrencyTransaction | null;
}

export interface TradeView extends ViewPage<TradeViewModel> {
  readonly TradeSteps: TradeStepsType;
  readonly TradeStepType: TradeStepType;
}

export const TRADE_STEPS: TradeStepsType = ['Trade Request', 'Quote', 'Confirmation'];
export const TRADE_ACTIONS: TradeActionsType = ['buy', 'sell'];

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ParamsService, TradeFormService],
})
export class TradeComponent implements TradeView {
  public readonly title: string = 'Trade';
  public readonly subtitle: string = 'Make a trade here.';
  public readonly TradeSteps: TradeStepsType = TRADE_STEPS;
  public readonly TradeStepType: typeof TradeStep = TradeStep;
  @HostBinding('class') private _classes = 'block';
  private readonly _activeTabIndex$ = new BehaviorSubject<TradeTab>(TradeTab.BUY);

  private readonly _currentStepIndex$ = new BehaviorSubject<TradeStep>(TradeStep.TRADE_REQUEST);
  private readonly _currencyPairName$ = new BehaviorSubject<string | null>(null);

  private readonly _currencyPairOptions$: Observable<readonly ListOption<CurrencyPair>[]> =
    this._listOptionsService
      .getCurrencyPairOptions()
      .pipe(shareReplay(1), startWith<readonly ListOption<CurrencyPair>[]>([]));

  private readonly _currencyOptions$: Observable<readonly ListOption<Currency>[]> =
    this._listOptionsService
      .getCurrencyOptions()
      .pipe(shareReplay(1), startWith<readonly ListOption<Currency>[]>([]));

  private readonly _tradeModel$ = new BehaviorSubject<TradeModel | null>(null);

  private readonly _currencyExchangeRate$: Observable<CurrencyExchangeRate | null> = combineLatest([
    this._currencyPairName$,
    this._currentStepIndex$.asObservable(),
  ]).pipe(
    filter(
      (input): input is [string, TradeStep] =>
        input[0] !== null && input[1] === TradeStep.TRADE_QUOTE
    ),
    switchMap(([currencyPairName]) =>
      this._quoteService
        .getCurrencyExchangeRateByCurrencyPairName(currencyPairName)
        .pipe(shareReplay(1))
    ),
    startWith(null)
  );

  private readonly _currencyQuote$: Observable<CurrencyQuote | null> =
    this._currencyExchangeRate$.pipe(
      filter(tuiIsPresent),
      map(
        (currencyExchangeRate) =>
          (currencyExchangeRate.quotes.length && currencyExchangeRate.quotes[0]) || null
      ),
      startWith<CurrencyQuote | null>(null)
    );

  private readonly _tradeResponse$ = new BehaviorSubject<CurrencyTransaction | null>(null);

  private readonly _effects$ = merge(
    this._paramsService.queryParam('action').pipe(
      filter(tuiIsPresent),
      tap(
        (actionParam) =>
          (this.activeTabIndex = 'sell'.includes(actionParam.toLowerCase())
            ? TradeTab.SELL
            : TradeTab.BUY)
      ),
      startWith(this.activeTabIndex)
    ),
    this._paramsService
      .queryParam('currencyPairName')
      .pipe(tap((currencyPairName) => (this.currencyPairName = currencyPairName)))
  );

  public readonly viewModel$: Observable<TradeViewModel> = combineLatest([
    this._activeTabIndex$,
    this._currentStepIndex$,
    this._currencyPairName$,
    this._tradeModel$,
    this._currencyExchangeRate$,
    this._currencyQuote$,
    this._tradeResponse$,
    this._currencyPairOptions$,
    this._currencyOptions$,
    this._effects$,
  ]).pipe(
    map(
      ([
        activeTabIndex,
        currentStepIndex,
        currencyPairName,
        tradeModel,
        currencyExchangeRate,
        currencyQuote,
        tradeResponse,
        currencyPairOptions,
        currencyOptions,
      ]) => ({
        activeTabIndex,
        currentStepIndex,
        tradeAction: TRADE_ACTIONS[activeTabIndex],
        currencyPairName,
        tradeModel,
        currencyExchangeRate,
        currencyQuote,
        tradeResponse,
        currencyPairOptions,
        currencyOptions,
      })
    )
  );

  public constructor(
    @Self() private readonly _paramsService: ParamsService,
    private readonly _navigationService: NavigationController,
    @Self() private readonly _tradeForm: TradeFormService,
    private readonly _listOptionsService: ListOptionsService,
    private readonly _quoteService: QuoteService,
    private readonly _tradeService: TradeService
  ) {}

  public get activeTabIndex() {
    return this._activeTabIndex$.value;
  }

  public set activeTabIndex(value: TradeTab) {
    this._activeTabIndex$.next(value);
  }

  public set currentStepIndex(value: TradeStep) {
    this._currentStepIndex$.next(value);
  }

  public set currencyPairName(value: string | null) {
    this._currencyPairName$.next(value);
  }

  public set tradeResponse(value: CurrencyTransaction) {
    this._tradeResponse$.next(value);
  }

  public get tradeModel(): TradeModel | null {
    return this._tradeModel$.value;
  }

  public set tradeModel(value: TradeModel) {
    this._tradeModel$.next(value);
  }

  public onStepChanged(nextStepIndex: number) {
    if (!this.isTradeStep(nextStepIndex)) {
      return;
    }

    this.currentStepIndex = nextStepIndex;
  }

  public onRequestTrade(trade: TradeModel): void {
    this.tradeModel = trade;
    this.currentStepIndex = TradeStep.TRADE_QUOTE;
    this.currencyPairName = trade.currencyPairName;
  }

  public onAcceptQuote(quoteId: number): void {
    const activeTabIndex = this.activeTabIndex;
    const tradeModel = this.tradeModel;

    if (!tradeModel) {
      return;
    }

    const tradeRequest: TradeRequest = {
      action: TRADE_ACTIONS[activeTabIndex],
      amount: tradeModel.amount,
      amountCurrencyCode: tradeModel.amountCurrency,
      quoteId,
    };

    this._tradeService.requestTrade(tradeRequest).subscribe((response) => {
      this.tradeResponse = response;
      this.currentStepIndex = TradeStep.TRADE_CONFIRMATION;
    });
  }

  public onDeclineQuote(): void {
    this.currentStepIndex = TradeStep.TRADE_REQUEST;
  }

  public onViewTradesClicked(): void {
    this._navigationService.to(WebRoute.MANAGE_TRADES).then();
  }

  public onTradeAgainClicked(): void {
    this._tradeForm.controls.amount.reset();
    this.currentStepIndex = TradeStep.TRADE_REQUEST;
  }

  public onTradeHistory(): void {
    this._navigationService.to(WebRoute.MANAGE_TRADES).then();
  }

  public onActiveTabIndexChanged(index: number): void {
    if (!this.isTradeTab(index)) {
      return;
    }

    this.activeTabIndex = index;
  }

  public isTradeTab(index: number): index is TradeTab {
    return index >= TradeTab.BUY && index <= TradeTab.SELL;
  }

  public isTradeStep(index: number): index is TradeStep {
    return index >= TradeStep.TRADE_REQUEST && index <= TradeStep.TRADE_CONFIRMATION;
  }
}

import {Component, Inject} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../../common/components";
import {FormBuilder} from "@angular/forms";
import {TradeModel} from "../../models";
import {TradeService} from "../../../../common/domain-services";
import {TradeRequest} from "../../../../common/domain-models/trade/trade-request";
import {CurrencyTransactionResponse} from "../../../../common/domain-models/trade/currency-transaction-response";
import {webRoutesConfig} from "../../../../common/config/web-routes-config";

type Mode = 'buy' | 'sell';

type Link = {
  path: string;
  mode: Mode
};

const MODES: Record<Mode, number> = {
  buy: 0,
  sell: 1
};

type FormStateType = 'error' | 'normal' | 'pass';

type FormState = {
  state: FormStateType
  isDisabled: boolean
}

type FormStep = {
  title: string
} & FormState

enum TradeSteps {
  TRADE_REQUEST,
  TRADE_QUOTE,
  TRADE_CONFIRMATION
}

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent extends BaseComponent {
  protected readonly title = 'Trade';
  protected readonly subtitle = 'Make a trade here.';
  protected readonly links: Link[] = [
    {path: 'buy', mode: 'buy'},
    {path: 'sell', mode: 'sell'}
  ];
  protected readonly manageTradesUrl = webRoutesConfig.trade.manageTrades;

  protected readonly MAX_NUMBER_OF_STEPS = 3;
  protected readonly TRADE_STEPS = TradeSteps;
  protected currentStepIndex = 0;
  protected formSteps: FormStep[];

  protected activeTabIndex = 0;
  protected readonly mode$ = new BehaviorSubject<Mode>('buy');
  protected currencyPairName: string | null = null;
  protected action: string | null = null;
  protected trade: TradeModel = {currencyPairName: '', amountCurrency: '', amount: 0};
  protected tradeResponse: CurrencyTransactionResponse | null = null;

  public constructor(@Inject(ActivatedRoute) private readonly route: ActivatedRoute,
                     @Inject(Router) private readonly router: Router,
                     @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
                     @Inject(TradeService) private readonly tradeService: TradeService) {
    super();
    this.route.queryParams.subscribe(params => {
      const action = params['action'] as string | undefined;

      if (!action) {
        return;
      }

      this.activeTabIndex = 'sell'.includes(action.toLowerCase()) ? 1 : 0;

      const currencyPairName = params['currencyPairName'] as string | undefined;

      if (!currencyPairName) {
        return;
      }

      this.currencyPairName = currencyPairName;
    });

    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     tap(() => {
    //       const link = this.links.find((link) => {
    //         return this.router.url.includes(link.path);
    //       });
    //
    //       if (!link) {
    //         return;
    //       }
    //
    //       this.mode$.next(link.mode);
    //     }), takeUntil(this.destroyed$)).subscribe();

    this.formSteps = [
      {title: 'Trade Request', state: 'normal', isDisabled: true},
      {title: 'Quote', state: 'normal', isDisabled: true},
      {title: 'Confirmation', state: 'normal', isDisabled: true}
    ];
  }

  public onStepChanged(nextStepIndex: number) {

    if (nextStepIndex < this.MAX_NUMBER_OF_STEPS) {
      this.currentStepIndex = nextStepIndex;
      return;
    }
  }

  public getFormStep(title: string, tradeStep: TradeSteps): FormStep {
    return {
      title,
      state: tradeStep <= this.currentStepIndex
        ? 'normal' : 'pass',
      isDisabled: tradeStep >= this.currentStepIndex
    }
  }

  public onRequestTrade(trade: TradeModel): void {
    this.trade = trade;
    this.currentStepIndex = TradeSteps.TRADE_QUOTE;
  }

  public onAcceptQuote(quoteId: number): void {
    const tradeRequest: TradeRequest = {
      action: this.activeTabIndex === 0 ? 'buy' : 'sell',
      amount: this.trade.amount,
      amountCurrencyCode: this.trade.amountCurrency,
      quoteId
    };

    this.tradeService.requestTrade(tradeRequest).pipe(
      tap(response => {
        this.tradeResponse = response;
        this.currentStepIndex = TradeSteps.TRADE_CONFIRMATION;
      })).subscribe();
  }

  public onDeclineQuote(): void {
    this.currentStepIndex = TradeSteps.TRADE_REQUEST;
  }

  public async onViewTradesClicked(): Promise<void> {
    await this.router.navigate([this.manageTradesUrl]);
  }

  public onTradeAgainClicked(): void {
    this.currentStepIndex = TradeSteps.TRADE_REQUEST;
  }

  public async onTradeHistory(): Promise<void> {
    await this.router.navigate([webRoutesConfig.trade.manageTrades]);
  }
}

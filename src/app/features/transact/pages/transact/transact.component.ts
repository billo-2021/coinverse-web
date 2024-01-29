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
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';
import { NavigationService, ParamsService, ViewPage } from '../../../../common';
import { ListOption } from '../../../../form-components';
import {
  Currency,
  ListOptionsService,
  Payment,
  PaymentMethod,
  PaymentRequest,
  TransactService,
  Wallet,
} from '../../../../domain';
import { PaymentModel } from '../../models';
import { isTransactStep } from '../../utils';
import { TransactStep, TransactTab } from '../../enums';
import { TransactBankDetailsFormService, TransactFormService } from '../../components';

export type TransactStepsType = readonly [string, string];
export type TransactTabType = typeof TransactTab;

export interface TransactViewModel {
  readonly currentStepIndex: TransactStep;
  readonly activeTabIndex: TransactTab;
  readonly currencyCode: string | null;
  readonly paymentMethodOptions: readonly ListOption<PaymentMethod>[];
  readonly currencyOptions: readonly ListOption<Currency>[];
  readonly walletOptions: readonly ListOption<Wallet>[];
  readonly paymentModel: PaymentModel | null;
  readonly paymentResponse: Payment | null;
}

export interface TransactView extends ViewPage<TransactViewModel> {
  readonly TransactSteps: TransactStepsType;
  readonly TransactTabType: TransactTabType;
}

export const TRANSACT_STEPS: TransactStepsType = ['Transact Request', 'Bank Details'];

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ParamsService, TransactFormService, TransactBankDetailsFormService],
})
export class TransactComponent implements TransactView {
  public readonly title = 'Transact';
  public readonly subtitle = 'Deposit or withdraw here.';
  public readonly TransactSteps: TransactStepsType = TRANSACT_STEPS;
  public readonly TransactTabType: TransactTabType = TransactTab;
  protected readonly TransactStep = TransactStep;
  @HostBinding('class') private _classes = 'block';
  private readonly _activeTabIndex$ = new BehaviorSubject<TransactTab>(TransactTab.DEPOSIT);

  private readonly _currentStepIndex$ = new BehaviorSubject<TransactStep>(
    TransactStep.TRANSACT_REQUEST
  );

  private readonly _currencyCode$ = new BehaviorSubject<string | null>(null);

  private readonly _paymentMethodOptions$ = this._listOptionsService
    .getPaymentMethodOptions()
    .pipe(shareReplay(1), startWith<readonly ListOption<PaymentMethod>[]>([]));

  private readonly _currencyOptions$: Observable<readonly ListOption<Currency>[]> =
    this._listOptionsService
      .getFiatCurrencyOptions()
      .pipe(shareReplay(1), startWith<readonly ListOption<Currency>[]>([]));

  private readonly _walletOptions$ = this._listOptionsService
    .getWalletOptions()
    .pipe(shareReplay(1), startWith<readonly ListOption<Wallet>[]>([]));

  private readonly _paymentModel$ = new BehaviorSubject<PaymentModel | null>(null);

  private readonly _paymentResponse$ = new BehaviorSubject<Payment | null>(null);

  private readonly _effects$ = merge(
    this._paramsService.queryParam('action').pipe(
      tap((paramValue) => {
        if (!paramValue) {
          return;
        }

        this.activeTabIndex = 'withdraw'.includes(paramValue.toLowerCase())
          ? TransactTab.WITHDRAW
          : TransactTab.DEPOSIT;
      })
    ),
    this._paramsService
      .queryParam('currencyCode')
      .pipe(tap((paramValue) => (this.currencyCode = paramValue)))
  ).pipe(startWith(null));

  public readonly viewModel$: Observable<TransactViewModel> = combineLatest([
    this._activeTabIndex$.asObservable(),
    this._currentStepIndex$.asObservable(),
    this._currencyCode$.asObservable(),
    this._paymentMethodOptions$,
    this._currencyOptions$,
    this._walletOptions$,
    this._paymentModel$.asObservable(),
    this._paymentResponse$.asObservable(),
    this._effects$,
  ]).pipe(
    map(
      ([
        activeTabIndex,
        currentStepIndex,
        currencyCode,
        paymentMethodOptions,
        currencyOptions,
        walletOptions,
        paymentModel,
        paymentResponse,
      ]) => ({
        activeTabIndex,
        currentStepIndex,
        currencyCode,
        paymentMethodOptions,
        currencyOptions,
        walletOptions,
        paymentModel,
        paymentResponse,
      })
    )
  );

  public constructor(
    @Self() private readonly _paramsService: ParamsService,
    private readonly _navigationService: NavigationService,
    private readonly _listOptionsService: ListOptionsService,
    @Self() private readonly _transactForm: TransactFormService,
    @Self() private readonly _transactBankDetailsForm: TransactBankDetailsFormService,
    private readonly _transactService: TransactService
  ) {}

  public set activeTabIndex(index: TransactTab) {
    this._activeTabIndex$.next(index);
  }

  public set currentStepIndex(step: TransactStep) {
    this._currentStepIndex$.next(step);
  }

  public get currencyCode(): string | null {
    return this._currencyCode$.value;
  }

  public set currencyCode(value: string | null) {
    this._currencyCode$.next(value);
  }

  public get paymentModel(): PaymentModel | null {
    return this._paymentModel$.value;
  }

  public set paymentModel(value: PaymentModel) {
    this._paymentModel$.next(value);
  }

  public get paymentResponse(): Payment | null {
    return this._paymentResponse$.value;
  }

  public set paymentResponse(value: Payment) {
    this._paymentResponse$.next(value);
  }

  public onStepChanged(nextStepIndex: number) {
    if (!isTransactStep(nextStepIndex)) {
      return;
    }

    this.currentStepIndex = nextStepIndex;
  }

  public onRequestTransaction(paymentModel: PaymentModel): void {
    this.paymentModel = paymentModel;
    this.currentStepIndex = TransactStep.BANK_DETAILS;
  }

  public onDeposit() {
    const paymentRequest = this.getPaymentRequest();

    if (!paymentRequest) {
      return;
    }

    this._transactService
      .deposit(paymentRequest)
      .pipe(
        tap((paymentResponse) => {
          this.paymentResponse = paymentResponse;
          this.currentStepIndex = TransactStep.TRANSACT_CONFIRMATION;
        })
      )
      .subscribe();
  }

  public onWithDraw() {
    const paymentRequest = this.getPaymentRequest();

    if (!paymentRequest) {
      return;
    }

    this._transactService
      .withdraw(paymentRequest)
      .pipe(
        tap((paymentResponse) => {
          this.paymentResponse = paymentResponse;
          this.currentStepIndex = TransactStep.TRANSACT_CONFIRMATION;
        })
      )
      .subscribe();
  }

  public onAcceptRate(): void {
    this.currentStepIndex = TransactStep.TRANSACT_CONFIRMATION;
  }

  public onDeclineRate(): void {
    this.currentStepIndex = TransactStep.TRANSACT_REQUEST;
  }

  public onPayAgain(): void {
    this._transactForm.reset();
    this._transactBankDetailsForm.reset();
    this.currentStepIndex = TransactStep.TRANSACT_REQUEST;
  }

  public onViewPayments(): void {
    this._navigationService.to('manageTransactions').then();
  }

  public onViewTransactions(): void {
    this._navigationService.to('manageTransactions').then();
  }

  public onActiveTabIndexChange(index: TransactTab) {
    this.activeTabIndex = index;
  }

  private getPaymentRequest(): PaymentRequest | null {
    const paymentModel = this.paymentModel;

    if (!paymentModel) {
      return null;
    }

    return {
      paymentMethod: paymentModel.paymentMethod,
      amount: paymentModel.amount,
      amountCurrencyCode: paymentModel.amountCurrency,
      fromCurrencyCode: paymentModel.fromCurrency,
      toCurrencyCode: paymentModel.toCurrency,
    };
  }
}

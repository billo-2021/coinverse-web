import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { BaseComponent } from '../../../../common/components';
import { FormBuilder } from '@angular/forms';
import { PaymentModel } from '../../models';
import { TransactService } from '../../../../common/domain-services';
import { PaymentRequest } from '../../../../common/domain-models/transact/payment-request';
import { PaymentResponse } from '../../../../common/domain-models/transact/payment-response';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

type Mode = 'deposit' | 'withdraw';

type Link = {
  path: string;
  mode: Mode;
};

const MODES: Record<Mode, string> = {
  deposit: '/deposit',
  withdraw: '/withdraw',
};

type StepStateType = 'error' | 'normal' | 'pass';

type StepState = {
  state: StepStateType;
  isDisabled: boolean;
};

type Step = {
  title: string;
} & StepState;

enum TransactSteps {
  TRANSACT_REQUEST,
  BANK_DETAILS,
  TRANSACT_CONFIRMATION,
}

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.scss'],
})
export class TransactComponent extends BaseComponent {
  protected readonly manageTransactionsUrl = webRoutesConfig.manageTransactions;
  protected readonly title = 'Transact';
  protected readonly subtitle = 'Deposit or withdraw here.';

  protected readonly MAX_NUMBER_OF_STEPS = 3;
  protected readonly TRANSACT_STEPS = TransactSteps;
  protected currentStepIndex = 0;
  protected transactSteps: Step[];

  protected activeTabIndex = 0;
  protected readonly mode$ = new BehaviorSubject<Mode>('deposit');
  protected currencyCode: string | null = null;
  protected paymentModel: PaymentModel = {
    paymentMethod: '',
    fromCurrency: '',
    toCurrency: '',
    amountCurrency: '',
    amount: 0,
  };
  protected paymentResponse: PaymentResponse | null = null;

  public constructor(
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(Router) private readonly router: Router,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(TransactService) private readonly transactService: TransactService
  ) {
    super();
    this.route.queryParams.subscribe((params) => {
      const action = params['action'] as string | undefined;

      if (!action) {
        return;
      }

      this.activeTabIndex = 'withdraw'.includes(action.toLowerCase()) ? 1 : 0;

      const currencyCode = params['currencyCode'] as string | undefined;

      if (!currencyCode) {
        return;
      }

      this.currencyCode = currencyCode;
    });

    this.transactSteps = [
      { title: 'Transact Request', state: 'normal', isDisabled: true },
      { title: 'Bank Details', state: 'normal', isDisabled: true },
    ];
  }

  public onStepChanged(nextStepIndex: number) {
    if (nextStepIndex < this.MAX_NUMBER_OF_STEPS) {
      this.currentStepIndex = nextStepIndex;
      return;
    }
  }

  public getFormStep(title: string, transactStep: TransactSteps): Step {
    return {
      title,
      state: transactStep <= this.currentStepIndex ? 'normal' : 'pass',
      isDisabled: transactStep >= this.currentStepIndex,
    };
  }

  public onRequestTransaction(paymentModel: PaymentModel): void {
    this.paymentModel = paymentModel;
    this.currentStepIndex = TransactSteps.BANK_DETAILS;
  }

  public onSaveBankingDetails(): void {
    const paymentRequest: PaymentRequest = {
      paymentMethod: this.paymentModel.paymentMethod,
      amount: this.paymentModel.amount,
      amountCurrencyCode: this.paymentModel.amountCurrency,
      fromCurrencyCode: this.paymentModel.fromCurrency,
      toCurrencyCode: this.paymentModel.toCurrency,
    };

    if (this.activeTabIndex === 0) {
      this.transactService
        .deposit(paymentRequest)
        .pipe(
          tap((paymentResponse) => {
            this.paymentResponse = paymentResponse;
            this.currentStepIndex = TransactSteps.TRANSACT_CONFIRMATION;
          })
        )
        .subscribe();
      return;
    }

    if (this.activeTabIndex === 1) {
      this.transactService
        .withdraw(paymentRequest)
        .pipe(
          tap((paymentResponse) => {
            this.paymentResponse = paymentResponse;
            this.currentStepIndex = TransactSteps.TRANSACT_CONFIRMATION;
          })
        )
        .subscribe();
      return;
    }
  }

  public onAcceptRate(): void {
    this.currentStepIndex = TransactSteps.TRANSACT_CONFIRMATION;
  }

  public onDeclineRate(): void {
    this.currentStepIndex = TransactSteps.TRANSACT_REQUEST;
  }

  public onPayAgain(): void {
    this.currentStepIndex = TransactSteps.TRANSACT_REQUEST;
  }

  public async onViewPayments(): Promise<void> {
    await this.router.navigate([this.manageTransactionsUrl]);
  }

  public async onViewTransactions(): Promise<void> {
    await this.router.navigate([webRoutesConfig.manageTransactions]);
  }
}

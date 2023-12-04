import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';

import { BaseComponent, TransactService, webRoutesConfig } from '../../../../common';
import { PaymentRequest, PaymentResponse } from '../../../../common/domain-models/transact';

import { PaymentModel } from '../../models';

type Mode = 'deposit' | 'withdraw';

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
  protected readonly transactSteps = ['Transact Request', 'Bank Details'];

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
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _transactService: TransactService
  ) {
    super();
    this._route.queryParams.subscribe((params) => {
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
  }

  public onStepChanged(nextStepIndex: number) {
    if (nextStepIndex < this.MAX_NUMBER_OF_STEPS) {
      this.currentStepIndex = nextStepIndex;
      return;
    }
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
      this._transactService
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
      this._transactService
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
    await this._router.navigate([this.manageTransactionsUrl]);
  }

  public async onViewTransactions(): Promise<void> {
    await this._router.navigate([webRoutesConfig.manageTransactions]);
  }
}

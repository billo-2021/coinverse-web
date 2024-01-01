import { Component, Self } from '@angular/core';
import { tap } from 'rxjs';

import { NavigationService, TransactService } from '../../../../common';
import { PaymentRequest } from '../../../../common/domain-models/transact';

import { PaymentModel } from '../../models';
import {
  TransactBankDetailsFormService,
  TransactFormService,
  TransactViewModelService,
} from '../../services';
import { Tabs, TransactSteps } from './transact.view-model';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.scss'],
  providers: [TransactFormService, TransactBankDetailsFormService, TransactViewModelService],
})
export class TransactComponent {
  protected readonly title = 'Transact';
  protected readonly subtitle = 'Deposit or withdraw here.';

  protected readonly TABS = Tabs;
  protected readonly MAX_NUMBER_OF_STEPS = 3;
  protected readonly TRANSACT_STEPS = TransactSteps;
  protected readonly transactSteps = ['Transact Request', 'Bank Details'];

  protected viewModel$: TransactViewModelService;

  public constructor(
    private readonly _navigationService: NavigationService,
    @Self() private readonly _viewModel: TransactViewModelService,
    @Self() private readonly _transactForm: TransactFormService,
    @Self() private readonly _transactBankDetailsForm: TransactBankDetailsFormService,
    private readonly _transactService: TransactService
  ) {
    this.viewModel$ = _viewModel;
  }

  public onStepChanged(nextStepIndex: number) {
    if (nextStepIndex < this.MAX_NUMBER_OF_STEPS) {
      this._viewModel.currentStepIndex = nextStepIndex;
    }
  }

  public onRequestTransaction(paymentModel: PaymentModel): void {
    this.viewModel$.paymentModel = paymentModel;
    this.viewModel$.currentStepIndex = TransactSteps.BANK_DETAILS;
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
          this.viewModel$.paymentResponse = paymentResponse;
          this.viewModel$.currentStepIndex = TransactSteps.TRANSACT_CONFIRMATION;
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
          this.viewModel$.paymentResponse = paymentResponse;
          this.viewModel$.currentStepIndex = TransactSteps.TRANSACT_CONFIRMATION;
        })
      )
      .subscribe();
  }

  public onAcceptRate(): void {
    this.viewModel$.currentStepIndex = TransactSteps.TRANSACT_CONFIRMATION;
  }

  public onDeclineRate(): void {
    this._viewModel.currentStepIndex = TransactSteps.TRANSACT_REQUEST;
  }

  public onPayAgain(): void {
    this._transactForm.value.reset();
    this._transactBankDetailsForm.value.reset();
    this.viewModel$.currentStepIndex = TransactSteps.TRANSACT_REQUEST;
  }

  public onViewPayments(): void {
    this._navigationService.to('manageTransactions').then();
  }

  public onViewTransactions(): void {
    this._navigationService.to('manageTransactions').then();
  }

  public onActiveTabIndexChange(index: Tabs) {
    this.viewModel$.activeTabIndex = index;
  }

  private getPaymentRequest(): PaymentRequest | null {
    const paymentModel = this._viewModel.paymentModel;

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

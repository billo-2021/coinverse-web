import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Self,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup } from '@angular/forms';

import { LookupService, SimpleChangesTyped, WalletService } from '../../../../common';

import { PaymentModel, TransactForm } from '../../models';
import { TransactFormService, TransactFormViewModelService } from '../../services';
import { Tabs } from '../../pages/transact/transact.view-model';

type Tab = {
  text: string;
  icon: string | null;
  isDisabled: boolean;
};

const ACTION: Record<number, string> = {
  0: 'Deposit',
  1: 'Withdraw',
} as const;

const WALLET_LABEL: Record<number, string> = {
  0: 'To Wallet',
  1: 'From Wallet',
} as const;

type TransactFormInput = {
  activeTabIndex: number;
  currencyCode: string | null;
};

@Component({
  selector: 'app-transact-form',
  templateUrl: './transact-form.component.html',
  styleUrls: ['./transact-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TransactFormViewModelService],
})
export class TransactFormComponent implements OnChanges {
  @Input() public activeTabIndex: Tabs = 0;
  @Input() public currencyCode: string | null = null;

  @Output() public submitClicked = new EventEmitter<PaymentModel>();

  @Output() public activeTabIndexChange = new EventEmitter<Tabs>();

  protected readonly form: FormGroup<TransactForm>;
  protected readonly viewModel$: TransactFormViewModelService;

  protected readonly tabs: Tab[] = [
    { text: 'Deposit', icon: null, isDisabled: false },
    { text: 'Withdraw', icon: null, isDisabled: false },
  ];

  protected readonly action = ACTION;
  protected readonly walletLabel = WALLET_LABEL;

  public constructor(
    @SkipSelf() private readonly _transactForm$: TransactFormService,
    @Self() private readonly _viewModel$: TransactFormViewModelService,
    private readonly _lookupService: LookupService,
    private readonly _walletService: WalletService
  ) {
    this.form = _transactForm$.value;
    this.viewModel$ = _viewModel$;
  }

  public onActiveTabIndexChange(index: number): void {
    if (index < 2) {
      this.activeTabIndexChange.emit(index);
    }
  }

  public onSubmit(): void {
    const transactFormValue = this.form.getRawValue();

    if (
      !transactFormValue.paymentMethod ||
      !transactFormValue.wallet ||
      !transactFormValue.amountCurrency
    ) {
      return;
    }

    const wallet = transactFormValue.wallet.value;
    const walletCurrency = wallet.currency;
    const amountCurrency = transactFormValue.amountCurrency.value;

    const fromCurrencyCode = this.activeTabIndex === 0 ? amountCurrency.code : walletCurrency.code;
    const toCurrencyCode = this.activeTabIndex === 0 ? walletCurrency.code : amountCurrency.code;

    const paymentModel: PaymentModel = {
      paymentMethod: transactFormValue.paymentMethod.value.code,
      fromCurrency: fromCurrencyCode,
      toCurrency: toCurrencyCode,
      amountCurrency: amountCurrency.code,
      amount: transactFormValue.amount,
    };

    this.submitClicked.emit(paymentModel);
  }

  ngOnChanges(changes: SimpleChangesTyped<TransactFormInput>): void {
    const currencyCodeChanges = changes.currencyCode;

    if (
      currencyCodeChanges &&
      currencyCodeChanges.currentValue !== currencyCodeChanges.previousValue
    ) {
      this.viewModel$.currencyCode = currencyCodeChanges.currentValue;
    }
  }
}

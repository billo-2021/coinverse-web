import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  OnChanges,
  Optional,
  Output,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { FormBase, Required, RequiredAmount, SimpleChangesTyped } from '../../../../common';
import { Tab } from '../../../../ui-components';
import { ListOption } from '../../../../form-components';
import {
  Currency,
  ListOptionsService,
  LookupService,
  PaymentMethod,
  Wallet,
  WalletService,
} from '../../../../domain';
import { TransactTab } from '../../enums';
import { PaymentModel } from '../../models';
import { isTransactTab } from '../../utils';

export type TransactActionsType = readonly ['Deposit', 'Withdraw'];
export type WalletLabelsType = readonly [string, string];
export type TransactTabsType = readonly [Tab, Tab];

export interface TransactForm {
  readonly paymentMethod: FormControl<ListOption<PaymentMethod> | null>;
  readonly wallet: FormControl<ListOption<Wallet> | null>;
  readonly amountCurrency: FormControl<ListOption<Currency> | null>;
  readonly amount: FormControl<number>;
}

export interface TransactFormComponentInput {
  activeTabIndex: TransactTab;
  currencyCode: string | null;
  paymentMethodOptions: readonly ListOption<PaymentMethod>[];
  currencyOptions: readonly ListOption<Currency>[];
  walletOptions: readonly ListOption<Wallet>[];
}

export interface TransactFormComponentOutput {
  activeTabIndexChange: EventEmitter<TransactTab>;
  submitClicked: EventEmitter<PaymentModel>;
}

export function getTransactForm(): TransactForm {
  return {
    paymentMethod: new FormControl<ListOption<PaymentMethod> | null>(null, Required),
    wallet: new FormControl<ListOption<Wallet> | null>(null, Required),
    amountCurrency: new FormControl<ListOption<Currency> | null>(null, Required),
    amount: new FormControl<number>(0, RequiredAmount()),
  };
}

export const TRANSACT_ACTIONS: TransactActionsType = ['Deposit', 'Withdraw'];
export const WALLET_LABELS: WalletLabelsType = ['To Wallet', 'From Wallet'];

export const TRANSACT_TABS: TransactTabsType = [
  { text: 'Deposit', icon: null, isDisabled: false },
  { text: 'Withdraw', icon: null, isDisabled: false },
];

@Injectable()
export class TransactFormService extends FormBase<TransactForm> {
  constructor() {
    super(getTransactForm());
  }
}

@Component({
  selector: 'app-transact-form',
  templateUrl: './transact-form.component.html',
  styleUrls: ['./transact-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactFormComponent
  implements TransactFormComponentInput, TransactFormComponentOutput, OnChanges
{
  @Input() public activeTabIndex: TransactTab = TransactTab.DEPOSIT;
  @Input() public currencyCode: string | null = null;
  @Input() public walletOptions: readonly ListOption<Wallet>[] = [];

  @Output() public activeTabIndexChange = new EventEmitter<TransactTab>();

  @Output() public submitClicked = new EventEmitter<PaymentModel>();

  public readonly form: FormBase<TransactForm> =
    this._transactForm ?? new FormBase<TransactForm>(getTransactForm());

  public readonly TransactActions: TransactActionsType = TRANSACT_ACTIONS;
  public readonly WalletLabels: WalletLabelsType = WALLET_LABELS;
  public readonly TransactTabs: TransactTabsType = TRANSACT_TABS;

  protected readonly selectedWallet$: Observable<ListOption<Wallet> | null> =
    this.form.controls.wallet.valueChanges.pipe(startWith<ListOption<Wallet> | null>(null));

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional() @SkipSelf() private readonly _transactForm: TransactFormService | null,
    private readonly _lookupService: LookupService,
    private readonly _walletService: WalletService,
    private readonly _listOptionsService: ListOptionsService
  ) {}

  private _paymentMethodOptions: readonly ListOption<PaymentMethod>[] = [];

  public get paymentMethodOptions(): readonly ListOption<PaymentMethod>[] {
    return this._paymentMethodOptions;
  }

  @Input()
  public set paymentMethodOptions(value: readonly ListOption<PaymentMethod>[]) {
    this._paymentMethodOptions = value;
    this.form.controls.paymentMethod.setValue(value.length ? value[0] : null);
  }

  private _currencyOptions: readonly ListOption<Currency>[] = [];

  public get currencyOptions(): readonly ListOption<Currency>[] {
    return this._currencyOptions;
  }

  @Input()
  public set currencyOptions(value: readonly ListOption<Currency>[]) {
    this._currencyOptions = value;
    this.form.controls.amountCurrency.setValue(value.length ? value[0] : null);
  }

  public get formGroup(): FormGroup<TransactForm> {
    return this.form;
  }

  public onActiveTabIndexChange(index: number): void {
    if (!isTransactTab(index)) {
      return;
    }

    this.activeTabIndexChange.emit(index);
  }

  public ngOnChanges(changes: SimpleChangesTyped<TransactFormComponentInput>): void {
    if (!(changes.currencyCode || changes.walletOptions)) {
      return;
    }

    this._updateWallet();
  }

  public onSubmit(): void {
    const transactFormModel = this.form.getModel();

    if (
      !transactFormModel.paymentMethod ||
      !transactFormModel.wallet ||
      !transactFormModel.amountCurrency
    ) {
      return;
    }

    const wallet = transactFormModel.wallet.value;
    const walletCurrency = wallet.currency;
    const amountCurrency = transactFormModel.amountCurrency.value;

    const fromCurrencyCode = this.activeTabIndex === 0 ? amountCurrency.code : walletCurrency.code;
    const toCurrencyCode = this.activeTabIndex === 0 ? walletCurrency.code : amountCurrency.code;

    const paymentModel: PaymentModel = {
      paymentMethod: transactFormModel.paymentMethod.value.code,
      fromCurrency: fromCurrencyCode,
      toCurrency: toCurrencyCode,
      amountCurrency: amountCurrency.code,
      amount: transactFormModel.amount,
    };

    this.submitClicked.emit(paymentModel);
  }

  private _updateWallet(): void {
    const currencyCode = this.currencyCode;

    if (!currencyCode) {
      this.form.controls.wallet.setValue(null);
      return;
    }

    const foundWalletOption = this.walletOptions.find(
      (option) => option.value.currency.code.toLowerCase() === currencyCode.toLowerCase()
    );

    if (!foundWalletOption) {
      this.form.controls.wallet.setValue(null);
      return;
    }

    this.form.controls.wallet.setValue(foundWalletOption);
  }
}

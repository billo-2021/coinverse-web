import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { DestroyState, FormBase, FormValidators, SimpleChangesTyped } from '../../../../shared';
import { Tab } from '../../../../ui-components';
import { ListOption } from '../../../../form-components';
import { Currency, CurrencyPair } from '../../../../domain';
import { TradeTab } from '../../enums';
import { TradeModel } from '../../models';

export type TradeTabsType = readonly [Tab, Tab];
export type TradeActionsType = readonly [string, string];

export interface TradeForm {
  readonly currencyPair: FormControl<ListOption<CurrencyPair> | null>;
  readonly amountCurrency: FormControl<ListOption<Currency> | null>;
  readonly amount: FormControl<number>;
}

export interface TradeFormComponentInput {
  activeTabIndex: TradeTab;
  currencyPairName: string | null;
  currencyPairOptions: readonly ListOption<CurrencyPair>[];
  currencyOptions: readonly ListOption<Currency>[];
}

export interface TradeFormComponentOutput {
  activeTabIndexChange: EventEmitter<TradeTab>;
  actionClicked: EventEmitter<TradeModel>;
}

export const TRADE_TABS: TradeTabsType = [
  { text: 'BUY', icon: null, isDisabled: false },
  { text: 'SELL', icon: null, isDisabled: false },
];

export const TRADE_ACTIONS: TradeActionsType = ['Buy', 'Sell'];

export function getTradeForm(): TradeForm {
  return {
    currencyPair: new FormControl<ListOption<CurrencyPair> | null>(null, FormValidators.Required),
    amountCurrency: new FormControl<ListOption<Currency> | null>(null, FormValidators.Required),
    amount: new FormControl<number>(0, FormValidators.RequiredAmount()),
  };
}

@Injectable()
export class TradeFormService extends FormBase<TradeForm> {
  constructor() {
    super(getTradeForm());
  }
}

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyState],
})
export class TradeFormComponent
  implements TradeFormComponentInput, TradeFormComponentOutput, OnInit, OnChanges
{
  @Input() public activeTabIndex: TradeTab = TradeTab.BUY;
  @Input() public currencyPairName: string | null = null;

  @Input()
  public currencyPairOptions: readonly ListOption<CurrencyPair>[] = [];

  @Input() public currencyOptions: readonly ListOption<Currency>[] = [];

  @Output() public activeTabIndexChange = new EventEmitter<TradeTab>();

  @Output() public actionClicked = new EventEmitter<TradeModel>();
  public readonly form: FormBase<TradeForm> =
    this._tradeForm ?? new FormBase<TradeForm>(getTradeForm());

  public readonly TradeTabs: TradeTabsType = TRADE_TABS;
  public readonly TradeActions: TradeActionsType = TRADE_ACTIONS;
  protected filteredCurrencyOptions: readonly ListOption<Currency>[] = [];
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional() @SkipSelf() private readonly _tradeForm: TradeFormService | null,
    @Self() private readonly _destroy$: DestroyState
  ) {}

  protected get formGroup(): FormGroup<TradeForm> {
    return this.form;
  }

  public ngOnInit() {
    this.form.controls.currencyPair.valueChanges
      .pipe(
        tap((currencyPairOption) => {
          this._updateAmountCurrency(currencyPairOption);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  public onActiveTabIndexChange(index: number): void {
    this.activeTabIndexChange.emit(index);
  }

  public onAction(): void {
    const tradeFromValue = this.form.getRawValue();

    if (!tradeFromValue.currencyPair || !tradeFromValue.amountCurrency) {
      return;
    }

    const trade: TradeModel = {
      currencyPairName: tradeFromValue.currencyPair.name,
      amountCurrency: tradeFromValue.amountCurrency.code,
      amount: tradeFromValue.amount,
    };

    this.actionClicked.emit(trade);
  }

  public ngOnChanges(changes: SimpleChangesTyped<TradeFormComponentInput>): void {
    if (!(changes.currencyPairName || changes.currencyPairOptions || changes.currencyOptions)) {
      return;
    }

    this._updateCurrencyPairControl();
  }

  private _updateCurrencyPairControl(): void {
    const currencyPairName = this.currencyPairName;

    if (!currencyPairName) {
      this.form.controls.currencyPair.setValue(null);
      return;
    }

    const foundCurrencyPairOption = this.currencyPairOptions.find((currencyPairOption) =>
      currencyPairOption.name.toLowerCase().includes(currencyPairName.toLowerCase())
    );

    if (!foundCurrencyPairOption) {
      this.form.controls.currencyPair.setValue(null);
      return;
    }

    this.form.controls.currencyPair.setValue(foundCurrencyPairOption);
    this._updateAmountCurrency(foundCurrencyPairOption);
  }

  private _updateAmountCurrency(currencyPairOption: ListOption<CurrencyPair> | null): void {
    const currencyOptions = this.currencyOptions;

    if (!currencyPairOption) {
      this.form.controls.amountCurrency.setValue(null);
      this.filteredCurrencyOptions = this.currencyOptions;
      return;
    }

    const currencyPair = currencyPairOption.value;

    const baseCurrency = currencyPair.baseCurrency;
    const quoteCurrency = currencyPair.quoteCurrency;

    const filteredCurrencyOptions = currencyOptions.filter(
      (option) => option.code === baseCurrency.code || option.code == quoteCurrency.code
    );

    this.filteredCurrencyOptions = filteredCurrencyOptions;

    if (!filteredCurrencyOptions.length) {
      this.form.controls.amountCurrency.setValue(null);
      return;
    }

    this.form.controls.amountCurrency.setValue(filteredCurrencyOptions[0]);
  }
}

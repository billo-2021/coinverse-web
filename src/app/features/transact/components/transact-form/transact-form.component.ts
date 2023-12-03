import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { ListOption, Option } from '../../../../form-components/types';
import { OptionUtils } from '../../../../form-components/utils';
import { WalletService } from '../../../../common/domain-services';
import { WalletResponse } from '../../../../common/domain-models/wallet';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { PaymentModel } from '../../models';
import { CurrencyResponse, PaymentMethodResponse } from '../../../../common/domain-models';

type ActionType = 'deposit' | 'withdraw';

type Tab = {
  text: string;
  icon: string | null;
  isDisabled: boolean;
};

const ACTION: Record<number, string> = {
  0: 'Deposit',
  1: 'Withdraw',
};

const WALLET_LABEL: Record<number, string> = {
  0: 'To Wallet',
  1: 'From Wallet',
};

@Component({
  selector: 'app-transact-form',
  templateUrl: './transact-form.component.html',
  styleUrls: ['./transact-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactFormComponent implements OnInit {
  public form: FormGroup;
  @Input() public activeTabIndex = 0;
  @Input() public currencyCode: string | null = null;

  @Output() public actionClicked = new EventEmitter<PaymentModel>();
  @Output() public activeTabIndexChange = new EventEmitter<number>();

  protected readonly tabs: Tab[] = [
    { text: 'Deposit', icon: null, isDisabled: false },
    { text: 'Withdraw', icon: null, isDisabled: false },
  ];

  protected readonly action = ACTION;
  protected readonly walletLabel = WALLET_LABEL;
  protected readonly paymentMethodOptions$: Observable<Option<PaymentMethodResponse>[]>;
  protected readonly currencyOptions$: Observable<Option<CurrencyResponse>[]>;
  protected readonly walletOptions$: Observable<Option<WalletResponse>[]>;
  protected selectedWallet$: Observable<WalletResponse> | null = null;

  public constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(LookupService) private readonly lookupService: LookupService,
    @Inject(WalletService) private readonly walletService: WalletService
  ) {
    this.form = this.getTransactForm(formBuilder);

    this.paymentMethodOptions$ = lookupService.getAllPaymentMethods().pipe(
      map((response) =>
        OptionUtils.toOptions(response, { code: 'code', name: 'name', avatar: 'code' })
      ),
      tap((paymentMethods) => {
        this.form?.controls['paymentMethod']?.setValue(paymentMethods[0]);
      })
    );

    this.currencyOptions$ = lookupService.getAllCurrenciesByType('fiat').pipe(
      map((currencyResponse) => {
        return currencyResponse.map((currencyResponse) => ({
          code: currencyResponse.code,
          name: currencyResponse.name,
          avatar: currencyResponse.code,
          value: currencyResponse,
        }));
      }),
      tap((currencyOptions) => {
        this.form.controls['amountCurrency']?.setValue(currencyOptions[0]);
      }),
      shareReplay(1)
    );

    this.walletOptions$ = walletService.getBalances({ page: 0, size: 100 }).pipe(
      map((response) => {
        const wallets = response.data;
        return wallets.map((wallet) => {
          return {
            code: wallet.currency.code,
            name: wallet.currency.name + ' Wallet',
            avatar: wallet.currency.code,
            value: wallet,
          };
        });
      })
    );
  }

  public onActiveTabIndexChange(index: number): void {
    this.activeTabIndexChange.emit(index);
  }

  public onAction(): void {
    const paymentMethod = this.form.controls['paymentMethod'].value.code as string;
    const walletOption = this.form.controls['wallet'].value.value as ListOption<WalletResponse>;
    const wallet = walletOption.value as WalletResponse;
    const walletCurrency = wallet.currency;
    const amountCurrency = this.form.controls['amountCurrency'].value.value as CurrencyResponse;
    const amount = this.form.controls['amount'].value as number;

    const fromCurrency = this.activeTabIndex === 0 ? amountCurrency.code : walletCurrency.code;
    const toCurrency = this.activeTabIndex === 0 ? walletCurrency.code : amountCurrency.code;

    const paymentModel: PaymentModel = {
      paymentMethod,
      fromCurrency,
      toCurrency,
      amountCurrency: amountCurrency.code,
      amount,
    };

    this.actionClicked.emit(paymentModel);
  }

  ngOnInit(): void {
    this.walletOptions$
      .pipe(
        tap((walletOptions) => {
          const currencyCode = this.currencyCode;

          if (!currencyCode) {
            return;
          }

          const foundWalletOption = walletOptions.find((option) => {
            const wallet = option.value as WalletResponse;

            return wallet.currency.code.toLowerCase() === currencyCode.toLowerCase();
          });

          if (!foundWalletOption) {
            return;
          }

          this.form.controls['wallet']?.setValue(foundWalletOption);
        })
      )
      .subscribe();

    this.selectedWallet$ = this.form.controls['wallet'].valueChanges.pipe(
      filter((option) => tuiIsPresent(option)),
      map((option) => {
        return option.value as WalletResponse;
      })
    );
  }

  private getTransactForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      paymentMethod: [null, [Validators.required]],
      wallet: [null, Validators.required],
      amountCurrency: [null, [Validators.required]],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }
}

import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  finalize,
  map,
  merge,
  Observable,
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { tuiIsPresent } from '@taiga-ui/cdk';
import {
  AlertService,
  CrudMode,
  CrudModeTitle,
  ErrorUtils,
  FormBase,
  NavigationController,
  ParamsService,
  WebRoute,
} from '../../../../shared';
import {
  AddCryptoCurrency,
  AdministrationService,
  CryptoCurrency,
  LookupService,
  UpdateCryptoCurrency,
} from '../../../../domain';
import { CurrencyForm, CurrencyFormService } from '../../components';

export interface ManageCurrencyViewModel {
  readonly currencyCode: string | null;
  readonly currency: CryptoCurrency | null;
  readonly mode: CrudMode;
  readonly title: string;
  readonly subtitle: string;
  readonly saveText: string;
  readonly error: string | null;
}

export const TITLE: CrudModeTitle = {
  add: 'Add crypto currency',
  edit: 'Update crypto currency',
};

export const SUBTITLE: CrudModeTitle = {
  add: 'Add crypto currency here.',
  edit: 'Edit crypto currency here.',
};

export const SAVE_TEXT: CrudModeTitle = {
  add: 'Add',
  edit: 'Save Changes',
};

@Component({
  selector: 'app-manage-currency',
  templateUrl: './manage-currency.component.html',
  styleUrls: ['./manage-currency.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyFormService, ParamsService],
})
export class ManageCurrencyComponent {
  public readonly CrudModeType: typeof CrudMode = CrudMode;
  protected form: FormBase<CurrencyForm> = this._currencyForm;
  @HostBinding('class') private _classes = 'block';
  private readonly _currencyCode$ = this._paramsService.param('currencyCode').pipe(startWith(null));

  private readonly _currency$ = this._currencyCode$.pipe(
    filter(tuiIsPresent),
    switchMap((currencyCode) =>
      this._lookupService.getCryptoCurrencyByCurrencyCode(currencyCode).pipe(shareReplay(1))
    ),
    startWith(null)
  );

  private readonly _mode$: Observable<CrudMode> = this._currency$.pipe(
    map((currency) => (!currency ? CrudMode.add : CrudMode.edit)),
    startWith(CrudMode.add)
  );

  private readonly _reload$ = new ReplaySubject<void>();

  private readonly _error$ = new BehaviorSubject<string | null>(null);

  private readonly _effects$ = merge(
    this._reload$.pipe(
      switchMap(() => this._currency$.pipe(startWith(null))),
      filter(tuiIsPresent),
      tap((currency) => this._currencyForm.setFromModel(currency)),
      startWith(null)
    )
  );

  public readonly viewModel$: Observable<ManageCurrencyViewModel> = combineLatest([
    this._currencyCode$,
    this._currency$,
    this._mode$,
    this._error$,
    this._effects$,
  ]).pipe(
    map(([currencyCode, currency, mode, error]) => ({
      currencyCode,
      currency,
      mode,
      title: TITLE[mode],
      subtitle: SUBTITLE[mode],
      saveText: SAVE_TEXT[mode],
      form: this.form,
      error,
    }))
  );

  public constructor(
    private readonly _paramsService: ParamsService,
    private readonly _alertService: AlertService,
    private readonly _navigationController: NavigationController,
    private readonly _currencyForm: CurrencyFormService,
    private readonly _administrationService: AdministrationService,
    private readonly _lookupService: LookupService
  ) {
    this.reload();
  }

  public set error(value: string | null) {
    this._error$.next(value);
  }

  public reload(): void {
    this._reload$.next();
  }

  public onAddCurrency(): void {
    const currencyFormModel = this.form.getModel();

    const addCryptoCurrencyRequest: AddCryptoCurrency = {
      code: currencyFormModel.code,
      name: currencyFormModel.name,
      symbol: currencyFormModel.symbol,
      circulatingSupply: currencyFormModel.circulatingSupply,
    };

    this._administrationService
      .addCryptoCurrency(addCryptoCurrencyRequest)
      .pipe(
        finalize(() => {
          this.form.reset();
          this.form.markAsUntouched();
        })
      )
      .subscribe({
        error: (error) => (this.error = ErrorUtils.getErrorMessage(error)),
        next: () => {
          this._alertService.showMessage('Currency Added');
          this._navigationController.to(WebRoute.MANAGE_CURRENCIES).then();
        },
      });
  }

  public onEditCurrency(): void {
    const currencyFormModel = this.form.getModel();

    const updateCryptoCurrency: UpdateCryptoCurrency = {
      name: currencyFormModel.name,
      symbol: currencyFormModel.symbol,
      circulatingSupply: currencyFormModel.circulatingSupply,
    };

    this._administrationService
      .updateCryptoCurrency(currencyFormModel.code, updateCryptoCurrency)
      .subscribe({
        next: () => {
          this._alertService.showMessage('Currency Updated');
          this._navigationController.to(WebRoute.MANAGE_CURRENCIES).then();
        },
        error: (error) => {
          this.error = ErrorUtils.getErrorMessage(error);
          this.form.markAsPristine();
          this.reload();
        },
      });
  }
}

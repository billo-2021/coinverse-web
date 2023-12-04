import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, filter, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { tuiIsPresent } from '@taiga-ui/cdk';

import { AlertService } from '../../../../core';
import { AdministrationService, LookupService, webRoutesConfig } from '../../../../common';
import { CryptoCurrencyResponse } from '../../../../common/domain-models/lookup';

type Mode = 'create' | 'edit';

const TITLE: Record<Mode, string> = {
  create: 'Add new Crypto Currency',
  edit: 'Update Crypto Currency',
};

const SUBTITLE: Record<Mode, string> = {
  create: 'Add new Crypto Currency here.',
  edit: 'Edit Crypto Currency here',
};

const SAVE_TEXT: Record<Mode, string> = {
  create: 'Add',
  edit: 'Save Changes',
};

@Component({
  selector: 'app-manage-currency',
  templateUrl: './manage-currency.component.html',
  styleUrls: ['./manage-currency.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCurrencyComponent {
  public manageCurrenciesUrl = webRoutesConfig.manageCurrencies;
  public readonly title = TITLE;
  public readonly subtitle = SUBTITLE;
  public readonly saveText = SAVE_TEXT;

  public readonly mode$ = new BehaviorSubject<Mode>('create');

  protected currencyCode$: Observable<string | null>;
  protected currencyForm: FormGroup;

  public constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _formBuilder: FormBuilder,
    private readonly _lookupService: LookupService,
    private readonly _administrationService: AdministrationService,
    private readonly _alertService: AlertService
  ) {
    this.currencyForm = this.getCurrencyForm(_formBuilder, {
      id: 0,
      code: '',
      name: '',
      symbol: '',
      circulatingSupply: NaN,
    });

    this.currencyCode$ = _route.params.pipe(
      map((params) => {
        const currencyCode = params['currencyCode'] as string | null | undefined;
        this.mode$.next(currencyCode ? 'edit' : 'create');
        return currencyCode || null;
      })
    );

    this.currencyCode$
      .pipe(
        filter(tuiIsPresent),
        switchMap((currencyCode) => {
          return this._lookupService.getCryptoCurrencyByCurrencyCode(currencyCode);
        }),
        tap((currencyResponse) => {
          const code = this.currencyForm.controls['code'];
          const name = this.currencyForm.controls['name'];
          const symbol = this.currencyForm.controls['symbol'];
          const circulatingSupply = this.currencyForm.controls['circulatingSupply'];

          code.setValue(currencyResponse.code);
          name.setValue(currencyResponse.name);
          symbol.setValue(currencyResponse.symbol);
          circulatingSupply.setValue(currencyResponse.circulatingSupply);
          code.disable();
        })
      )
      .subscribe({
        error: () => {
          this.mode$.next('create');
        },
      });
  }

  public getCurrencyForm(
    formBuilder: FormBuilder,
    cryptoCurrencyResponse: CryptoCurrencyResponse
  ): FormGroup {
    return formBuilder.group({
      code: [cryptoCurrencyResponse.code, [Validators.required]],
      name: [cryptoCurrencyResponse.name, [Validators.required]],
      symbol: [cryptoCurrencyResponse.symbol, [Validators.required]],
      circulatingSupply: [
        cryptoCurrencyResponse.circulatingSupply,
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  public onSaveClicked(): void {
    const code = this.currencyForm.controls['code']?.value as string;
    const name = this.currencyForm.controls['name']?.value as string;
    const symbol = this.currencyForm.controls['symbol']?.value as string;
    const circulatingSupply = this.currencyForm.controls['circulatingSupply']?.value as number;

    const mode = this.mode$.getValue();

    if (mode === 'create') {
      this._administrationService
        .addNewCryptoCurrency({
          code,
          name,
          symbol,
          circulatingSupply,
        })
        .pipe(
          finalize(() => {
            this.currencyForm.reset();
            this.currencyForm.markAsUntouched();
          }),
          tap(async () => {
            this._alertService.showMessage('Currency Added');
            await this._router.navigate([this.manageCurrenciesUrl]);
          })
        )
        .subscribe();

      return;
    }

    this._administrationService
      .updateCryptoCurrency(code, {
        name,
        symbol,
        circulatingSupply,
      })
      .pipe(
        tap(async () => {
          this._alertService.showMessage('Currency Updated');
          await this._router.navigate([this.manageCurrenciesUrl]);
        })
      )
      .subscribe();
  }
}

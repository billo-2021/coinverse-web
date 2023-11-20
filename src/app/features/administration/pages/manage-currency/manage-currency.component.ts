import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { CryptoCurrencyResponse } from '../../../../common/domain-models';
import { AdministrationService } from '../../../../common/domain-services';
import { AlertService } from '../../../../core/services';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

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
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(Router) private readonly router: Router,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(LookupService) private readonly lookupService: LookupService,
    @Inject(AdministrationService)
    private readonly administrationService: AdministrationService,
    @Inject(AlertService) private readonly alertService: AlertService
  ) {
    this.currencyForm = this.getCurrencyForm(formBuilder, {
      id: 0,
      code: '',
      name: '',
      symbol: '',
      circulatingSupply: NaN,
    });

    this.currencyCode$ = route.params.pipe(
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
          return this.lookupService.getCryptoCurrencyByCurrencyCode(currencyCode);
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
      this.administrationService
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
            this.alertService.showMessage('Currency Added');
            await this.router.navigate([this.manageCurrenciesUrl]);
          })
        )
        .subscribe();

      return;
    }

    this.administrationService
      .updateCryptoCurrency(code, {
        name,
        symbol,
        circulatingSupply,
      })
      .pipe(
        tap(async () => {
          this.alertService.showMessage('Currency Updated');
          await this.router.navigate([this.manageCurrenciesUrl]);
        })
      )
      .subscribe();
  }
}

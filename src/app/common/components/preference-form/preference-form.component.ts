import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

import { ListOption } from '../../../form-components';
import { LookupService } from '../../domain-services';
import { NotificationMethodsForm, PreferenceForm } from '../../models';
import { PreferenceFormService } from '../../services';
import { CurrencyResponse } from '../../domain-models/lookup';

@Component({
  selector: 'app-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.scss'],
})
export class PreferenceFormComponent {
  @Input() public saveText = '';
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly form: FormGroup<PreferenceForm>;
  protected readonly currencyOptions$: Observable<ListOption<CurrencyResponse>[]>;

  public constructor(
    @SkipSelf() private readonly _preferenceForm$: PreferenceFormService,
    private readonly lookupService: LookupService
  ) {
    this.form = _preferenceForm$.value;

    this.currencyOptions$ = lookupService.getAllCurrencies().pipe(
      map((currencyResponse) =>
        currencyResponse.map((currency) => ({
          code: currency.code,
          name: currency.name,
          avatar: currency.code,
          value: currency,
        }))
      ),
      tap((currencyOptions) => {
        if (currencyOptions.length) {
          this.form.controls.currency.setValue(currencyOptions[0]);
        }
      })
    );
  }

  protected get notificationMethodsFormGroup(): FormGroup<NotificationMethodsForm> {
    return this.form.controls.notificationMethods;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

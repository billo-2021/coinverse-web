import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ListOption } from '../../../form-components';
import { CurrencyPairResponse, CurrencyResponse } from '../../../common/domain-models/lookup';

import { TradeForm } from '../models/trade-form.model';

@Injectable({
  providedIn: 'root',
})
export class TradeFormService extends BehaviorSubject<FormGroup<TradeForm>> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        currencyPair: _formBuilder.control<ListOption<CurrencyPairResponse> | null>(null, {
          validators: [Validators.required],
        }),
        amountCurrency: _formBuilder.control<ListOption<CurrencyResponse> | null>(null, {
          validators: [Validators.required],
        }),
        amount: _formBuilder.control(0, {
          nonNullable: true,
          validators: [Validators.required, Validators.min(1)],
        }),
      })
    );
  }
}

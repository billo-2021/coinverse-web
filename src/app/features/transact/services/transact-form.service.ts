import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ListOption } from '../../../form-components';
import { WalletResponse } from '../../../common/domain-models/wallet';
import { CurrencyResponse, PaymentMethodResponse } from '../../../common/domain-models/lookup';

import { TransactForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TransactFormService extends BehaviorSubject<FormGroup<TransactForm>> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        paymentMethod: _formBuilder.control<ListOption<PaymentMethodResponse> | null>(null, {
          validators: [Validators.required],
        }),
        wallet: _formBuilder.control<ListOption<WalletResponse> | null>(null, {
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

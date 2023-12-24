import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { TransactBankDetailsForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TransactBankDetailsFormService extends BehaviorSubject<
  FormGroup<TransactBankDetailsForm>
> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        name: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        cardNumber: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        expiryDate: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        securityCode: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }
}

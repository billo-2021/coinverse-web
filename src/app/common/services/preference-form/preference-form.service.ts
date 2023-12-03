import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PreferenceForm } from '../../models';
import { BehaviorSubject } from 'rxjs';
import { ListOption } from '../../../form-components/types';
import { CurrencyResponse } from '../../domain-models';

@Injectable({
  providedIn: 'root',
})
export class PreferenceFormService extends BehaviorSubject<FormGroup<PreferenceForm>> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        currency: _formBuilder.control<ListOption<CurrencyResponse> | null>(null, [
          Validators.required,
        ]),
        notificationMethods: _formBuilder.group({
          sms: _formBuilder.control(false, {
            nonNullable: true,
            validators: [Validators.required],
          }),
          email: _formBuilder.control(true, {
            nonNullable: true,
            validators: [Validators.required],
          }),
        }),
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressForm } from '../../models';
import { BehaviorSubject } from 'rxjs';
import { ListOption } from '../../../form-components/types';
import { CountryResponse } from '../../domain-models';

@Injectable({
  providedIn: 'root',
})
export class AddressFormService extends BehaviorSubject<FormGroup<AddressForm>> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        addressLine: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        street: _formBuilder.control('', { nonNullable: true, validators: [Validators.required] }),
        country: _formBuilder.control<ListOption<CountryResponse> | null>(null, [
          Validators.required,
        ]),
        province: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        city: _formBuilder.control('', { nonNullable: true, validators: [Validators.required] }),
        postalCode: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }
}

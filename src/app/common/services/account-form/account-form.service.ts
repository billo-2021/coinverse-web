import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountForm } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AccountFormService extends BehaviorSubject<FormGroup<AccountForm>> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        username: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        password: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }
}

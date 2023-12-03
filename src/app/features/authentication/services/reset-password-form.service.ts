import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordFormService extends BehaviorSubject<FormGroup<ResetPasswordForm>> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        password: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordRequestForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordRequestFormService extends BehaviorSubject<
  FormGroup<ResetPasswordRequestForm>
> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        username: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
      })
    );
  }
}

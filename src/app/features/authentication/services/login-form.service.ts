import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService extends BehaviorSubject<FormGroup<LoginForm>> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(
      _formBuilder.group({
        username: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        password: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        rememberMe: _formBuilder.control(false, {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }
}

import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpForm } from '../models';
import { otpLengthToken } from '../../../core/config';

@Injectable({
  providedIn: 'root',
})
export class OtpFormService extends BehaviorSubject<FormGroup<OtpForm>> {
  constructor(
    @Inject(otpLengthToken) private readonly _otpLengthToken: number,
    private readonly _formBuilder: FormBuilder
  ) {
    super(
      _formBuilder.group({
        otp: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(_otpLengthToken)],
        }),
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonalInformationForm } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationFormService extends BehaviorSubject<
  FormGroup<PersonalInformationForm>
> {
  constructor(private _formBuilder: FormBuilder) {
    super(
      _formBuilder.group<PersonalInformationForm>({
        firstName: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        lastName: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        emailAddress: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        phoneNumber: _formBuilder.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
    );
  }
}

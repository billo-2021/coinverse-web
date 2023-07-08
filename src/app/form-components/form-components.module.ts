import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {TuiButtonModule} from "@taiga-ui/core";

import {UiComponentsModule} from "../ui-components/ui-components.module";

import {TextFieldComponent} from './components/text-field/text-field.component';
import {FormFieldComponent} from './components/form-field/form-field.component';
import {MatInputModule} from '@angular/material/input';
import {FormComponent} from './components/form/form.component';
import {PasswordFieldComponent} from './components/password-field/password-field.component';


@NgModule({
  declarations: [
    FormFieldComponent,
    TextFieldComponent,
    FormComponent,
    PasswordFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UiComponentsModule,
    TuiButtonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormFieldComponent,
    FormComponent,
    TextFieldComponent,
    PasswordFieldComponent,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FormComponentsModule {
}

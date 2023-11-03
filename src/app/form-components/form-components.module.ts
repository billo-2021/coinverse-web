import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {
  TuiAvatarModule,
  TuiCheckboxLabeledModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFilterByInputPipeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule
} from "@taiga-ui/kit";
import {
  TuiDataListModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiLabelModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";

import {
  TuiInputCardGroupedModule,
  TuiInputCardModule,
  TuiInputCVCModule,
  TuiInputExpireModule
} from "@taiga-ui/addon-commerce";

import {UiComponentsModule} from "../ui-components/ui-components.module";
import {NgOtpInputModule} from "ng-otp-input";
import {TextFieldComponent} from './components/text-field/text-field.component';
import {FormFieldComponent} from './components/form-field/form-field.component';
import {FormComponent} from './components/form/form.component';
import {PasswordFieldComponent} from './components/password-field/password-field.component';
import {PhoneNumberFieldComponent} from './components/phone-number-field/phone-number-field.component';
import {ComboBoxComponent} from './components/combo-box/combo-box.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {TuiLetModule} from "@taiga-ui/cdk";
import {CheckBoxComponent} from './components/check-box/check-box.component';
import {LabelComponent} from './components/label/label.component';
import {OtpInputComponent} from './components/otp-input/otp-input.component';
import {InputNumberComponent} from "./components/input-number/input-number.component";
import {InputCardComponent} from './components/input-card/input-card.component';
import {InputCardGroupedComponent} from './components/input-card-grouped/input-card-grouped.component';

@NgModule({
  declarations: [
    FormFieldComponent,
    TextFieldComponent,
    FormComponent,
    PasswordFieldComponent,
    PhoneNumberFieldComponent,
    ComboBoxComponent,
    CheckBoxComponent,
    LabelComponent,
    OtpInputComponent,
    InputNumberComponent,
    InputCardComponent,
    InputCardGroupedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    UiComponentsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiInputPhoneModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    CdkVirtualScrollViewport,
    TuiScrollbarModule,
    TuiLetModule,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    TuiFilterByInputPipeModule,
    TuiCheckboxLabeledModule,
    TuiLabelModule,
    TuiAvatarModule,
    TuiGroupModule,
    TuiInputNumberModule,
    NgOtpInputModule,
    TuiInputCardModule,
    TuiInputCardGroupedModule,
    TuiInputExpireModule,
    TuiInputCVCModule
  ],
  exports: [
    ReactiveFormsModule,
    FormFieldComponent,
    FormComponent,
    TextFieldComponent,
    PasswordFieldComponent,
    PhoneNumberFieldComponent,
    ComboBoxComponent,
    CheckBoxComponent,
    LabelComponent,
    OtpInputComponent,
    InputNumberComponent,
    InputCardGroupedComponent,
    InputCardComponent
  ]
})
export class FormComponentsModule {
}

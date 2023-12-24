import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';

import {
  TuiDataListModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiLabelModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';

import { TuiLetModule } from '@taiga-ui/cdk';

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
  TuiInputPhoneModule,
} from '@taiga-ui/kit';

import {
  TuiInputCardGroupedModule,
  TuiInputCardModule,
  TuiInputCVCModule,
  TuiInputExpireModule,
} from '@taiga-ui/addon-commerce';

import { NgOtpInputModule } from 'ng-otp-input';

import { UiComponentsModule } from '../ui-components/ui-components.module';

import {
  CheckBoxComponent,
  ComboBoxComponent,
  FormComponent,
  InputCardComponent,
  InputCardGroupedComponent,
  InputNumberComponent,
  LabelComponent,
  OtpInputComponent,
  PasswordFieldComponent,
  PhoneNumberFieldComponent,
  TextFieldComponent,
} from './components';

@NgModule({
  declarations: [
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
    InputCardGroupedComponent,
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
    TuiInputCVCModule,
  ],
  exports: [
    ReactiveFormsModule,
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
    InputCardComponent,
  ],
})
export class FormComponentsModule {}

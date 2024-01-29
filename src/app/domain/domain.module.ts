import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsModule } from '../ui-components';
import { FormComponentsModule } from '../form-components';
import {
  AccountFormComponent,
  AddressFormComponent,
  PersonalInformationFormComponent,
  PreferenceFormComponent,
  UserFormComponent,
} from './components';

@NgModule({
  declarations: [
    AccountFormComponent,
    AddressFormComponent,
    PersonalInformationFormComponent,
    PreferenceFormComponent,
    UserFormComponent,
  ],
  imports: [CommonModule, UiComponentsModule, FormComponentsModule],
  exports: [
    AccountFormComponent,
    AddressFormComponent,
    PersonalInformationFormComponent,
    PreferenceFormComponent,
    UserFormComponent,
  ],
})
export class DomainModule {}

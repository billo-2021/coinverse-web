import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsModule } from '../ui-components';
import { FormComponentsModule } from '../form-components';

import { UserFormBaseDirective } from './directives';
import {
  AccountFormComponent,
  AddressFormComponent,
  PersonalInformationFormComponent,
  PreferenceFormComponent,
} from './components';

@NgModule({
  declarations: [
    UserFormBaseDirective,
    AccountFormComponent,
    AddressFormComponent,
    PersonalInformationFormComponent,
    PreferenceFormComponent,
  ],
  imports: [CommonModule, UiComponentsModule, FormComponentsModule],
  exports: [
    UserFormBaseDirective,
    AccountFormComponent,
    AddressFormComponent,
    PersonalInformationFormComponent,
    PreferenceFormComponent,
  ],
})
export class DomainModule {}

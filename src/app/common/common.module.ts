import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';

import { UiComponentsModule } from '../ui-components/ui-components.module';
import { FormComponentsModule } from '../form-components/form-components.module';

import { UserFormBaseDirective } from './directives';
import {
  AccountFormComponent,
  AddressFormComponent,
  PersonalInformationFormComponent,
  PreferenceFormComponent,
} from './components';
import { MaskEmailPipe } from './pipes';

@NgModule({
  declarations: [
    UserFormBaseDirective,
    PersonalInformationFormComponent,
    AddressFormComponent,
    PreferenceFormComponent,
    AccountFormComponent,
    MaskEmailPipe,
  ],
  imports: [ngCommonModule, UiComponentsModule, FormComponentsModule],
  providers: [],
  exports: [
    UserFormBaseDirective,
    PersonalInformationFormComponent,
    AddressFormComponent,
    PreferenceFormComponent,
    AccountFormComponent,
    MaskEmailPipe,
  ],
})
export class CommonModule {}

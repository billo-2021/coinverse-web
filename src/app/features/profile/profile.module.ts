import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';

import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { FormComponentsModule } from '../../form-components/form-components.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { PreferenceDetailsFormComponent } from './components/preference-details-form/preference-details-form.component';
import { ChangePasswordFormComponent } from './components/change-password-form/change-password-form.component';
import { AddressDetailsFormComponent } from './components/address-details-form/address-details-form.component';
import { AccountActivityComponent } from './components/account-activity/account-activity.component';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';

@NgModule({
  declarations: [
    ManageProfileComponent,
    ProfileFormComponent,
    PreferenceDetailsFormComponent,
    ChangePasswordFormComponent,
    AddressDetailsFormComponent,
    AccountActivityComponent,
  ],
  exports: [AddressDetailsFormComponent],
  imports: [
    ngCommonModule,
    UiComponentsModule,
    FormComponentsModule,
    ProfileRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
  ],
})
export class ProfileModule {}

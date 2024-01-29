import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';
import { TuiLoaderModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { UiComponentsModule } from '../../ui-components';
import { FormComponentsModule } from '../../form-components';
import { ProfileRoutingModule } from './profile-routing.module';
import {
  AccountActivityComponent,
  AddressDetailsFormComponent,
  ChangePasswordFormComponent,
  PreferenceDetailsFormComponent,
  ProfileFormComponent,
} from './components';
import { ManageProfilePage } from './pages';

@NgModule({
  declarations: [
    ManageProfilePage,
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
    TuiScrollbarModule,
  ],
})
export class ProfileModule {}

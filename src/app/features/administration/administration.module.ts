import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { UsersComponent } from './components/users/users.component';
import { ManageCurrenciesComponent } from './pages/manage-currencies/manage-currencies.component';
import { EditCurrencyComponent } from './components/edit-currency/edit-currency.component';
import { CreateCurrencyComponent } from './components/create-currency/create-currency.component';
import { ManageCurrencyComponent } from './pages/manage-currency/manage-currency.component';
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { FormComponentsModule } from '../../form-components/form-components.module';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { PersonalInformationFormComponent } from './components/personal-information-form/personal-information-form.component';
import { AddressDetailsFormComponent } from './components/address-details-form/address-details-form.component';
import { PreferenceDetailsFormComponent } from './components/preference-details-form/preference-details-form.component';
import { AccountDetailsFormComponent } from './components/account-details-form/account-details-form.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CryptoCurrenciesComponent } from './components/crypto-currencies/crypto-currencies.component';
import { FiatCurrenciesComponent } from './components/fiat-currencies/fiat-currencies.component';

@NgModule({
  declarations: [
    ManageUsersComponent,
    UsersComponent,
    ManageCurrenciesComponent,
    EditCurrencyComponent,
    CreateCurrencyComponent,
    ManageCurrencyComponent,
    CurrencyFormComponent,
    ManageUserComponent,
    PersonalInformationFormComponent,
    AddressDetailsFormComponent,
    PreferenceDetailsFormComponent,
    AccountDetailsFormComponent,
    UserDetailsComponent,
    CryptoCurrenciesComponent,
    FiatCurrenciesComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
    UiComponentsModule,
    FormComponentsModule,
  ],
})
export class AdministrationModule {}

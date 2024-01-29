import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { UiComponentsModule } from '../../ui-components';
import { FormComponentsModule } from '../../form-components';
import { DomainModule } from '../../domain';
import { AdministrationRoutingModule } from './administration-routing.module';
import {
  CryptoCurrenciesComponent,
  CurrencyFormComponent,
  FiatCurrenciesComponent,
  UsersComponent,
} from './components';
import {
  ManageCurrenciesPage,
  ManageCurrencyPage,
  ManageUserPage,
  ManageUsersPage,
  UserDetailsPage,
} from './pages';

@NgModule({
  declarations: [
    ManageUsersPage,
    UsersComponent,
    ManageCurrenciesPage,
    ManageCurrencyPage,
    CurrencyFormComponent,
    ManageUserPage,
    UserDetailsPage,
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
    DomainModule,
  ],
})
export class AdministrationModule {}

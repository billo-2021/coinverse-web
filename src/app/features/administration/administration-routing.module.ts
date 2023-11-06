import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageCurrenciesComponent } from './pages/manage-currencies/manage-currencies.component';
import { ManageCurrencyComponent } from './pages/manage-currency/manage-currency.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';

const routes: Routes = [
  { path: 'users', component: ManageUsersComponent },
  { path: 'users/new-user', component: ManageUserComponent },
  { path: 'users/:username', component: UserDetailsComponent },
  { path: 'currencies', component: ManageCurrenciesComponent },
  { path: 'currencies/new-currency', component: ManageCurrencyComponent },
  { path: 'currencies/:currencyCode', component: ManageCurrencyComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageCurrenciesComponent } from './pages/manage-currencies/manage-currencies.component';
import { ManageCurrencyComponent } from './pages/manage-currency/manage-currency.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { pagesConfig } from "./config";

const routes: Routes = [
  {path: pagesConfig.users.path, component: ManageUsersComponent, title: pagesConfig.users.title},
  {path: pagesConfig.user.path, component: ManageUserComponent, title: pagesConfig.user.title},
  {path: pagesConfig.userDetails.path, component: UserDetailsComponent, title: pagesConfig.userDetails.title},
  {
    path: pagesConfig.currencies.path,
    component: ManageCurrenciesComponent,
    title: pagesConfig.currencies.title
  },
  {path: pagesConfig.currency.path, component: ManageCurrencyComponent, title: pagesConfig.currency.title},
  {
    path: pagesConfig.currencyDetails.path,
    component: ManageCurrencyComponent,
    title: pagesConfig.currencyDetails.title
  },
  {path: '**', redirectTo: pagesConfig.users.path},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {
}

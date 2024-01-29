import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pagesConfig } from './config';
import {
  ManageCurrenciesPage,
  ManageCurrencyPage,
  ManageUserPage,
  ManageUsersPage,
  UserDetailsPage,
} from './pages';

const ROUTES: Routes = [
  { path: pagesConfig.users.path, component: ManageUsersPage, title: pagesConfig.users.title },
  { path: pagesConfig.user.path, component: ManageUserPage, title: pagesConfig.user.title },
  {
    path: pagesConfig.userDetails.path,
    component: UserDetailsPage,
    title: pagesConfig.userDetails.title,
  },
  {
    path: pagesConfig.currencies.path,
    component: ManageCurrenciesPage,
    title: pagesConfig.currencies.title,
  },
  {
    path: pagesConfig.currency.path,
    component: ManageCurrencyPage,
    title: pagesConfig.currency.title,
  },
  {
    path: pagesConfig.currencyDetails.path,
    component: ManageCurrencyPage,
    title: pagesConfig.currencyDetails.title,
  },
  { path: '**', redirectTo: pagesConfig.users.path },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}

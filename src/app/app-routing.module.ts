import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  adminRoleGuard,
  isAuthenticatedGuard,
  unAuthenticatedGuard,
  webRoutesConfig,
} from './common';
import { GlobalRoutingPage } from './global-routing/pages';

const routes: Routes = [
  {
    path: webRoutesConfig.authentication,
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
    canActivate: [unAuthenticatedGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.dashboard,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then((module) => module.DashboardModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.dashboard)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.wallets,
    loadChildren: () =>
      import('./features/wallets/wallets.module').then((module) => module.WalletsModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.wallets)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.transact,
    loadChildren: () =>
      import('./features/transact/transact.module').then((module) => module.TransactModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.transact)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.trade,
    loadChildren: () =>
      import('./features/trade/trade.module').then((module) => module.TradeModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.trade)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.profile,
    loadChildren: () =>
      import('./features/profile/profile.module').then((module) => module.ProfileModule),
    canMatch: [() => isAuthenticatedGuard(webRoutesConfig.profile)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.administration,
    loadChildren: () =>
      import('./features/administration/administration.module').then(
        (module) => module.AdministrationModule
      ),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.administration), adminRoleGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.root,
    component: GlobalRoutingPage,
  },
  { path: '**', redirectTo: webRoutesConfig.root },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

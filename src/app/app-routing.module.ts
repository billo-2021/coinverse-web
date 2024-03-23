import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoleGuard, isAuthenticatedGuard, unAuthenticatedGuard, WebRoute } from './shared';
import { GlobalRoutingPage } from './global/pages';

const routes: Routes = [
  {
    path: WebRoute.AUTHENTICATION,
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
    canActivate: [unAuthenticatedGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: WebRoute.DASHBOARD,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then((module) => module.DashboardModule),
    canActivate: [() => isAuthenticatedGuard(WebRoute.DASHBOARD)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: WebRoute.WALLETS,
    loadChildren: () =>
      import('./features/wallets/wallets.module').then((module) => module.WalletsModule),
    canActivate: [() => isAuthenticatedGuard(WebRoute.WALLETS)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: WebRoute.TRANSACT,
    loadChildren: () =>
      import('./features/transact/transact.module').then((module) => module.TransactModule),
    canActivate: [() => isAuthenticatedGuard(WebRoute.TRANSACT)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: WebRoute.TRADE,
    loadChildren: () =>
      import('./features/trade/trade.module').then((module) => module.TradeModule),
    canActivate: [() => isAuthenticatedGuard(WebRoute.TRADE)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: WebRoute.PROFILE,
    loadChildren: () =>
      import('./features/profile/profile.module').then((module) => module.ProfileModule),
    canMatch: [() => isAuthenticatedGuard(WebRoute.PROFILE)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: WebRoute.ADMINISTRATION,
    loadChildren: () =>
      import('./features/administration/administration.module').then(
        (module) => module.AdministrationModule
      ),
    canActivate: [() => isAuthenticatedGuard(WebRoute.ADMINISTRATION), adminRoleGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: WebRoute.ROOT,
    component: GlobalRoutingPage,
  },
  { path: '**', redirectTo: WebRoute.ROOT },
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

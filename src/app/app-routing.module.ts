import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoleGuard } from './common/guards/role/role.guard';
import { GlobalRoutingComponent } from './global-routing/pages/global-routing/global-routing.component';
import { webRoutesConfig } from './common/config/web-routes-config';
import { isAuthenticatedGuard, unAuthenticatedGuard } from './common/guards/auth/auth.guard';

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
    component: GlobalRoutingComponent,
  },
  { path: '**', redirectTo: webRoutesConfig.root },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

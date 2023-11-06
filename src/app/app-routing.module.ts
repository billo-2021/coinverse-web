import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminRoleGuard } from './common/guards/role-guard/role.guard';
import { GlobalRoutingComponent } from './global-routing/pages/global-routing/global-routing.component';
import { webRoutesConfig } from './common/config/web-routes-config';
import { isAuthenticatedGuard, unAuthenticatedGuard } from './common/guards/logged-in/auth.guard';

const routes: Routes = [
  {
    path: webRoutesConfig.authentication.root,
    loadChildren: () =>
      import('./features/authentication/authentication.module').then((module) => module.AuthenticationModule),
    canActivate: [unAuthenticatedGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.dashboard.root,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then((module) => module.DashboardModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.dashboard.root)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.wallets,
    loadChildren: () => import('./features/wallets/wallets.module').then((module) => module.WalletsModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.wallets)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.transact.root,
    loadChildren: () => import('./features/transact/transact.module').then((module) => module.TransactModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.transact.root)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.trade.root,
    loadChildren: () => import('./features/trade/trade.module').then((module) => module.TradeModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.trade.root)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.profile.root,
    loadChildren: () => import('./features/profile/profile.module').then((module) => module.ProfileModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.profile.root)],
    runGuardsAndResolvers: 'always',
  },
  {
    path: webRoutesConfig.administration.root,
    loadChildren: () =>
      import('./features/administration/administration.module').then((module) => module.AdministrationModule),
    canActivate: [() => isAuthenticatedGuard(webRoutesConfig.administration.root), adminRoleGuard],
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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authenticationGuard} from "./common/guards/authentication/authentication.guard";
import {roleGuardGuard} from "./common/guards/role-guard/role-guard.guard";
import {loggedInGuard} from "./common/guards/logged-in/logged-in.guard";

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () => import('./features/authentication/authentication.module')
      .then((module) => module.AuthenticationModule),
    canActivate: [loggedInGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then((module) => module.DashboardModule),
    canActivate: [authenticationGuard],
  },
  {
    path: 'wallets',
    loadChildren: () => import('./features/wallets/wallets.module')
      .then((module) => module.WalletsModule),
    canActivate: [authenticationGuard]
  },
  {
    path: 'transact',
    loadChildren: () => import('./features/transact/transact.module')
      .then((module) => module.TransactModule),
    canActivate: [authenticationGuard]
  },
  {
    path: 'trade',
    loadChildren: () => import('./features/trade/trade.module')
      .then((module) => module.TradeModule),
    canActivate: [authenticationGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module')
      .then((module) => module.ProfileModule),
    canActivate: [authenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'administration',
    loadChildren: () => import('./features/administration/administration.module')
      .then((module) => module.AdministrationModule),
    canActivate: [authenticationGuard, roleGuardGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '',
    loadChildren: () => import('./global-routing/global-routing-routing.module')
      .then((module) => module.GlobalRoutingRoutingModule),
    pathMatch: 'full',
  },
  {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

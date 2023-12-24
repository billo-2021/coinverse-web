import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { pagesConfig } from './config';
import { ManageWalletsPage, WalletDetailsPage } from './pages';

const routes: Routes = [
  {
    path: pagesConfig.manageWallets.path,
    component: ManageWalletsPage,
    title: pagesConfig.manageWallets.title,
  },
  {
    path: pagesConfig.walletDetails.path,
    component: WalletDetailsPage,
    title: pagesConfig.walletDetails.title,
  },
  { path: '**', redirectTo: pagesConfig.manageWallets.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsRoutingModule {}

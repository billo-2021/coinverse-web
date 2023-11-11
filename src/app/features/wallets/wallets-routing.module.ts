import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageWalletsComponent } from './pages/manage-wallets/manage-wallets.component';
import { WalletDetailsComponent } from './pages/wallet-details/wallet-details.component';
import { pagesConfig } from "./config";

const routes: Routes = [
  {
    path: pagesConfig.manageWallets.path,
    component: ManageWalletsComponent,
    title: pagesConfig.manageWallets.title
  },
  {
    path: pagesConfig.walletDetails.path,
    component: WalletDetailsComponent,
    title: pagesConfig.walletDetails.title
  },
  {path: '**', redirectTo: pagesConfig.manageWallets.path},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletsRoutingModule {
}

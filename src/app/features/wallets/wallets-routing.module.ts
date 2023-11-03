import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageWalletsComponent} from "./pages/manage-wallets/manage-wallets.component";
import {WalletDetailsComponent} from "./pages/wallet-details/wallet-details.component";

const routes: Routes = [
  {path: '', component: ManageWalletsComponent},
  {path: ':walletId', component: WalletDetailsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletsRoutingModule {
}

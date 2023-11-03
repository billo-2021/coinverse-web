import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WalletsRoutingModule} from './wallets-routing.module';
import {ManageWalletsComponent} from './pages/manage-wallets/manage-wallets.component';
import {WalletDetailsComponent} from './pages/wallet-details/wallet-details.component';
import {WalletsComponent} from './components/wallets/wallets.component';
import {WalletComponent} from './components/wallet/wallet.component';
import {TuiLoaderModule} from "@taiga-ui/core";
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table";
import {UiComponentsModule} from "../../ui-components/ui-components.module";


@NgModule({
  declarations: [
    ManageWalletsComponent,
    WalletDetailsComponent,
    WalletsComponent,
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletsRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
    UiComponentsModule
  ]
})
export class WalletsModule {
}

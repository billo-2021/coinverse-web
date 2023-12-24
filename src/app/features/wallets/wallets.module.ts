import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';

import { UiComponentsModule } from '../../ui-components';

import { WalletsRoutingModule } from './wallets-routing.module';

import { WalletComponent, WalletsComponent } from './components';
import { ManageWalletsPage, WalletDetailsPage } from './pages';

@NgModule({
  declarations: [ManageWalletsPage, WalletDetailsPage, WalletsComponent, WalletComponent],
  imports: [
    CommonModule,
    WalletsRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
    UiComponentsModule,
  ],
})
export class WalletsModule {}

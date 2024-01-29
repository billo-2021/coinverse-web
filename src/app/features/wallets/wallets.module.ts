import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { UiComponentsModule } from '../../ui-components';
import { WalletComponent, WalletsComponent } from './components';
import { ManageWalletsPage, WalletDetailsPage } from './pages';
import { WalletsRoutingModule } from './wallets-routing.module';

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

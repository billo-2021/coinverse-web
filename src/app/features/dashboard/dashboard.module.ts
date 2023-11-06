import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';

import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BalanceHistoryComponent } from './components/balance-history/balance-history.component';
import { MarketsComponent } from './components/markets/markets.component';
import { TuiLoaderModule, TuiModeModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';

@NgModule({
  declarations: [DashboardComponent, BalanceHistoryComponent, MarketsComponent],
  imports: [
    ngCommonModule,
    DashboardRoutingModule,
    UiComponentsModule,
    TuiModeModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
  ],
})
export class DashboardModule {}

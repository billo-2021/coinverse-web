import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';
import { TuiLoaderModule, TuiModeModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { UiComponentsModule } from '../../ui-components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BalanceHistoryComponent, MarketsComponent } from './components';
import { DashboardPage } from './pages';

@NgModule({
  declarations: [DashboardPage, BalanceHistoryComponent, MarketsComponent],
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

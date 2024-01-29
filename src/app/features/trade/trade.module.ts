import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { UiComponentsModule } from '../../ui-components';
import { FormComponentsModule } from '../../form-components';
import { TradeRoutingModule } from './trade-routing.module';
import {
  TradeConfirmationComponent,
  TradeFormComponent,
  TradeQuoteComponent,
  TradeResultComponent,
  TradesComponent,
} from './components';
import { ManageTradesPage, TradePage } from './pages';

@NgModule({
  declarations: [
    ManageTradesPage,
    TradePage,
    TradesComponent,
    TradeFormComponent,
    TradeQuoteComponent,
    TradeResultComponent,
    TradeConfirmationComponent,
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
    UiComponentsModule,
    FormComponentsModule,
  ],
})
export class TradeModule {}

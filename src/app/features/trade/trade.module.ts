import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TradeRoutingModule} from './trade-routing.module';
import {ManageTradesComponent} from './pages/manage-trades/manage-trades.component';
import {TradeComponent} from './pages/trade/trade.component';
import {TradesComponent} from './components/trades/trades.component';
import {TradeFormComponent} from './components/trade-form/trade-form.component';
import {TradeQuoteComponent} from './components/trade-quote/trade-quote.component';
import {TradeResultComponent} from './components/trade-result/trade-result.component';
import {TuiLoaderModule} from "@taiga-ui/core";
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table";
import {UiComponentsModule} from "../../ui-components/ui-components.module";
import {FormComponentsModule} from "../../form-components/form-components.module";
import { TradeConfirmationComponent } from './components/trade-confirmation/trade-confirmation.component';


@NgModule({
  declarations: [
    ManageTradesComponent,
    TradeComponent,
    TradesComponent,
    TradeFormComponent,
    TradeQuoteComponent,
    TradeResultComponent,
    TradeConfirmationComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
    UiComponentsModule,
    FormComponentsModule
  ]
})
export class TradeModule {
}

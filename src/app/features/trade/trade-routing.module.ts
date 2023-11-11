import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTradesComponent } from './pages/manage-trades/manage-trades.component';
import { TradeComponent } from './pages/trade/trade.component';
import { pagesConfig } from "./config";

const routes: Routes = [
  {path: pagesConfig.trade.path, component: TradeComponent, title: pagesConfig.trade.title},
  {
    path: pagesConfig.manageTrades.path,
    component: ManageTradesComponent,
    title: pagesConfig.manageTrades.title
  },
  {path: '**', redirectTo: pagesConfig.trade.path},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeRoutingModule {
}

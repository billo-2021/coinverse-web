import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageTradesComponent} from "./pages/manage-trades/manage-trades.component";
import {TradeComponent} from "./pages/trade/trade.component";

const routes: Routes = [
  {path: '', component: TradeComponent},
  {path: 'manage-trades', component: ManageTradesComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule {
}

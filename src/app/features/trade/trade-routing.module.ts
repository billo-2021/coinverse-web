import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pagesConfig } from './config';
import { ManageTradesPage, TradePage } from './pages';

const ROUTES: Routes = [
  { path: pagesConfig.trade.path, component: TradePage, title: pagesConfig.trade.title },
  {
    path: pagesConfig.manageTrades.path,
    component: ManageTradesPage,
    title: pagesConfig.manageTrades.title,
  },
  { path: '**', redirectTo: pagesConfig.trade.path },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class TradeRoutingModule {}

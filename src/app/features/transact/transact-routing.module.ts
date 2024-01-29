import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pagesConfig } from './config';
import { ManageTransactionsPage, TransactPage } from './pages';

const ROUTES: Routes = [
  {
    path: pagesConfig.transact.path,
    component: TransactPage,
    title: pagesConfig.transact.title,
  },
  {
    path: pagesConfig.manageTransactions.path,
    component: ManageTransactionsPage,
    title: pagesConfig.manageTransactions.title,
  },
  { path: '**', redirectTo: pagesConfig.transact.path },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class TransactRoutingModule {}

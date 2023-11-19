import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTransactionsComponent } from './pages/manage-transactions/manage-transactions.component';
import { TransactComponent } from './pages/transact/transact.component';
import { pagesConfig } from './config';

const routes: Routes = [
  { path: pagesConfig.transact.path, component: TransactComponent, title: pagesConfig.transact.title },
  {
    path: pagesConfig.manageTransactions.path,
    component: ManageTransactionsComponent,
    title: pagesConfig.manageTransactions.title,
  },
  { path: '**', redirectTo: pagesConfig.transact.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactRoutingModule {}

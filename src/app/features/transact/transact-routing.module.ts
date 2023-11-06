import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTransactionsComponent } from './pages/manage-transactions/manage-transactions.component';
import { TransactComponent } from './pages/transact/transact.component';

const routes: Routes = [
  { path: '', component: TransactComponent },
  { path: 'manage-transactions', component: ManageTransactionsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactRoutingModule {}

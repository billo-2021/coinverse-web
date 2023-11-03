import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransactRoutingModule} from './transact-routing.module';
import {ManageTransactionsComponent} from './pages/manage-transactions/manage-transactions.component';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {TransactComponent} from './pages/transact/transact.component';
import {TransactFormComponent} from './components/transact-form/transact-form.component';
import {TransactQuoteComponent} from './components/transact-quote/transact-quote.component';
import {TransactResultComponent} from './components/transact-result/transact-result.component';
import {TuiLoaderModule} from "@taiga-ui/core";
import {TuiTableModule, TuiTablePaginationModule} from "@taiga-ui/addon-table";
import {UiComponentsModule} from "../../ui-components/ui-components.module";
import {ExchangeRateComponent} from './components/exchange-rate/exchange-rate.component';
import {TransactConfirmationComponent} from './components/transact-confirmation/transact-confirmation.component';
import {TransactExchangeRateComponent} from './components/transact-exchange-rate/transact-exchange-rate.component';
import {
  TransactBankDetailsFormComponent
} from './components/transact-bank-details-form/transact-bank-details-form.component';
import {FormComponentsModule} from "../../form-components/form-components.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ManageTransactionsComponent,
    TransactionsComponent,
    TransactComponent,
    TransactFormComponent,
    TransactQuoteComponent,
    TransactResultComponent,
    ExchangeRateComponent,
    TransactConfirmationComponent,
    TransactExchangeRateComponent,
    TransactBankDetailsFormComponent
  ],
  imports: [
    CommonModule,
    TransactRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
    UiComponentsModule,
    FormComponentsModule,
    FormsModule
  ]
})
export class TransactModule {
}

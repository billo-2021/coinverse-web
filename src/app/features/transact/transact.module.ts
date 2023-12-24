import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';

import { FormComponentsModule } from '../../form-components/form-components.module';
import { UiComponentsModule } from '../../ui-components';

import { TransactRoutingModule } from './transact-routing.module';

import {
  ExchangeRateComponent,
  TransactBankDetailsFormComponent,
  TransactConfirmationComponent,
  TransactExchangeRateComponent,
  TransactFormComponent,
  TransactionsComponent,
  TransactQuoteComponent,
  TransactResultComponent,
} from './components';

import { ManageTransactionsPage, TransactPage } from './pages';

@NgModule({
  declarations: [
    ManageTransactionsPage,
    TransactionsComponent,
    TransactPage,
    TransactFormComponent,
    TransactQuoteComponent,
    TransactResultComponent,
    ExchangeRateComponent,
    TransactConfirmationComponent,
    TransactExchangeRateComponent,
    TransactBankDetailsFormComponent,
  ],
  imports: [
    CommonModule,
    TransactRoutingModule,
    TuiLoaderModule,
    TuiTableModule,
    TuiTablePaginationModule,
    UiComponentsModule,
    FormComponentsModule,
    FormsModule,
  ],
})
export class TransactModule {}

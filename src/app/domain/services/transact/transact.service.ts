import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpCrudService, PageRequest, PageResponse } from '../../../core';

import { apiRoutesConfig } from '../../config';
import { PaymentDto, PaymentRequest, PaymentResponse } from '../../domain-models/transact';

@Injectable({
  providedIn: 'root',
})
export class TransactService {
  public readonly BASE_PATH = apiRoutesConfig.transact.root;
  public readonly TRANSACTIONS_PATH = apiRoutesConfig.transact.transactions;
  public readonly DEPOSIT_PATH = apiRoutesConfig.transact.deposit;
  public readonly WITHDRAW_PATH = apiRoutesConfig.transact.withdraw;

  constructor(private readonly _httpService: HttpCrudService) {}

  public getTransactions(pageRequest: PageRequest): Observable<PageResponse<PaymentResponse>> {
    const url = `${this.getFullPath(this.TRANSACTIONS_PATH)}?pageNumber=${
      pageRequest.page
    }&pageSize=${pageRequest.size}`;
    return this._httpService.find<PageResponse<PaymentDto>>(url);
  }

  public deposit(depositRequest: PaymentRequest): Observable<PaymentResponse> {
    const url = this.getFullPath(this.DEPOSIT_PATH);
    return this._httpService.create<PaymentRequest, PaymentResponse>(url, depositRequest);
  }

  public withdraw(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    const url = this.getFullPath(this.WITHDRAW_PATH);
    return this._httpService.create<PaymentRequest, PaymentResponse>(url, paymentRequest);
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

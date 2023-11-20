import { Inject, Injectable } from '@angular/core';
import { apiRoutesConfig } from '../../config';
import { HttpCrudService } from '../../../core/services';
import { Observable } from 'rxjs';
import { PageResponse } from '../../../core/types/crud';
import { PaymentResponse } from '../../domain-models/transact/payment-response';
import { PaymentDto } from '../../domain-models/transact/payment-dto';
import { PaymentRequest } from '../../domain-models/transact/payment-request';

interface PageRequest {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactService {
  public readonly BASE_PATH = apiRoutesConfig.transact.root;
  public readonly TRANSACTIONS_PATH = apiRoutesConfig.transact.transactions;
  public readonly DEPOSIT_PATH = apiRoutesConfig.transact.deposit;
  public readonly WITHDRAW_PATH = apiRoutesConfig.transact.withdraw;

  constructor(@Inject(HttpCrudService) private httpService: HttpCrudService) {}

  public getTransactions(pageRequest: PageRequest): Observable<PageResponse<PaymentResponse>> {
    const url = `${this.getFullPath(this.TRANSACTIONS_PATH)}?pageNumber=${
      pageRequest.page
    }&pageSize=${pageRequest.size}`;
    return this.httpService.find<PageResponse<PaymentDto>>(url);
  }

  public deposit(depositRequest: PaymentRequest): Observable<PaymentResponse> {
    const url = this.getFullPath(this.DEPOSIT_PATH);
    return this.httpService.create<PaymentRequest, PaymentResponse>(url, depositRequest);
  }

  public withdraw(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    const url = this.getFullPath(this.WITHDRAW_PATH);
    return this.httpService.create<PaymentRequest, PaymentResponse>(url, paymentRequest);
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient, ApiRoute, PageRequest, PageResponse } from '../../../shared';
import { Payment, PaymentDto, PaymentRequest } from '../../models';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class TransactService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getTransactions(pageRequest: PageRequest): Observable<PageResponse<Payment>> {
    return this._apiCrudClient.findMany<PaymentDto, Payment>(
      ApiRoute.TRANSACTIONS,
      pageRequest,
      MappingProfile.PaymentDtoPageToPaymentPage
    );
  }

  public deposit(depositRequest: PaymentRequest): Observable<Payment> {
    return this._apiCrudClient.create<PaymentRequest, PaymentDto, Payment>(
      ApiRoute.DEPOSIT,
      depositRequest,
      MappingProfile.PaymentDtoToPayment
    );
  }

  public withdraw(paymentRequest: PaymentRequest): Observable<Payment> {
    return this._apiCrudClient.create<PaymentRequest, PaymentDto, Payment>(
      ApiRoute.WITHDRAW,
      paymentRequest,
      MappingProfile.PaymentDtoToPayment
    );
  }
}

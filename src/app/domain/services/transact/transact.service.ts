import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectUtils, PageRequest, PageResponse } from '../../../core';
import { ApiCrudClient, apiRoutesConfig } from '../../../common';
import { MappingProfile } from '../../config';
import { Payment, PaymentDto, PaymentRequest } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TransactService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getTransactions(pageRequest: PageRequest): Observable<PageResponse<Payment>> {
    return this._apiCrudClient.findMany<PaymentDto, Payment>(
      ObjectUtils.nameof(apiRoutesConfig, 'transactions'),
      pageRequest,
      MappingProfile.PaymentDtoPageToPaymentPage
    );
  }

  public deposit(depositRequest: PaymentRequest): Observable<Payment> {
    return this._apiCrudClient.create<PaymentRequest, PaymentDto, Payment>(
      ObjectUtils.nameof(apiRoutesConfig, 'deposit'),
      depositRequest,
      MappingProfile.PaymentDtoToPayment
    );
  }

  public withdraw(paymentRequest: PaymentRequest): Observable<Payment> {
    return this._apiCrudClient.create<PaymentRequest, PaymentDto, Payment>(
      ObjectUtils.nameof(apiRoutesConfig, 'withdraw'),
      paymentRequest,
      MappingProfile.PaymentDtoToPayment
    );
  }
}

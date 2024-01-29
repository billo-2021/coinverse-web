import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest, PageResponse } from '../../../core';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import { CurrencyTransaction, CurrencyTransactionDto, TradeRequest } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getTrades(pageRequest: PageRequest): Observable<PageResponse<CurrencyTransaction>> {
    return this._apiCrudClient.findMany<CurrencyTransactionDto, CurrencyTransaction>(
      'trades',
      pageRequest,
      MappingProfile.CurrencyTransactionDtoPageToCurrencyTransactionPage
    );
  }

  public requestTrade(tradeRequest: TradeRequest): Observable<CurrencyTransaction> {
    return this._apiCrudClient.create<TradeRequest, CurrencyTransactionDto, CurrencyTransaction>(
      'trades',
      tradeRequest,
      MappingProfile.CurrencyTransactionDtoToCurrencyTransaction
    );
  }
}

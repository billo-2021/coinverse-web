import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient, ApiRoute, PageRequest, PageResponse } from '../../../shared';
import { CurrencyTransaction, CurrencyTransactionDto, TradeRequest } from '../../models';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getTrades(pageRequest: PageRequest): Observable<PageResponse<CurrencyTransaction>> {
    return this._apiCrudClient.findMany<CurrencyTransactionDto, CurrencyTransaction>(
      ApiRoute.TRADES,
      pageRequest,
      MappingProfile.CurrencyTransactionDtoPageToCurrencyTransactionPage
    );
  }

  public requestTrade(tradeRequest: TradeRequest): Observable<CurrencyTransaction> {
    return this._apiCrudClient.create<TradeRequest, CurrencyTransactionDto, CurrencyTransaction>(
      ApiRoute.TRADES,
      tradeRequest,
      MappingProfile.CurrencyTransactionDtoToCurrencyTransaction
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpCrudService, PageRequest, PageResponse } from '../../../core';

import { apiRoutesConfig } from '../../config';
import {
  CurrencyTransactionDto,
  CurrencyTransactionResponse,
  TradeRequest,
} from '../../domain-models/trade';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  public readonly BASE_PATH = apiRoutesConfig.trades.root;

  constructor(private readonly _httpService: HttpCrudService) {}

  public getTrades(
    pageRequest: PageRequest
  ): Observable<PageResponse<CurrencyTransactionResponse>> {
    const url = `${this.BASE_PATH}?pageNumber=${pageRequest.page}&pageSize=${pageRequest.size}`;
    return this._httpService.find<PageResponse<CurrencyTransactionDto>>(url);
  }

  public requestTrade(tradeRequest: TradeRequest): Observable<CurrencyTransactionResponse> {
    return this._httpService.create<TradeRequest, CurrencyTransactionDto>(
      this.BASE_PATH,
      tradeRequest
    );
  }
}

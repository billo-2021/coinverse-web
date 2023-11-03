import {Inject, Injectable} from '@angular/core';
import {PageResponse} from "../../../core/types/crud";
import {CurrencyTransactionResponse} from "../../domain-models/trade/currency-transaction-response";
import {Observable} from "rxjs";
import {apiRoutesConfig} from "../../config";
import {HttpCrudService} from "../../../core/services";
import {CurrencyTransactionDto} from "../../domain-models/trade/currency-transaction-dto";
import {TradeRequest} from "../../domain-models/trade/trade-request";

interface PageRequest {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  public readonly BASE_PATH = apiRoutesConfig.trades.root;

  constructor(@Inject(HttpCrudService) private httpService: HttpCrudService) {
  }

  public getTrades(pageRequest: PageRequest): Observable<PageResponse<CurrencyTransactionResponse>> {
    const url = `${this.BASE_PATH}?pageNumber=${pageRequest.page}&pageSize=${pageRequest.size}`;
    return this.httpService.find<PageResponse<CurrencyTransactionDto>>(url);
  }

  public requestTrade(tradeRequest: TradeRequest): Observable<CurrencyTransactionResponse> {
    return this.httpService.create<TradeRequest, CurrencyTransactionDto>(this.BASE_PATH, tradeRequest);
  }
}

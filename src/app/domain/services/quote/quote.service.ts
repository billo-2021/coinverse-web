import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { HttpCrudService } from '../../../core';

import { apiRoutesConfig } from '../../config';
import { currencyExchangeRateDtoToCurrencyExchangeRateResponse } from '../../mappers';
import { CurrencyExchangeRateDto, CurrencyExchangeRateResponse } from '../../domain-models/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  public readonly BASE_PATH = apiRoutesConfig.quotes.root;
  public readonly CURRENCY_PAIRS_PATH = apiRoutesConfig.quotes.currencyPairs;

  constructor(private readonly _httpService: HttpCrudService) {}

  public getCurrencyExchangeRateByCurrencyPairName(
    name: string
  ): Observable<CurrencyExchangeRateResponse> {
    const url = `${this.getFullPath(this.CURRENCY_PAIRS_PATH)}?name=${name}`;
    return this._httpService
      .find<CurrencyExchangeRateDto>(url)
      .pipe(map(currencyExchangeRateDtoToCurrencyExchangeRateResponse));
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

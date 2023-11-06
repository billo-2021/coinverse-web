import { Inject, Injectable } from '@angular/core';
import { HttpCrudService } from '../../../core/services';
import { apiRoutesConfig } from '../../config';
import { CurrencyExchangeRateDto, CurrencyExchangeRateResponse } from '../../domain-models/quote';
import { map, Observable } from 'rxjs';
import { currencyExchangeRateDtoToCurrencyExchangeRateResponse } from '../../mappers';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  public readonly BASE_PATH = apiRoutesConfig.quotes.root;
  public readonly CURRENCY_PAIRS_PATH = apiRoutesConfig.quotes.currencyPairs;

  constructor(@Inject(HttpCrudService) private httpService: HttpCrudService) {}

  public getCurrencyExchangeRateByCurrencyPairName(name: string): Observable<CurrencyExchangeRateResponse> {
    const url = `${this.getFullPath(this.CURRENCY_PAIRS_PATH)}?name=${name}`;
    return this.httpService
      .find<CurrencyExchangeRateDto>(url)
      .pipe(map(currencyExchangeRateDtoToCurrencyExchangeRateResponse));
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

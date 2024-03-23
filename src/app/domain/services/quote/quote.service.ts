import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient, ApiRoute } from '../../../shared';
import { CurrencyExchangeRate, CurrencyExchangeRateDto } from '../../models';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getCurrencyExchangeRateByCurrencyPairName(name: string): Observable<CurrencyExchangeRate> {
    return this._apiCrudClient.findOneBy<CurrencyExchangeRateDto, CurrencyExchangeRate>(
      ApiRoute.QUOTES_CURRENCY_PAIR,
      { name: name },
      MappingProfile.CurrencyExchangeRateDtoToCurrencyExchangeRate
    );
  }
}

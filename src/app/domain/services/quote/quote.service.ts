import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import { CurrencyExchangeRate, CurrencyExchangeRateDto } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getCurrencyExchangeRateByCurrencyPairName(name: string): Observable<CurrencyExchangeRate> {
    return this._apiCrudClient.findOneBy<CurrencyExchangeRateDto, CurrencyExchangeRate>(
      'quotesCurrencyPair',
      { name: name },
      MappingProfile.CurrencyExchangeRateDtoToCurrencyExchangeRate
    );
  }
}

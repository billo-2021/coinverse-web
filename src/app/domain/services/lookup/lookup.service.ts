import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageRequest, PageResponse } from '../../../core';
import { ApiCrudClient, apiMaxPageRequestToken } from '../../../common';
import { MappingProfile } from '../../config';
import {
  Country,
  CountryDto,
  CryptoCurrency,
  CryptoCurrencyDto,
  Currency,
  CurrencyDto,
  CurrencyPair,
  CurrencyPairDto,
  PaymentMethod,
  PaymentMethodDto,
  UserRole,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(
    private readonly _apiCrudClient: ApiCrudClient,
    @Inject(apiMaxPageRequestToken) private readonly _apiMaxPageRequestToken: PageRequest
  ) {}

  public getAllCountries(): Observable<Country[]> {
    return this._apiCrudClient.findAll<CountryDto, Country>(
      'allCountries',
      MappingProfile.CountryDtoToCountry
    );
  }

  public getCountries(): Observable<PageResponse<Country>> {
    return this._apiCrudClient.findMany<CountryDto, Country>(
      'countries',
      this._apiMaxPageRequestToken,
      MappingProfile.CountryDtoPageToCountryPage
    );
  }

  public getAllCurrencies(): Observable<Currency[]> {
    return this._apiCrudClient.findAll<CurrencyDto, Currency>(
      'allCurrencies',
      MappingProfile.CurrencyDtoToCurrency
    );
  }

  public getCurrencies(): Observable<PageResponse<Currency>> {
    return this._apiCrudClient.findMany<CurrencyDto, Currency>(
      'currencies',
      this._apiMaxPageRequestToken,
      MappingProfile.CurrencyDtoPageToCurrencyPage
    );
  }

  public getAllCurrenciesByType(type: string): Observable<Currency[]> {
    return this._apiCrudClient.findAllBy<CurrencyDto, Currency>(
      'allCurrencies',
      { type: type },
      MappingProfile.CurrencyDtoToCurrency
    );
  }

  public getCurrenciesByType(
    type: string,
    pageRequest: PageRequest
  ): Observable<PageResponse<Currency>> {
    return this._apiCrudClient.findManyBy<CurrencyDto, Currency>(
      'currencies',
      [{ type: type }],
      pageRequest,
      MappingProfile.CurrencyDtoPageToCurrencyPage
    );
  }

  public getAllCryptoCurrencies(): Observable<CryptoCurrency[]> {
    return this._apiCrudClient.findAll<CryptoCurrencyDto, CryptoCurrency>(
      'allCryptoCurrencies',
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public getCryptoCurrencies(pageRequest: PageRequest): Observable<PageResponse<CryptoCurrency>> {
    return this._apiCrudClient.findMany<CryptoCurrencyDto, CryptoCurrency>(
      'cryptoCurrencies',
      pageRequest,
      MappingProfile.CryptoCurrencyDtoPageToCryptoCurrencyPage
    );
  }

  public getCryptoCurrencyByCurrencyCode(currencyCode: string): Observable<CryptoCurrency> {
    return this._apiCrudClient.findOne<CryptoCurrencyDto, CryptoCurrency>(
      'cryptoCurrencies',
      currencyCode,
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public getAllCurrencyPairs(): Observable<CurrencyPair[]> {
    return this._apiCrudClient.findAll<CurrencyPairDto, CurrencyPair>(
      'allCurrencyPairs',
      MappingProfile.CurrencyPairDtoToCurrencyPair
    );
  }

  public getCurrencyPairs(pageRequest: PageRequest): Observable<PageResponse<CurrencyPair>> {
    return this._apiCrudClient.findMany<CurrencyPairDto, CurrencyPair>(
      'currencyPairs',
      pageRequest,
      MappingProfile.CurrencyPairDtoPageToCurrencyPairPage
    );
  }

  public getAllPaymentMethods(): Observable<PaymentMethod[]> {
    return this._apiCrudClient.findAll<PaymentMethodDto, PaymentMethod>(
      'allPaymentMethods',
      MappingProfile.PaymentMethodDtoToPaymentMethod
    );
  }

  public getPaymentMethods(pageRequest: PageRequest): Observable<PageResponse<PaymentMethod>> {
    return this._apiCrudClient.findMany<PaymentMethodDto, PaymentMethod>(
      'paymentMethods',
      pageRequest,
      MappingProfile.PaymentMethodDtoPageToPaymentMethodPage
    );
  }

  public getAllUserRoles(): Observable<UserRole[]> {
    return of([
      { code: 'CS', name: 'customer' },
      { code: 'AD', name: 'admin' },
    ]);
  }
}

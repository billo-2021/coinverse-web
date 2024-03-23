import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ApiCrudClient,
  ApiRoute,
  MAX_PAGE_REQUEST_TOKEN,
  PageRequest,
  PageResponse,
} from '../../../shared';
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
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  constructor(
    private readonly _apiCrudClient: ApiCrudClient,
    @Inject(MAX_PAGE_REQUEST_TOKEN) private readonly _maxPageRequest: PageRequest
  ) {}

  public getAllCountries(): Observable<Country[]> {
    return this._apiCrudClient.findAll<CountryDto, Country>(
      ApiRoute.ALL_COUNTRIES,
      MappingProfile.CountryDtoToCountry
    );
  }

  public getCountries(): Observable<PageResponse<Country>> {
    return this._apiCrudClient.findMany<CountryDto, Country>(
      ApiRoute.COUNTRIES,
      this._maxPageRequest,
      MappingProfile.CountryDtoPageToCountryPage
    );
  }

  public getAllCurrencies(): Observable<Currency[]> {
    return this._apiCrudClient.findAll<CurrencyDto, Currency>(
      ApiRoute.ALL_CURRENCIES,
      MappingProfile.CurrencyDtoToCurrency
    );
  }

  public getCurrencies(): Observable<PageResponse<Currency>> {
    return this._apiCrudClient.findMany<CurrencyDto, Currency>(
      ApiRoute.CURRENCIES,
      this._maxPageRequest,
      MappingProfile.CurrencyDtoPageToCurrencyPage
    );
  }

  public getAllCurrenciesByType(type: string): Observable<Currency[]> {
    return this._apiCrudClient.findAllBy<CurrencyDto, Currency>(
      ApiRoute.ALL_CURRENCIES,
      { type: type },
      MappingProfile.CurrencyDtoToCurrency
    );
  }

  public getCurrenciesByType(
    type: string,
    pageRequest: PageRequest
  ): Observable<PageResponse<Currency>> {
    return this._apiCrudClient.findManyBy<CurrencyDto, Currency>(
      ApiRoute.CURRENCIES,
      [{ type: type }],
      pageRequest,
      MappingProfile.CurrencyDtoPageToCurrencyPage
    );
  }

  public getAllCryptoCurrencies(): Observable<CryptoCurrency[]> {
    return this._apiCrudClient.findAll<CryptoCurrencyDto, CryptoCurrency>(
      ApiRoute.ALL_CRYPTO_CURRENCIES,
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public getCryptoCurrencies(pageRequest: PageRequest): Observable<PageResponse<CryptoCurrency>> {
    return this._apiCrudClient.findMany<CryptoCurrencyDto, CryptoCurrency>(
      ApiRoute.CRYPTO_CURRENCIES,
      pageRequest,
      MappingProfile.CryptoCurrencyDtoPageToCryptoCurrencyPage
    );
  }

  public getCryptoCurrencyByCurrencyCode(currencyCode: string): Observable<CryptoCurrency> {
    return this._apiCrudClient.findOne<CryptoCurrencyDto, CryptoCurrency>(
      ApiRoute.CRYPTO_CURRENCIES,
      currencyCode,
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public getAllCurrencyPairs(): Observable<CurrencyPair[]> {
    return this._apiCrudClient.findAll<CurrencyPairDto, CurrencyPair>(
      ApiRoute.ALL_CURRENCY_PAIRS,
      MappingProfile.CurrencyPairDtoToCurrencyPair
    );
  }

  public getCurrencyPairs(pageRequest: PageRequest): Observable<PageResponse<CurrencyPair>> {
    return this._apiCrudClient.findMany<CurrencyPairDto, CurrencyPair>(
      ApiRoute.CURRENCY_PAIRS,
      pageRequest,
      MappingProfile.CurrencyPairDtoPageToCurrencyPairPage
    );
  }

  public getAllPaymentMethods(): Observable<PaymentMethod[]> {
    return this._apiCrudClient.findAll<PaymentMethodDto, PaymentMethod>(
      ApiRoute.ALL_PAYMENT_METHODS,
      MappingProfile.PaymentMethodDtoToPaymentMethod
    );
  }

  public getPaymentMethods(pageRequest: PageRequest): Observable<PageResponse<PaymentMethod>> {
    return this._apiCrudClient.findMany<PaymentMethodDto, PaymentMethod>(
      ApiRoute.PAYMENT_METHODS,
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

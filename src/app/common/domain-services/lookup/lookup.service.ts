import { Inject, Injectable } from '@angular/core';
import { HttpCrudService } from '../../../core/services';
import { apiRoutesConfig } from '../../config';
import {
  CountryDto,
  CountryResponse,
  CryptoCurrencyDto,
  CryptoCurrencyResponse,
  CurrencyDto,
  CurrencyPairDto,
  CurrencyResponse,
  PaymentMethodDto,
  PaymentMethodResponse,
} from '../../domain-models';
import { map, Observable } from 'rxjs';
import {
  countryDtoToCountryResponse,
  cryptoCurrencyDtoToCryptoCurrencyResponse,
  currencyDtoToCurrencyResponse,
} from '../../mappers/lookup';
import { PageResponse } from '../../../core/types/crud';
import { CurrencyPairResponse } from '../../domain-models/lookup/currency-pair-response';

interface PageRequest {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class LookupService {
  public readonly BASE_PATH = apiRoutesConfig.lookup.root;
  public readonly ALL_COUNTRIES_PATH = apiRoutesConfig.lookup.allCountries;
  public readonly COUNTRIES_PATH = apiRoutesConfig.lookup.countries;
  public readonly ALL_CURRENCIES_PATH = apiRoutesConfig.lookup.allCurrencies;
  public readonly CURRENCIES_PATH = apiRoutesConfig.lookup.currencies;
  public readonly ALL_CRYPTO_CURRENCIES_PATH = apiRoutesConfig.lookup.allCryptoCurrencies;
  public readonly CRYPTO_CURRENCIES_PATH = apiRoutesConfig.lookup.cryptoCurrencies;
  public readonly ALL_CURRENCY_PAIRS_PATH = apiRoutesConfig.lookup.allCurrencyPairs;
  public readonly CURRENCY_PAIRS_PATH = apiRoutesConfig.lookup.currencyPairs;
  public readonly ALL_PAYMENT_METHODS_PATH = apiRoutesConfig.lookup.allPaymentMethods;
  public readonly PAYMENT_METHODS_PATH = apiRoutesConfig.lookup.paymentMethods;

  constructor(@Inject(HttpCrudService) private httpService: HttpCrudService) {}

  public getAllCountries(): Observable<CountryResponse[]> {
    return this.httpService
      .find<CountryDto[]>(this.getFullPath(this.ALL_COUNTRIES_PATH))
      .pipe(map((response) => response.map(countryDtoToCountryResponse)));
  }

  public getCountries(): Observable<PageResponse<CountryResponse>> {
    return this.httpService.find<PageResponse<CountryDto>>(this.getFullPath(this.COUNTRIES_PATH)).pipe(
      map((response) => ({
        count: response.count,
        total: response.total,
        data: response.data.map(countryDtoToCountryResponse),
      }))
    );
  }

  public getAllCurrencies(): Observable<CurrencyResponse[]> {
    return this.httpService
      .find<CurrencyDto[]>(this.getFullPath(this.ALL_CURRENCIES_PATH))
      .pipe(map((response) => response.map(currencyDtoToCurrencyResponse)));
  }

  public getCurrencies(): Observable<PageResponse<CurrencyResponse>> {
    return this.httpService.find<PageResponse<CurrencyDto>>(this.getFullPath(this.CURRENCIES_PATH)).pipe(
      map((response) => ({
        count: response.count,
        total: response.total,
        data: response.data.map(currencyDtoToCurrencyResponse),
      }))
    );
  }

  public getAllCurrenciesByType(type: string): Observable<CurrencyResponse[]> {
    const url = `${this.getFullPath(this.ALL_CURRENCIES_PATH)}?type=${type}`;

    return this.httpService.find<CurrencyDto[]>(url);
  }

  public getCurrenciesByType(
    type: string,
    pageRequest: PageRequest
  ): Observable<PageResponse<CurrencyResponse>> {
    const url = `${this.getFullPath(this.CURRENCIES_PATH)}?type=${type}&pageNumber=${
      pageRequest.page
    }&pageSize=${pageRequest.size}`;

    return this.httpService.find<PageResponse<CurrencyDto>>(url);
  }

  public getAllCryptoCurrencies(): Observable<CryptoCurrencyResponse[]> {
    const url = this.getFullPath(this.ALL_CRYPTO_CURRENCIES_PATH);

    return this.httpService
      .find<CryptoCurrencyDto[]>(url)
      .pipe(map((response) => response.map(cryptoCurrencyDtoToCryptoCurrencyResponse)));
  }

  public getCryptoCurrencies(pageRequest: PageRequest): Observable<PageResponse<CryptoCurrencyResponse>> {
    const url = `${this.getFullPath(this.CRYPTO_CURRENCIES_PATH)}?pageNumber=${pageRequest.page}&pageSize=${
      pageRequest.size
    }`;

    return this.httpService.find<PageResponse<CryptoCurrencyDto>>(url).pipe(
      map((response) => {
        return {
          count: response.count,
          total: response.total,
          data: response.data.map(cryptoCurrencyDtoToCryptoCurrencyResponse),
        };
      })
    );
  }

  public getCryptoCurrencyByCurrencyCode(currencyCode: string): Observable<CryptoCurrencyResponse> {
    const url = `${this.getFullPath(this.CRYPTO_CURRENCIES_PATH)}/${currencyCode}`;

    return this.httpService.find<CryptoCurrencyDto>(url);
  }

  public getAllCurrencyPairs(): Observable<CurrencyPairResponse[]> {
    const url = `${this.getFullPath(this.ALL_CURRENCY_PAIRS_PATH)}`;
    return this.httpService.find<CurrencyPairDto[]>(url);
  }

  public getCurrencyPairs(pageRequest: PageRequest): Observable<PageResponse<CurrencyPairResponse>> {
    const url = `${this.getFullPath(this.CURRENCY_PAIRS_PATH)}?pageNumber=${pageRequest.page}&pageSize=${
      pageRequest.size
    }`;
    return this.httpService.find<PageResponse<CurrencyPairDto>>(url);
  }

  public getAllPaymentMethods(): Observable<PaymentMethodResponse[]> {
    const url = this.getFullPath(this.ALL_PAYMENT_METHODS_PATH);
    return this.httpService.find<PaymentMethodDto[]>(url);
  }

  public getPaymentMethods(pageRequest: PageRequest): Observable<PageResponse<PaymentMethodResponse>> {
    const url = `${this.getFullPath(this.ALL_PAYMENT_METHODS_PATH)}?pageNumber=${pageRequest.page}&pageSize=${
      pageRequest.size
    }`;
    return this.httpService.find<PageResponse<PaymentMethodDto>>(url);
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

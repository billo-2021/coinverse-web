import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpCrudService, HttpMessageResponse, PageRequest, PageResponse } from '../../../core';

import { apiRoutesConfig } from '../../config';
import { CryptoCurrencyDto, CryptoCurrencyResponse } from '../../domain-models/lookup';
import {
  CryptoCurrencyRequest,
  CryptoCurrencyUpdateRequest,
  UserDto,
  UserRequest,
  UserResponse,
} from '../../domain-models/administration';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  public readonly BASE_PATH = apiRoutesConfig.administration.root;
  public readonly USERS_PATH = apiRoutesConfig.administration.users.root;
  public readonly ENABLE_ACCOUNT_PATH = apiRoutesConfig.administration.users.enableAccount;
  public readonly DISABLE_ACCOUNT_PATH = apiRoutesConfig.administration.users.disableAccount;

  constructor(private _httpService: HttpCrudService) {}

  public addNewCryptoCurrency(
    cryptoCurrencyRequest: CryptoCurrencyRequest
  ): Observable<CryptoCurrencyResponse> {
    const url = this.getFullPath(apiRoutesConfig.administration.cryptoCurrencies);

    return this._httpService.create<CryptoCurrencyRequest, CryptoCurrencyDto>(
      url,
      cryptoCurrencyRequest
    );
  }

  public updateCryptoCurrency(
    currencyCode: string,
    cryptoCurrencyUpdateRequest: CryptoCurrencyUpdateRequest
  ): Observable<CryptoCurrencyResponse> {
    const url = `${this.getFullPath(
      apiRoutesConfig.administration.cryptoCurrencies
    )}/${currencyCode}`;
    return this._httpService.patch<CryptoCurrencyUpdateRequest, CryptoCurrencyDto>(
      url,
      cryptoCurrencyUpdateRequest
    );
  }

  public getUsers(pageRequest: PageRequest): Observable<PageResponse<UserResponse>> {
    const url = `${this.getFullPath(this.USERS_PATH)}?pageNumber=${pageRequest.page}&pageSize=${
      pageRequest.size
    }`;

    return this._httpService.find<PageResponse<UserDto>>(url);
  }

  public addUser(userRequest: UserRequest): Observable<HttpMessageResponse> {
    const url = this.getFullPath(this.USERS_PATH);

    return this._httpService.create<UserRequest, HttpMessageResponse>(url, userRequest);
  }

  public disableAccount(username: string): Observable<HttpMessageResponse> {
    const url = `${this.getFullPath(this.USERS_PATH)}/${username}${this.DISABLE_ACCOUNT_PATH}`;

    return this._httpService.patch<string, HttpMessageResponse>(url);
  }

  public enableAccount(username: string): Observable<HttpMessageResponse> {
    const url = `${this.getFullPath(this.USERS_PATH)}/${username}${this.ENABLE_ACCOUNT_PATH}`;

    return this._httpService.patch<string, HttpMessageResponse>(url);
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

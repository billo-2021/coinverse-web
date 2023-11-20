import { Inject, Injectable } from '@angular/core';
import { HttpCrudService } from '../../../core/services';
import { apiRoutesConfig } from '../../config';
import { Observable } from 'rxjs';
import {
  CryptoCurrencyRequest,
  CryptoCurrencyUpdateRequest,
  UserDto,
  UserRequest,
  UserResponse,
} from '../../domain-models/administration';
import { CryptoCurrencyDto, CryptoCurrencyResponse } from '../../domain-models';
import { PageResponse } from '../../../core/types/crud';
import { HttpMessageResponse } from '../../../core/types';

interface PageRequest {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  public readonly BASE_PATH = apiRoutesConfig.administration.root;
  public readonly USERS_PATH = apiRoutesConfig.administration.users.root;
  public readonly ENABLE_ACCOUNT_PATH = apiRoutesConfig.administration.users.enableAccount;
  public readonly DISABLE_ACCOUNT_PATH = apiRoutesConfig.administration.users.disableAccount;

  constructor(@Inject(HttpCrudService) private httpService: HttpCrudService) {}

  public addNewCryptoCurrency(
    cryptoCurrencyRequest: CryptoCurrencyRequest
  ): Observable<CryptoCurrencyResponse> {
    const url = this.getFullPath(apiRoutesConfig.administration.cryptoCurrencies);

    return this.httpService.create<CryptoCurrencyRequest, CryptoCurrencyDto>(
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
    return this.httpService.patch<CryptoCurrencyUpdateRequest, CryptoCurrencyDto>(
      url,
      cryptoCurrencyUpdateRequest
    );
  }

  public getUsers(pageRequest: PageRequest): Observable<PageResponse<UserResponse>> {
    const url = `${this.getFullPath(this.USERS_PATH)}?pageNumber=${pageRequest.page}&pageSize=${
      pageRequest.size
    }`;

    return this.httpService.find<PageResponse<UserDto>>(url);
  }

  public addUser(userRequest: UserRequest): Observable<HttpMessageResponse> {
    const url = this.getFullPath(this.USERS_PATH);

    return this.httpService.create<UserRequest, HttpMessageResponse>(url, userRequest);
  }

  public disableAccount(username: string): Observable<HttpMessageResponse> {
    const url = `${this.getFullPath(this.USERS_PATH)}/${username}${this.DISABLE_ACCOUNT_PATH}`;

    return this.httpService.patch<string, HttpMessageResponse>(url);
  }

  public enableAccount(username: string): Observable<HttpMessageResponse> {
    const url = `${this.getFullPath(this.USERS_PATH)}/${username}${this.ENABLE_ACCOUNT_PATH}`;

    return this.httpService.patch<string, HttpMessageResponse>(url);
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

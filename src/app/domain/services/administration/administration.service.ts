import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiCrudClient,
  ApiRoute,
  HttpMessage,
  HttpMessageDto,
  PageRequest,
  PageResponse,
} from '../../../shared';
import { MappingProfile } from '../../config';
import {
  AddCryptoCurrency,
  AddUser,
  AdminUser,
  AdminUserDto,
  CryptoCurrency,
  CryptoCurrencyDto,
  UpdateCryptoCurrency,
  UpdateUserAccountEnabled,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private _apiCrudClient: ApiCrudClient) {}

  public addCryptoCurrency(cryptoCurrencyRequest: AddCryptoCurrency): Observable<CryptoCurrency> {
    return this._apiCrudClient.create<AddCryptoCurrency, CryptoCurrencyDto, CryptoCurrency>(
      ApiRoute.ADMIN_CRYPTO_CURRENCIES,
      cryptoCurrencyRequest,
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public updateCryptoCurrency(
    currencyCode: string,
    cryptoCurrencyRequest: UpdateCryptoCurrency
  ): Observable<CryptoCurrency> {
    return this._apiCrudClient.patchBy<UpdateCryptoCurrency, CryptoCurrencyDto, CryptoCurrency>(
      ApiRoute.ADMIN_CRYPTO_CURRENCIES,
      currencyCode,
      cryptoCurrencyRequest,
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public getUsers(pageRequest: PageRequest): Observable<PageResponse<AdminUser>> {
    return this._apiCrudClient.findMany<AdminUserDto, AdminUser>(
      ApiRoute.ADMIN_USERS,
      pageRequest,
      MappingProfile.AdminUserDtoPageToAdminUserPage
    );
  }

  public addUser(userRequest: AddUser): Observable<HttpMessage> {
    return this._apiCrudClient.create<AddUser, HttpMessageDto, HttpMessage>(
      ApiRoute.ADMIN_USERS,
      userRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }

  public disableAccount(username: string): Observable<HttpMessage> {
    return this._apiCrudClient.patch<UpdateUserAccountEnabled, HttpMessageDto, HttpMessage>(
      ApiRoute.ADMIN_USERS_ACCOUNT_ENABLED,
      { username, isEnabled: false },
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }

  public enableAccount(username: string): Observable<HttpMessage> {
    return this._apiCrudClient.patch<UpdateUserAccountEnabled, HttpMessageDto, HttpMessage>(
      ApiRoute.ADMIN_USERS_ACCOUNT_ENABLED,
      { username, isEnabled: true },
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }
}

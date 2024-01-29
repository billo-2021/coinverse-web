import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMessage, HttpMessageDto, PageRequest, PageResponse } from '../../../core';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import {
  AddCryptoCurrency,
  AddUser,
  AdminUser,
  AdminUserDto,
  CryptoCurrency,
  CryptoCurrencyDto,
  UpdateCryptoCurrency,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AdministrationService {
  constructor(private _apiCrudClient: ApiCrudClient) {}

  public addCryptoCurrency(cryptoCurrencyRequest: AddCryptoCurrency): Observable<CryptoCurrency> {
    return this._apiCrudClient.create<AddCryptoCurrency, CryptoCurrencyDto, CryptoCurrency>(
      'adminCryptoCurrencies',
      cryptoCurrencyRequest,
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public updateCryptoCurrency(
    currencyCode: string,
    cryptoCurrencyRequest: UpdateCryptoCurrency
  ): Observable<CryptoCurrency> {
    return this._apiCrudClient.patchBy<UpdateCryptoCurrency, CryptoCurrencyDto, CryptoCurrency>(
      'adminCryptoCurrencies',
      currencyCode,
      cryptoCurrencyRequest,
      MappingProfile.CryptoCurrencyDtoToCryptoCurrency
    );
  }

  public getUsers(pageRequest: PageRequest): Observable<PageResponse<AdminUser>> {
    return this._apiCrudClient.findMany<AdminUserDto, AdminUser>(
      'adminUsers',
      pageRequest,
      MappingProfile.AdminUserDtoPageToAdminUserPage
    );
  }

  public addUser(userRequest: AddUser): Observable<HttpMessage> {
    return this._apiCrudClient.create<AddUser, HttpMessageDto, HttpMessage>(
      'adminUsers',
      userRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }

  public disableAccount(username: string): Observable<HttpMessage> {
    return this._apiCrudClient.patch<string, HttpMessageDto, HttpMessage>(
      'adminUsersDisableAccount',
      username,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }

  public enableAccount(username: string): Observable<HttpMessage> {
    return this._apiCrudClient.patch<string, HttpMessageDto, HttpMessage>(
      'adminUsersEnableAccount',
      username,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }
}

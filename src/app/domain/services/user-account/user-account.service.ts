import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMessage, HttpMessageDto, PageRequest, PageResponse } from '../../../core';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import { ChangePassword, UserAccountEvent, UserAccountEventDto } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getUserAccountEvents(
    pageRequest: PageRequest
  ): Observable<PageResponse<UserAccountEvent>> {
    return this._apiCrudClient.findMany<UserAccountEventDto, UserAccountEvent>(
      'accountActivity',
      pageRequest,
      MappingProfile.UserAccountEventDtoPageToUserAccountEventPage
    );
  }

  public changePassword(changePasswordRequest: ChangePassword): Observable<HttpMessage> {
    return this._apiCrudClient.patch<ChangePassword, HttpMessageDto, HttpMessage>(
      'accountChangePassword',
      changePasswordRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }
}

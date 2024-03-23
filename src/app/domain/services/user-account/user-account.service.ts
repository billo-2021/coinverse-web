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
import { ChangePassword, UserAccountEvent, UserAccountEventDto } from '../../models';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getUserAccountEvents(
    pageRequest: PageRequest
  ): Observable<PageResponse<UserAccountEvent>> {
    return this._apiCrudClient.findMany<UserAccountEventDto, UserAccountEvent>(
      ApiRoute.ACCOUNT_ACTIVITY,
      pageRequest,
      MappingProfile.UserAccountEventDtoPageToUserAccountEventPage
    );
  }

  public changePassword(changePasswordRequest: ChangePassword): Observable<HttpMessage> {
    return this._apiCrudClient.patch<ChangePassword, HttpMessageDto, HttpMessage>(
      ApiRoute.ACCOUNT_CHANGE_PASSWORD,
      changePasswordRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }
}

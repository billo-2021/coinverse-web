import { Inject, Injectable } from '@angular/core';
import { HttpCrudService } from '../../../core/services';
import { apiRoutesConfig } from '../../config';
import {
  ChangePasswordRequest,
  UserAccountEventDto,
  UserAccountEventResponse,
} from '../../domain-models';
import { PageResponse } from '../../../core/types/crud';
import { Observable } from 'rxjs';
import { HttpMessageResponse } from '../../../core/types';

interface PageRequest {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  public readonly BASE_PATH = apiRoutesConfig.account.root;
  public readonly ACCOUNT_ACTIVITY_PATH = apiRoutesConfig.account.activity;
  public readonly CHANGE_PASSWORD_PATH = apiRoutesConfig.account.changePassword;

  constructor(@Inject(HttpCrudService) private httpService: HttpCrudService) {}

  public getUserAccountEvents(
    pageRequest: PageRequest
  ): Observable<PageResponse<UserAccountEventResponse>> {
    const url = `${this.getFullPath(this.ACCOUNT_ACTIVITY_PATH)}?pageNumber=${
      pageRequest.page
    }&pageSize=${pageRequest.size}`;

    return this.httpService.find<PageResponse<UserAccountEventDto>>(url);
  }

  public changePassword(
    changePasswordRequest: ChangePasswordRequest
  ): Observable<HttpMessageResponse> {
    const url = this.getFullPath(this.CHANGE_PASSWORD_PATH);

    return this.httpService.patch<ChangePasswordRequest, HttpMessageResponse>(
      url,
      changePasswordRequest
    );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

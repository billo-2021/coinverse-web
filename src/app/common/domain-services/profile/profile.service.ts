import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpCrudService } from '../../../core';

import { apiRoutesConfig } from '../../config';
import {
  UserProfileAddressUpdate,
  UserProfileDto,
  UserProfilePersonalInformationUpdate,
  UserProfilePreferenceUpdate,
  UserProfileResponse,
} from '../../domain-models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public readonly BASE_PATH = apiRoutesConfig.profile.root;

  constructor(private readonly _httpService: HttpCrudService) {}

  public getProfile(): Observable<UserProfileResponse> {
    const url = this.BASE_PATH;

    return this._httpService.find<UserProfileDto>(url);
  }

  public updatePreferenceDetails(
    userProfilePreferenceUpdate: UserProfilePreferenceUpdate
  ): Observable<UserProfileResponse> {
    const url = this.getFullPath(apiRoutesConfig.profile.preference);

    return this._httpService.patch<UserProfilePreferenceUpdate, UserProfileResponse>(
      url,
      userProfilePreferenceUpdate
    );
  }

  public updateAddress(
    userProfileAddressUpdate: UserProfileAddressUpdate
  ): Observable<UserProfileResponse> {
    const url = this.getFullPath(apiRoutesConfig.profile.address);

    return this._httpService.patch<UserProfileAddressUpdate, UserProfileDto>(
      url,
      userProfileAddressUpdate
    );
  }

  public updatePersonalInformation(
    userProfilePersonalInformationUpdate: UserProfilePersonalInformationUpdate
  ): Observable<UserProfileResponse> {
    const url = this.getFullPath(apiRoutesConfig.profile.personalInformation);

    return this._httpService.patch<UserProfilePersonalInformationUpdate, UserProfileDto>(
      url,
      userProfilePersonalInformationUpdate
    );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

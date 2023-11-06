import { Inject, Injectable } from '@angular/core';
import { apiRoutesConfig } from '../../config';
import { HttpCrudService } from '../../../core/services';
import {
  UserProfileAddressUpdate,
  UserProfileDto,
  UserProfilePersonalInformationUpdate,
  UserProfilePreferenceUpdate,
  UserProfileResponse,
} from '../../domain-models/profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public readonly BASE_PATH = apiRoutesConfig.profile.root;

  constructor(@Inject(HttpCrudService) private httpService: HttpCrudService) {}

  public getProfile(): Observable<UserProfileResponse> {
    const url = this.BASE_PATH;

    return this.httpService.find<UserProfileDto>(url);
  }

  public updatePreferenceDetails(
    userProfilePreferenceUpdate: UserProfilePreferenceUpdate
  ): Observable<UserProfileResponse> {
    const url = this.getFullPath(apiRoutesConfig.profile.preference);

    return this.httpService.patch<UserProfilePreferenceUpdate, UserProfileResponse>(
      url,
      userProfilePreferenceUpdate
    );
  }

  public updateAddress(userProfileAddressUpdate: UserProfileAddressUpdate): Observable<UserProfileResponse> {
    const url = this.getFullPath(apiRoutesConfig.profile.address);

    return this.httpService.patch<UserProfileAddressUpdate, UserProfileDto>(url, userProfileAddressUpdate);
  }

  public updatePersonalInformation(
    userProfilePersonalInformationUpdate: UserProfilePersonalInformationUpdate
  ): Observable<UserProfileResponse> {
    const url = this.getFullPath(apiRoutesConfig.profile.personalInformation);

    return this.httpService.patch<UserProfilePersonalInformationUpdate, UserProfileDto>(
      url,
      userProfilePersonalInformationUpdate
    );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}

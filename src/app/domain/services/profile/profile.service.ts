import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient, ApiRoute } from '../../../shared';
import {
  UpdateUserProfileAddress,
  UpdateUserProfilePersonalInformation,
  UpdateUserProfilePreference,
  UserProfile,
  UserProfileDto,
} from '../../models';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getProfile(): Observable<UserProfile> {
    return this._apiCrudClient.find<UserProfileDto, UserProfile>(
      ApiRoute.PROFILE,
      MappingProfile.UserProfileDtoToUserProfile
    );
  }

  public updatePreferenceDetails(
    userProfilePreferenceRequest: UpdateUserProfilePreference
  ): Observable<UserProfile> {
    return this._apiCrudClient.patch<UpdateUserProfilePreference, UserProfileDto, UserProfile>(
      ApiRoute.PROFILE_PREFERENCE,
      userProfilePreferenceRequest,
      MappingProfile.UserProfileDtoToUserProfile
    );
  }

  public updateAddress(
    userProfileAddressRequest: UpdateUserProfileAddress
  ): Observable<UserProfile> {
    return this._apiCrudClient.patch<UpdateUserProfileAddress, UserProfileDto, UserProfile>(
      ApiRoute.PROFILE_ADDRESS,
      userProfileAddressRequest,
      MappingProfile.UserProfileDtoToUserProfile
    );
  }

  public updatePersonalInformation(
    userProfilePersonalInformationRequest: UpdateUserProfilePersonalInformation
  ): Observable<UserProfile> {
    return this._apiCrudClient.patch<
      UpdateUserProfilePersonalInformation,
      UserProfileDto,
      UserProfile
    >(
      ApiRoute.PROFILE_PERSONAL_INFORMATION,
      userProfilePersonalInformationRequest,
      MappingProfile.UserProfileDtoToUserProfile
    );
  }
}

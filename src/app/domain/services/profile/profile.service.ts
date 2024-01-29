import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import {
  UpdateUserProfileAddress,
  UpdateUserProfilePersonalInformation,
  UpdateUserProfilePreference,
  UserProfile,
  UserProfileDto,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public getProfile(): Observable<UserProfile> {
    return this._apiCrudClient.find<UserProfileDto, UserProfile>(
      'profile',
      MappingProfile.UserProfileDtoToUserProfile
    );
  }

  public updatePreferenceDetails(
    userProfilePreferenceRequest: UpdateUserProfilePreference
  ): Observable<UserProfile> {
    return this._apiCrudClient.patch<UpdateUserProfilePreference, UserProfileDto, UserProfile>(
      'profilePreference',
      userProfilePreferenceRequest,
      MappingProfile.UserProfileDtoToUserProfile
    );
  }

  public updateAddress(
    userProfileAddressRequest: UpdateUserProfileAddress
  ): Observable<UserProfile> {
    return this._apiCrudClient.patch<UpdateUserProfileAddress, UserProfileDto, UserProfile>(
      'profileAddress',
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
      'profilePersonalInformation',
      userProfilePersonalInformationRequest,
      MappingProfile.UserProfileDtoToUserProfile
    );
  }
}

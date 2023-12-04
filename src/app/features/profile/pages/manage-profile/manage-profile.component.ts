import { Component } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { ProfileService } from '../../../../common';
import { UserProfileResponse } from '../../../../common/domain-models/profile';

type Tab = {
  text: string;
  icon: string;
  isDisabled: boolean;
};

enum Tabs {
  Profile,
  AddressDetails,
  Preferences,
  ChangePassword,
  AccountActivity,
}

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss'],
})
export class ManageProfileComponent {
  protected readonly title = 'Account';
  protected readonly subtitle = 'Set your account settings down below';
  protected readonly tabs: Tab[] = [
    { text: 'Profile', icon: 'tuiIconEdit2', isDisabled: false },
    { text: 'Address', icon: 'tuiIconCompass', isDisabled: false },
    { text: 'Preferences', icon: 'tuiIconBell', isDisabled: false },
    { text: 'Password', icon: 'tuiIconUserCheck', isDisabled: false },
    { text: 'Activity', icon: 'tuiIconActivity', isDisabled: false },
  ];
  protected readonly TABS = Tabs;
  protected activeTabIndex = 0;
  protected readonly userProfileResponse$: Observable<UserProfileResponse>;
  protected reload$ = new BehaviorSubject<boolean>(true);

  public constructor(private readonly _profileService: ProfileService) {
    this.userProfileResponse$ = this.reload$.pipe(switchMap(() => _profileService.getProfile()));
  }

  public onPasswordChanged(): void {
    this.activeTabIndex = Tabs.Profile;
  }

  public onSaveClicked(): void {
    this.activeTabIndex = Tabs.Profile;
    this.reload$.next(true);
  }
}

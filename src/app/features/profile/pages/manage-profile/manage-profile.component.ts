import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  finalize,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { AlertService, PageResponse } from '../../../../core';
import { getErrorMessage, ViewPage } from '../../../../common';
import { PAGE_OPTIONS, Pagination, paginationToken, Tab } from '../../../../ui-components';
import { ListOption } from '../../../../form-components';
import {
  ChangePassword,
  Country,
  Currency,
  ListOptionsService,
  ProfileService,
  UpdateUserProfileAddress,
  UpdateUserProfilePersonalInformation,
  UpdateUserProfilePreference,
  UserAccountEvent,
  UserAccountService,
  UserProfile,
} from '../../../../domain';
import {
  AddressDetailsFormService,
  ChangePasswordFormService,
  PreferenceDetailsFormService,
  UserProfileFormService,
} from '../../components';

export enum ProfileTab {
  Profile,
  AddressDetails,
  Preferences,
  ChangePassword,
  AccountActivity,
}

export type ProfileTabType = typeof ProfileTab;
export type ProfileTabsType = readonly [Tab, Tab, Tab, Tab, Tab];

export interface ManageProfileViewModel {
  readonly activeTabIndex: ProfileTab;
  readonly userProfile: UserProfile;
  readonly countryOptions: readonly ListOption<Country>[];
  readonly currencyOptions: readonly ListOption<Currency>[];
  readonly userAccountEventsPagination: Pagination;
  readonly userAccountEventPage: PageResponse<UserAccountEvent>;
  readonly profileError: string | null;
  readonly addressDetailsError: string | null;
  readonly preferenceDetailsError: string | null;
  readonly changePasswordError: string | null;
}

export interface ManageProfileView extends ViewPage<ManageProfileViewModel> {
  readonly ProfileTabType: ProfileTabType;
  readonly ProfileTabs: ProfileTabsType;
}

export const PROFILE_TABS: ProfileTabsType = [
  { text: 'Profile', icon: 'tuiIconEdit2', isDisabled: false },
  { text: 'Address', icon: 'tuiIconCompass', isDisabled: false },
  { text: 'Preferences', icon: 'tuiIconBell', isDisabled: false },
  { text: 'Password', icon: 'tuiIconUserCheck', isDisabled: false },
  { text: 'Activity', icon: 'tuiIconActivity', isDisabled: false },
];

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserProfileFormService,
    AddressDetailsFormService,
    ChangePasswordFormService,
    PreferenceDetailsFormService,
  ],
})
export class ManageProfileComponent implements ManageProfileView {
  public readonly title = 'Account';
  public readonly subtitle = 'Set your account settings down below.';
  public readonly ProfileTabType: ProfileTabType = ProfileTab;
  public readonly ProfileTabs: ProfileTabsType = PROFILE_TABS;

  @HostBinding('class') private _classes = 'block';

  private _activeTabIndex$ = new BehaviorSubject<ProfileTab>(ProfileTab.Profile);
  private _reload$ = new ReplaySubject<void>();

  private _userProfile$: Observable<UserProfile> = this._reload$.pipe(
    switchMap(() => this._profileService.getProfile().pipe(shareReplay(1)))
  );

  private readonly _countryOptions$ = this._listOptionsService
    .getCountryOptions()
    .pipe(shareReplay(1), startWith<readonly ListOption<Country>[]>([]));

  private readonly _currencyOptions$ = this._listOptionsService
    .getCurrencyOptions()
    .pipe(shareReplay(1), startWith<readonly ListOption<Currency>[]>([]));

  private readonly _userAccountEventsPagination$ = new BehaviorSubject<Pagination>(
    this._paginationToken
  );

  private readonly _userAccountEventPage$ = combineLatest([
    this._userAccountEventsPagination$,
  ]).pipe(
    switchMap((query) =>
      this._userAccountService.getUserAccountEvents(...query).pipe(shareReplay(1))
    ),
    startWith<PageResponse<UserAccountEvent>>(PAGE_OPTIONS)
  );

  private readonly _profileError$ = new BehaviorSubject<string | null>(null);
  private readonly _addressDetailsError$ = new BehaviorSubject<string | null>(null);
  private readonly _preferenceDetailsError$ = new BehaviorSubject<string | null>(null);
  private readonly _changePasswordError$ = new BehaviorSubject<string | null>(null);

  public readonly viewModel$: Observable<ManageProfileViewModel> = combineLatest([
    this._activeTabIndex$.asObservable(),
    this._userProfile$,
    this._countryOptions$,
    this._currencyOptions$,
    this._userAccountEventsPagination$,
    this._userAccountEventPage$,
    this._profileError$.asObservable(),
    this._addressDetailsError$.asObservable(),
    this._preferenceDetailsError$.asObservable(),
    this._changePasswordError$,
  ]).pipe(
    map(
      ([
        activeTabIndex,
        userProfile,
        countryOptions,
        currencyOptions,
        userAccountEventsPagination,
        userAccountEventPage,
        profileError,
        addressDetailsError,
        preferenceDetailsError,
        changePasswordError,
      ]) => ({
        activeTabIndex,
        userProfile,
        countryOptions,
        currencyOptions,
        userAccountEventsPagination,
        userAccountEventPage,
        profileError,
        addressDetailsError,
        preferenceDetailsError,
        changePasswordError,
      })
    )
  );

  public constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    @Self() private readonly _userProfileForm: UserProfileFormService,
    @Self() private readonly _addressDetailsForm: AddressDetailsFormService,
    @Self() private readonly _changePasswordForm: ChangePasswordFormService,
    @Self() private readonly _preferenceDetailsForm: PreferenceDetailsFormService,
    private readonly _profileService: ProfileService,
    private readonly _userAccountService: UserAccountService,
    private readonly _listOptionsService: ListOptionsService,
    private readonly _alertService: AlertService
  ) {
    this._reload$.next();
  }

  private set activeTabIndex(value: ProfileTab) {
    this._activeTabIndex$.next(value);
  }

  private set userAccountEventsPagination(value: Pagination) {
    this._userAccountEventsPagination$.next(value);
  }

  private set profileError(message: string | null) {
    this._profileError$.next(message);
  }

  private set addressDetailsError(message: string | null) {
    this._addressDetailsError$.next(message);
  }

  private set preferenceDetailsError(message: string | null) {
    this._preferenceDetailsError$.next(message);
  }

  private set changePasswordError(message: string | null) {
    this._changePasswordError$.next(message);
  }

  public activeTabIndexChanged(index: ProfileTab): void {
    this.activeTabIndex = index;
  }

  public onUserAccountPagination(pagination: Pagination): void {
    this.userAccountEventsPagination = pagination;
  }

  public save(message: string): void {
    this._alertService.showMessage(message);
    this.activeTabIndex = ProfileTab.Profile;
    this.reload();
  }

  public updateUserPersonalInformation(
    personalInformationUpdateRequest: UpdateUserProfilePersonalInformation
  ): void {
    this._profileService
      .updatePersonalInformation(personalInformationUpdateRequest)
      .pipe(finalize(() => this._userProfileForm.markAsPristine()))
      .subscribe({
        next: () => this.save('Personal Information Updated'),
        error: (error) => {
          this.profileError = getErrorMessage(error);
          this.reload();
        },
      });
  }

  public updateProfileAddress(addressUpdateRequest: UpdateUserProfileAddress): void {
    this._profileService
      .updateAddress(addressUpdateRequest)
      .pipe(finalize(() => this._addressDetailsForm.markAsPristine()))
      .subscribe({
        next: () => this.save('Address Updated'),
        error: (error) => {
          this.addressDetailsError = getErrorMessage(error);
          this.reload();
        },
      });
  }

  public updateProfilePreference(preferenceUpdateRequest: UpdateUserProfilePreference): void {
    this._profileService
      .updatePreferenceDetails(preferenceUpdateRequest)
      .pipe(finalize(() => this._preferenceDetailsForm.markAsPristine()))
      .subscribe({
        next: () => this.save('Preferences Updated'),
        error: (error) => {
          this.preferenceDetailsError = getErrorMessage(error);
          this.reload();
        },
      });
  }

  public changePassword(changePasswordRequest: ChangePassword): void {
    this._userAccountService
      .changePassword(changePasswordRequest)
      .pipe(
        finalize(() => {
          this._changePasswordForm.reset();
          this._changePasswordForm.markAsPristine();
        })
      )
      .subscribe({
        next: (response) => this.save(response.message),
        error: (error) => (this.changePasswordError = getErrorMessage(error)),
      });
  }

  public reportActivity(): void {
    this._alertService.showMessage('Activity reported');
  }

  private reload(): void {
    this._reload$.next();
  }
}

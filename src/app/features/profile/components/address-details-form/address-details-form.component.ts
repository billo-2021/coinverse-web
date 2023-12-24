import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, map, Observable, shareReplay, tap } from 'rxjs';

import { AlertService } from '../../../../core';
import { ListOption } from '../../../../form-components';
import { BaseComponent, LookupService, ProfileService } from '../../../../common';
import {
  UserProfileAddressUpdate,
  UserProfileResponse,
} from '../../../../common/domain-models/profile';
import { CountryResponse } from '../../../../common/domain-models/lookup';

@Component({
  selector: 'app-address-details-form',
  templateUrl: './address-details-form.component.html',
  styleUrls: ['./address-details-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressDetailsFormComponent extends BaseComponent {
  public form: FormGroup;
  @Input() public saveText = 'Save Changes';
  @Output() public saveClicked = new EventEmitter<void>();

  protected countryOptions$: Observable<ListOption<CountryResponse>[]>;
  protected readonly userProfileResponse$: Observable<UserProfileResponse>;

  public constructor(
    private _formBuilder: FormBuilder,
    private readonly _alertService: AlertService,
    private readonly _profileService: ProfileService,
    private readonly _lookupService: LookupService
  ) {
    super();
    this.form = this.getAddressDetailsForm(_formBuilder);

    this.countryOptions$ = this._lookupService.getAllCountries().pipe(
      map((countryResponse) => {
        return countryResponse.map((country) => ({
          code: country.code,
          name: country.name,
          avatar: country.code,
          value: country,
        }));
      }),
      shareReplay(1)
    );

    this.userProfileResponse$ = _profileService.getProfile();

    combineLatest([this.countryOptions$, this.userProfileResponse$])
      .pipe(
        tap(([countryOptions, userProfile]) => {
          const userProfileAddress = userProfile.address;

          this.form.controls['addressLine']?.setValue(userProfileAddress.addressLine);
          this.form.controls['street']?.setValue(userProfileAddress.street);
          this.form.controls['province']?.setValue(userProfileAddress.province);
          this.form.controls['city']?.setValue(userProfileAddress.city);
          this.form.controls['postalCode']?.setValue(userProfileAddress.postalCode);

          const foundCountryOption = countryOptions.find((currencyOption) => {
            const country = currencyOption.value as CountryResponse;

            return country.code === userProfile?.address?.country?.code;
          });

          if (!foundCountryOption) {
            return;
          }

          this.form.controls['country']?.setValue(foundCountryOption);
        })
      )
      .subscribe();
  }

  public onSaveChanges(): void {
    const addressFormValue = this.form.value;
    const countryOption = this.form.controls['country'].value as ListOption<CountryResponse>;

    const addressUpdateRequest: UserProfileAddressUpdate = {
      addressLine: addressFormValue.addressLine,
      street: addressFormValue.street,
      countryCode: countryOption.value.code,
      province: addressFormValue.province,
      city: addressFormValue.city,
      postalCode: addressFormValue.postalCode,
    };

    this._profileService
      .updateAddress(addressUpdateRequest)
      .pipe(
        tap(() => {
          this._alertService.showMessage('Address Updated');
          this.saveClicked.emit();
        })
      )
      .subscribe();
  }

  private getAddressDetailsForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      addressLine: ['', [Validators.required]],
      street: ['', [Validators.required]],
      country: [null, [Validators.required]],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  OnChanges,
  Optional,
  Output,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService, FormBase, FormValidators, SimpleChangesTyped } from '../../../../shared';
import { ListOption } from '../../../../form-components';
import { Country, UpdateUserProfileAddress, UserProfileAddress } from '../../../../domain';

export interface AddressDetailsForm {
  addressLine: FormControl<string>;
  street: FormControl<string>;
  country: FormControl<ListOption<Country> | null>;
  province: FormControl<string>;
  city: FormControl<string>;
  postalCode: FormControl<string>;
}

export interface AddressDetailsFormComponentInput {
  saveText: string;
  error: string | null;
  userProfileAddress: UserProfileAddress | null;
  countryOptions: readonly ListOption<Country>[];
}

export interface AddressDetailsFormComponentOutput {
  saveClicked: EventEmitter<UpdateUserProfileAddress>;
}

export function getAddressDetailsForm(): AddressDetailsForm {
  return {
    addressLine: new FormControl<string>('', FormValidators.Required),
    street: new FormControl<string>('', FormValidators.Required),
    country: new FormControl<ListOption<Country> | null>(null, FormValidators.Required),
    province: new FormControl<string>('', FormValidators.Required),
    city: new FormControl<string>('', FormValidators.Required),
    postalCode: new FormControl<string>('', FormValidators.Required),
  };
}

@Injectable()
export class AddressDetailsFormService extends FormBase<AddressDetailsForm> {
  public constructor() {
    super(getAddressDetailsForm());
  }
}

@Component({
  selector: 'app-address-details-form',
  templateUrl: './address-details-form.component.html',
  styleUrls: ['./address-details-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressDetailsFormComponent
  implements AddressDetailsFormComponentInput, AddressDetailsFormComponentOutput, OnChanges
{
  @Input() public saveText = 'Save Changes';
  @Input() public error: string | null = null;

  @Input() public userProfileAddress: UserProfileAddress | null = null;

  @Input() public countryOptions: readonly ListOption<Country>[] = [];

  @Output() public saveClicked = new EventEmitter<UpdateUserProfileAddress>();

  public readonly form: FormBase<AddressDetailsForm> =
    this._addressDetailsForm ?? new FormBase<AddressDetailsForm>(getAddressDetailsForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional() @SkipSelf() private readonly _addressDetailsForm: AddressDetailsFormService | null,
    private readonly _alertService: AlertService
  ) {}

  protected get formGroup(): FormGroup<AddressDetailsForm> {
    return this.form;
  }

  public onSaveChanges(): void {
    const address = this.form.getModel();
    const countryOption = address.country;

    if (!countryOption) {
      return;
    }

    const addressUpdateRequest: UpdateUserProfileAddress = {
      addressLine: address.addressLine,
      street: address.street,
      countryCode: countryOption.value.code,
      province: address.province,
      city: address.city,
      postalCode: address.postalCode,
    };

    this.saveClicked.emit(addressUpdateRequest);
  }

  public ngOnChanges(changes: SimpleChangesTyped<AddressDetailsFormComponentInput>): void {
    const userProfileAddress = this.userProfileAddress;

    if (!(changes.userProfileAddress || changes.countryOptions) || !userProfileAddress) {
      this.form.controls.country.setValue(null);
      return;
    }

    const foundCountryOption = this.countryOptions.find(
      (countryOption) => countryOption.value.code === userProfileAddress.country.code
    );

    if (!foundCountryOption) {
      // Something went wrong?
      return;
    }

    this.form.setFromModel({ ...userProfileAddress, country: foundCountryOption });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  Optional,
  Output,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBase, Required } from '../../../common';
import { ListOption } from '../../../form-components';
import { Country } from '../../models';

export interface AddressForm {
  readonly addressLine: FormControl<string>;
  readonly street: FormControl<string>;
  readonly country: FormControl<ListOption<Country> | null>;
  readonly province: FormControl<string>;
  readonly city: FormControl<string>;
  readonly postalCode: FormControl<string>;
}

export interface AddressFormComponentInput {
  saveText: string;
  countryOptions: readonly ListOption<Country>[];
  formClasses: string;
}

export interface AddressFormComponentOutput {
  saveClicked: EventEmitter<void>;
}

export function getAddressForm(): AddressForm {
  return {
    addressLine: new FormControl<string>('', Required),
    street: new FormControl<string>('', Required),
    country: new FormControl<ListOption<Country> | null>(null, Required),
    province: new FormControl<string>('', Required),
    city: new FormControl<string>('', Required),
    postalCode: new FormControl<string>('', Required),
  };
}

@Injectable({
  providedIn: 'root',
})
export class AddressFormService extends FormBase<AddressForm> {
  constructor() {
    super(getAddressForm());
  }
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements AddressFormComponentInput, AddressFormComponentOutput {
  @Input() public saveText = 'Next';
  @Input() public formClasses = '';

  @Input() public countryOptions: readonly ListOption<Country>[] = [];

  @Output() public saveClicked = new EventEmitter<void>();
  public readonly form: FormBase<AddressForm> =
    this._addressForm ?? new FormBase<AddressForm>(getAddressForm());
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @SkipSelf() @Optional() private readonly _addressForm: AddressFormService | null
  ) {}

  protected get formGroup(): FormGroup<AddressForm> {
    return this.form;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }
}

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
import { FormBase, FormValidators, SimpleChangesTyped } from '../../../../shared';
import { ListOption } from '../../../../form-components';
import { Currency, UpdateUserProfilePreference, UserProfilePreference } from '../../../../domain';

export interface NotificationMethodsForm {
  readonly sms: FormControl<boolean>;
  readonly email: FormControl<boolean>;
}

export interface PreferenceDetailsForm {
  readonly currency: FormControl<ListOption<Currency> | null>;
  readonly notificationMethods: FormBase<NotificationMethodsForm>;
}

export interface PreferenceDetailsFormComponentInput {
  saveText: string;
  error: string | null;
  userProfilePreference: UserProfilePreference | null;
  currencyOptions: readonly ListOption<Currency>[];
}

export interface PreferenceDetailsFormComponentOutput {
  saveClicked: EventEmitter<UpdateUserProfilePreference>;
}

export function getNotificationMethodsForm(): NotificationMethodsForm {
  return {
    sms: new FormControl<boolean>(false, FormValidators.Required),
    email: new FormControl<boolean>(true, FormValidators.Required),
  };
}

export function getPreferenceDetailsForm(): PreferenceDetailsForm {
  return {
    currency: new FormControl<ListOption<Currency> | null>(null, FormValidators.Required),
    notificationMethods: new FormBase<NotificationMethodsForm>(getNotificationMethodsForm()),
  };
}

@Injectable()
export class PreferenceDetailsFormService extends FormBase<PreferenceDetailsForm> {
  public constructor() {
    super(getPreferenceDetailsForm());
  }
}

@Component({
  selector: 'app-preference-details-form',
  templateUrl: './preference-details-form.component.html',
  styleUrls: ['./preference-details-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferenceDetailsFormComponent
  implements PreferenceDetailsFormComponentInput, PreferenceDetailsFormComponentOutput, OnChanges
{
  @Input() public saveText = 'Save Changes';
  @Input() public error: string | null = null;
  @Input() public userProfilePreference: UserProfilePreference | null = null;

  @Input() public currencyOptions: readonly ListOption<Currency>[] = [];

  @Output() public saveClicked = new EventEmitter<UpdateUserProfilePreference>();

  public readonly form: FormBase<PreferenceDetailsForm> =
    this._preferenceDetailsForm ?? new FormBase<PreferenceDetailsForm>(getPreferenceDetailsForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional()
    @SkipSelf()
    private readonly _preferenceDetailsForm: PreferenceDetailsFormService | null
  ) {}

  protected get formGroup(): FormGroup<PreferenceDetailsForm> {
    return this.form;
  }

  protected get notificationMethodsFormGroup(): FormGroup<NotificationMethodsForm> {
    return this.form.controls.notificationMethods;
  }

  public onSaveChanges(): void {
    const preferenceModel = this.form.getModel();
    const currencyOption = preferenceModel.currency;

    if (!currencyOption) {
      return;
    }

    const currency = currencyOption.value;

    const notificationMethodsValue = preferenceModel.notificationMethods;

    const notificationMethods = (['sms', 'email'] as const).filter(
      (item) => notificationMethodsValue[item]
    );

    const preferenceUpdateRequest: UpdateUserProfilePreference = {
      currencyCode: currency.code,
      notificationMethods: notificationMethods,
    };

    this.saveClicked.emit(preferenceUpdateRequest);
  }

  public ngOnChanges(changes: SimpleChangesTyped<PreferenceDetailsFormComponentInput>) {
    const userProfilePreference = this.userProfilePreference;

    if (!(changes.userProfilePreference && changes.currencyOptions) || !userProfilePreference) {
      this.form.controls.currency.setValue(null);
      return;
    }

    const foundCurrencyOption = this.currencyOptions.find(
      (currencyOption) => currencyOption.value.code === userProfilePreference.currency.code
    );

    if (!foundCurrencyOption) {
      // Something went wrong?
      return;
    }

    const notificationMethods = userProfilePreference.notificationMethods;

    if (!notificationMethods || !notificationMethods.length) {
      return;
    }

    const notificationMethodsModel = notificationMethods.reduce(
      (prev, curr) => ({ ...prev, [curr.code.toLowerCase()]: true }),
      { sms: false, email: false }
    );

    this.form.setFromModel({
      ...userProfilePreference,
      currency: foundCurrencyOption,
      notificationMethods: notificationMethodsModel,
    });
  }
}

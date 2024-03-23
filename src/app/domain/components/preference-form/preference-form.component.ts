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
import { FormBase, FormValidators } from '../../../shared';
import { ListOption } from '../../../form-components';
import { Currency } from '../../models';
import { ListOptionsService } from '../../services';

export interface NotificationMethodsForm {
  readonly sms: FormControl<boolean>;
  readonly email: FormControl<boolean>;
}

export interface PreferenceForm {
  readonly currency: FormControl<ListOption<Currency> | null>;
  readonly notificationMethods: FormBase<NotificationMethodsForm>;
}

export interface PreferenceFormComponentInput {
  saveText: string;
  formClasses: string;
  currencyOptions: readonly ListOption<Currency>[];
}

export interface PreferenceFormComponentOutput {
  saveClicked: EventEmitter<void>;
  readonly form: FormBase<PreferenceForm>;
}

export function getNotificationMethodsForm(): NotificationMethodsForm {
  return {
    sms: new FormControl<boolean>(false, FormValidators.Required),
    email: new FormControl<boolean>(true, FormValidators.Required),
  };
}

export function getPreferenceForm(): PreferenceForm {
  return {
    currency: new FormControl<ListOption<Currency> | null>(null, FormValidators.Required),
    notificationMethods: new FormBase<NotificationMethodsForm>(getNotificationMethodsForm()),
  };
}

@Injectable({
  providedIn: 'root',
})
export class PreferenceFormService extends FormBase<PreferenceForm> {
  constructor() {
    super(getPreferenceForm());
  }
}

@Component({
  selector: 'app-preference-form',
  templateUrl: './preference-form.component.html',
  styleUrls: ['./preference-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferenceFormComponent
  implements PreferenceFormComponentInput, PreferenceFormComponentOutput
{
  @Input() public saveText = 'Next';
  @Input() public formClasses = '';

  @Output() public saveClicked = new EventEmitter<void>();
  public readonly form: FormBase<PreferenceForm> =
    this._preferenceForm ?? new FormBase<PreferenceForm>(getPreferenceForm());
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @SkipSelf() @Optional() private readonly _preferenceForm: PreferenceFormService | null,
    private readonly _listOptionsService: ListOptionsService
  ) {}

  private _currencyOptions: readonly ListOption<Currency>[] = [];

  public get currencyOptions(): readonly ListOption<Currency>[] {
    return this._currencyOptions;
  }

  @Input()
  public set currencyOptions(value: readonly ListOption<Currency>[]) {
    this._currencyOptions = value;

    if (this._currencyOptions.length) {
      this.currencyControl.setValue(this._currencyOptions[0]);
    }
  }

  protected get notificationMethodsFormGroup(): FormGroup<NotificationMethodsForm> {
    return this.form.controls.notificationMethods;
  }

  protected get currencyControl(): FormControl<ListOption<Currency> | null> {
    return this.form.controls.currency;
  }

  protected get formGroup(): FormGroup<PreferenceForm> {
    return this.form;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }
}

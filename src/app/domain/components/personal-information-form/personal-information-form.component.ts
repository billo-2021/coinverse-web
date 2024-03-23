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

export interface PersonalInformationForm {
  readonly firstName: FormControl<string>;
  readonly lastName: FormControl<string>;
  readonly emailAddress: FormControl<string>;
  readonly phoneNumber: FormControl<string>;
}

export interface PersonalInformationFormComponentInput {
  saveText: string;
  formClasses: string;
}

export interface PersonalInformationFormComponentOutput {
  saveClicked: EventEmitter<void>;
}

export function getPersonalInformationForm(): PersonalInformationForm {
  return {
    firstName: new FormControl<string>('', FormValidators.Required),
    lastName: new FormControl<string>('', FormValidators.Required),
    emailAddress: new FormControl<string>('', FormValidators.RequiredEmail),
    phoneNumber: new FormControl<string>('', FormValidators.Required),
  };
}

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationFormService extends FormBase<PersonalInformationForm> {
  constructor() {
    super(getPersonalInformationForm());
  }
}

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInformationFormComponent
  implements PersonalInformationFormComponentInput, PersonalInformationFormComponentOutput
{
  @Input() public saveText = 'Next';
  @Input() public formClasses = '';

  @Output() public saveClicked: EventEmitter<void> = new EventEmitter<void>();
  public readonly form: FormBase<PersonalInformationForm> =
    this._personalInformationForm ??
    new FormBase<PersonalInformationForm>(getPersonalInformationForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @SkipSelf()
    @Optional()
    private readonly _personalInformationForm: PersonalInformationFormService | null
  ) {}

  protected get formGroup(): FormGroup<PersonalInformationForm> {
    return this.form;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }
}

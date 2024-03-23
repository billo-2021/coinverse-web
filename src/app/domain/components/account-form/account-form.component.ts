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
import { UserRole } from '../../models';

export interface AccountForm {
  readonly username: FormControl<string>;
  readonly password: FormControl<string>;
  readonly role: FormControl<ListOption<UserRole> | null>;
}

export interface AccountFormComponentInput {
  saveText: string;
  hideRole: boolean;
  formClasses: string;
  roleOptions: readonly ListOption<UserRole>[];
  form: FormBase<AccountForm>;
}

export interface AccountFormComponentOutput {
  saveClicked: EventEmitter<void>;
}

export function getAccountForm(): AccountForm {
  return {
    username: new FormControl<string>('', FormValidators.Required),
    password: new FormControl<string>('', FormValidators.Required),
    role: new FormControl<ListOption<UserRole> | null>(null, FormValidators.Required),
  };
}

@Injectable({
  providedIn: 'root',
})
export class AccountFormService extends FormBase<AccountForm> {
  constructor() {
    super(getAccountForm());
  }
}

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent implements AccountFormComponentInput, AccountFormComponentOutput {
  @Input() public saveText = 'Save';
  @Input() public hideRole = true;
  @Input() public formClasses = '';

  @Output() public saveClicked = new EventEmitter<void>();

  public readonly form: FormBase<AccountForm> = this._accountForm ?? new FormBase(getAccountForm());
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @SkipSelf() @Optional() private readonly _accountForm: AccountFormService | null
  ) {}

  private _roleOptions: readonly ListOption<UserRole>[] = [];

  public get roleOptions(): readonly ListOption<UserRole>[] {
    return this._roleOptions;
  }

  @Input() set roleOptions(value: readonly ListOption<UserRole>[]) {
    this._roleOptions = value;

    if (this._roleOptions.length) {
      this.roleControl.setValue(this._roleOptions[0]);
    }
  }

  protected get roleControl(): FormControl<ListOption<UserRole> | null> {
    return this.form.controls.role;
  }

  protected get formGroup(): FormGroup<AccountForm> {
    return this.form;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }
}

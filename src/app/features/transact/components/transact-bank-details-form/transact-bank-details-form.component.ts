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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormBase, Required } from '../../../../common';

export interface TransactBankDetailsForm {
  readonly name: FormControl<string>;
  readonly cardNumber: FormControl<string>;
  readonly expiryDate: FormControl<string>;
  readonly securityCode: FormControl<string>;
}

export interface TransactBankDetailsFormComponentInput {
  saveText: string;
}

export interface TransactionBankDetailsFormComponentOutput {
  saveClicked: EventEmitter<FormBase<TransactBankDetailsForm>>;
}

export function getTransactBankDetailsForm(): TransactBankDetailsForm {
  return {
    name: new FormControl<string>('', Required),
    cardNumber: new FormControl<string>('', Required),
    expiryDate: new FormControl<string>('', Required),
    securityCode: new FormControl<string>('', Required),
  };
}

@Injectable({
  providedIn: 'root',
})
export class TransactBankDetailsFormService extends FormBase<TransactBankDetailsForm> {
  constructor(private readonly _formBuilder: FormBuilder) {
    super(getTransactBankDetailsForm());
  }
}

@Component({
  selector: 'app-transact-bank-details-form',
  templateUrl: './transact-bank-details-form.component.html',
  styleUrls: ['./transact-bank-details-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactBankDetailsFormComponent
  implements TransactBankDetailsFormComponentInput, TransactionBankDetailsFormComponentOutput
{
  @Input() public saveText = 'Continue';

  @Output() public saveClicked = new EventEmitter<FormBase<TransactBankDetailsForm>>();

  public readonly form: FormBase<TransactBankDetailsForm> =
    this._transactBankDetailsForm ??
    new FormBase<TransactBankDetailsForm>(getTransactBankDetailsForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional()
    @SkipSelf()
    private readonly _transactBankDetailsForm: TransactBankDetailsFormService | null
  ) {}

  protected get formGroup(): FormGroup<TransactBankDetailsForm> {
    return this.form;
  }

  public onSave(): void {
    this.saveClicked.emit(this.form);
  }
}

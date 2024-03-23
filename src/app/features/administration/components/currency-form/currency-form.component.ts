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
import { FormBase, FormValidators } from '../../../../shared';

export interface CurrencyForm {
  readonly code: FormControl<string>;
  readonly name: FormControl<string>;
  readonly symbol: FormControl<string>;
  readonly circulatingSupply: FormControl<number>;
}

export interface CurrencyFormComponentInput {
  saveText: string;
  error: string | null;
}

export interface CurrencyFormComponentOutput {
  saveClicked: EventEmitter<FormBase<CurrencyForm>>;
}

export function getCurrencyForm(): CurrencyForm {
  return {
    code: new FormControl<string>('', FormValidators.Required),
    name: new FormControl<string>('', FormValidators.Required),
    symbol: new FormControl<string>('', FormValidators.Required),
    circulatingSupply: new FormControl<number>(0, FormValidators.Required),
  };
}

@Injectable()
export class CurrencyFormService extends FormBase<CurrencyForm> {
  public constructor() {
    super(getCurrencyForm());
  }
}

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFormComponent implements CurrencyFormComponentInput {
  @Input() public saveText = '';
  @Input() public error: string | null = null;

  @Output() public saveClicked = new EventEmitter<FormBase<CurrencyForm>>();
  public readonly form: FormBase<CurrencyForm> =
    this._currencyForm ?? new FormBase<CurrencyForm>(getCurrencyForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional() @SkipSelf() private readonly _currencyForm: CurrencyFormService | null
  ) {}

  protected get formGroup(): FormGroup<CurrencyForm> {
    return this.form;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

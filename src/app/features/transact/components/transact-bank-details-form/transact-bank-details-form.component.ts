import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TransactBankDetailsForm } from '../../models';
import { TransactBankDetailsFormService } from '../../services';

@Component({
  selector: 'app-transact-bank-details-form',
  templateUrl: './transact-bank-details-form.component.html',
  styleUrls: ['./transact-bank-details-form.component.scss'],
})
export class TransactBankDetailsFormComponent {
  @Input() public form: FormGroup<TransactBankDetailsForm>;
  @Input() public saveText = 'Continue';

  @Output() public saveClicked = new EventEmitter<void>();

  public constructor(@SkipSelf() private readonly _form: TransactBankDetailsFormService) {
    this.form = _form.value;
  }

  public onSave(): void {
    this.saveClicked.emit();
  }
}

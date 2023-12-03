import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountFormService } from '../../services/account-form/account-form.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent {
  @Input() public saveText = '';

  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly form: FormGroup;

  public constructor(@SkipSelf() private readonly _accountForm$: AccountFormService) {
    this.form = _accountForm$.value;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

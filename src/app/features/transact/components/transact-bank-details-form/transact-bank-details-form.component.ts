import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transact-bank-details-form',
  templateUrl: './transact-bank-details-form.component.html',
  styleUrls: ['./transact-bank-details-form.component.scss'],
})
export class TransactBankDetailsFormComponent {
  @Input() public form: FormGroup;
  @Input() public saveText = 'Continue';

  @Output() public saveClicked = new EventEmitter<void>();

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.getBankDetailsForm(formBuilder);
  }

  public onSave(): void {
    this.saveClicked.emit();
  }

  private getBankDetailsForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      name: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      securityCode: ['', [Validators.required]],
    });
  }
}

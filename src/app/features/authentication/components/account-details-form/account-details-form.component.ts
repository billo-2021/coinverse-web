import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.scss'],
})
export class AccountDetailsFormComponent {
  @Input() public form?: FormGroup;
  @Input() public saveText = '';

  @Output() public saveClicked = new EventEmitter<FormGroup>();

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-reset-password-request-form',
  templateUrl: './reset-password-request-form.component.html',
  styleUrls: ['./reset-password-request-form.component.scss']
})
export class ResetPasswordRequestFormComponent {
  @Input() public form?: FormGroup;
  @Input() public saveText = 'Reset password';

  @Output() saveClicked = new EventEmitter<FormGroup>();

  public constructor() {
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

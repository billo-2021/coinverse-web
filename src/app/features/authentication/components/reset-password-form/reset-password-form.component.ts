import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordFormComponent {
  @Input() public form?: FormGroup;
  @Input() public saveText = 'Reset password';

  @Output() public saveClicked = new EventEmitter<FormGroup>();

  public constructor() {
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

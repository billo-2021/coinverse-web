import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResetPasswordRequestForm } from '../../models';
import { ResetPasswordRequestFormService } from '../../services/reset-password-request-form.service';
import { TextFieldComponent } from '../../../../form-components/components/text-field/text-field.component';

@Component({
  selector: 'app-reset-password-request-form',
  templateUrl: './reset-password-request-form.component.html',
  styleUrls: ['./reset-password-request-form.component.scss'],
})
export class ResetPasswordRequestFormComponent implements AfterViewInit {
  @Input() public saveText = 'Reset password';

  @Output() saveClicked = new EventEmitter<FormGroup<ResetPasswordRequestForm>>();

  @ViewChild(TextFieldComponent) usernameRef?: TextFieldComponent;

  protected form: FormGroup<ResetPasswordRequestForm>;

  public constructor(
    @SkipSelf() private readonly _resetPasswordRequestForm$: ResetPasswordRequestFormService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = _resetPasswordRequestForm$.value;
  }

  public ngAfterViewInit(): void {
    if (!this.usernameRef) {
      return;
    }

    this.usernameRef.focusInput(false);
    this._changeDetectorRef.detectChanges();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

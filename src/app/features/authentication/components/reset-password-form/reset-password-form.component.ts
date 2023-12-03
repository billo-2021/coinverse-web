import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResetPasswordFormService } from '../../services/reset-password-form.service';
import { ResetPasswordForm } from '../../models';
import { TextFieldComponent } from '../../../../form-components/components/text-field/text-field.component';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent implements AfterViewInit {
  @Input() public saveText = 'Reset password';

  @Output() public saveClicked = new EventEmitter<FormGroup<ResetPasswordForm>>();

  @ViewChild(TextFieldComponent) passwordRef?: TextFieldComponent;

  protected readonly form: FormGroup<ResetPasswordForm>;

  public constructor(
    @SkipSelf() private readonly _resetPasswordForm$: ResetPasswordFormService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    this.form = _resetPasswordForm$.value;
  }

  public ngAfterViewInit(): void {
    if (!this.passwordRef) {
      return;
    }

    this.passwordRef.focusInput(false);
    this._changeDetectorRef.detectChanges();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

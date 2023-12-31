import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, tap } from 'rxjs';

import { AlertService } from '../../../../core';
import { UserAccountService } from '../../../../common';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent {
  public form: FormGroup;
  @Input() public saveText = 'Change Password';
  @Output() public passwordChanged = new EventEmitter<void>();

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _alertService: AlertService,
    private readonly _accountService: UserAccountService
  ) {
    this.form = this.getChangePasswordForm(_formBuilder);
  }

  public onSaveChanges(): void {
    const currentPassword = this.form.controls['currentPassword']?.value as string;
    const newPassword = this.form.controls['newPassword'].value as string;

    this._accountService
      .changePassword({ currentPassword, newPassword })
      .pipe(
        finalize(() => {
          this.form.reset();
          this.form.markAsUntouched();
        }),
        tap((response) => {
          this._alertService.showMessage(response.message);
          this.passwordChanged.emit();
        })
      )
      .subscribe();
  }

  private getChangePasswordForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
  }
}

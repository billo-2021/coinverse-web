import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserAccountService} from "../../../../common/domain-services";
import {finalize, tap} from "rxjs";
import {AlertService} from "../../../../core/services";

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {
  public form: FormGroup;
  @Input() public saveText = 'Change Password';
  @Output() public passwordChanged = new EventEmitter<void>();

  public constructor(private readonly formBuilder: FormBuilder,
                     private readonly alertService: AlertService,
                     private readonly accountService: UserAccountService) {
    this.form = this.getChangePasswordForm(formBuilder);
  }

  public onSaveChanges(): void {
    const currentPassword = this.form.controls['currentPassword']?.value as string;
    const newPassword = this.form.controls['newPassword'].value as string;

    this.accountService.changePassword({currentPassword, newPassword})
      .pipe(
        finalize(() => {
          this.form.reset();
          this.form.markAsUntouched();
        }),
        tap(response => {
          this.alertService.showMessage(response.message);
          this.passwordChanged.emit();
        })).subscribe();
  }

  private getChangePasswordForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]]
    });
  }
}

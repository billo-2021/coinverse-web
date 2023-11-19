import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public isDisabled = false;
  @Input() public length = 8;
  @Input() public allowNumbersOnly = true;
  @ViewChild('ngOtpInput') ngOtpInputRef?: NgOtpInputComponent;

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {
    this.loading$.pipe(
      tap((loading) => {
        if (!this.formControl) {
          return;
        }

        if (loading) {
          this.formControl.disable();
          return;
        }

        this.formControl.enable();
      })
    );
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): FormControl | null {
    return (this.formGroup?.controls[this.name] as FormControl) || null;
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }

  public setValue(value: string): void {
    if (!this.ngOtpInputRef) {
      return;
    }

    this.ngOtpInputRef.setValue(value);
    const elementId = this.ngOtpInputRef.getBoxId(0);
    this.ngOtpInputRef.focusTo(elementId);
  }
}

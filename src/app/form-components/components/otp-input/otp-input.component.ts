import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { NgOtpInputComponent } from 'ng-otp-input';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent implements OnInit {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public isDisabled = false;
  @Input() public length = 8;
  @Input() public allowNumbersOnly = true;
  @ViewChild('ngOtpInput') ngOtpInputRef?: NgOtpInputComponent;

  protected formGroup?: FormGroup;
  protected formControl?: FormControl;

  public constructor(
    private loadingService: LoadingService,
    @Optional() private formGroupDirective: FormGroupDirective
  ) {
    this.loadingService.loading$.pipe(
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

  public ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
    this.formControl = this.formGroup?.controls[this.name] as FormControl;
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

import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { LoadingService } from '../../../core/services/loading/loading.service';

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This is required',
        email: 'Email is invalid',
      },
    },
  ],
})
export class PasswordFieldComponent implements OnInit {
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public isDisabled = false;
  @Input() hasClear = false;
  @Input() public autocomplete = 'current-password';

  protected formGroup?: FormGroup;
  protected readonly loading$ = this.loadingService.loading$;

  public constructor(
    private readonly loadingService: LoadingService,
    @Optional() private readonly formGroupDirective: FormGroupDirective
  ) {
  }

  ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
  }
}

import {ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {LoadingService} from "../../../core/services/loading/loading.service";

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-phone-number-field',
  templateUrl: './phone-number-field.component.html',
  styleUrls: ['./phone-number-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'input-text-field-wrapper'},
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This is required',
        email: 'Email is invalid'
      }
    }
  ]
})
export class PhoneNumberFieldComponent {
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public countryCode = '+27';
  @Input() public phoneMaskAfterCountryCode = '(###) ###-##-##'
  @Input() public isDisabled = false;
  @Input() public hasClear = true;

  protected formGroup?: FormGroup;
  protected readonly loading$ = this.loadingService.loading$;

  public constructor(private readonly loadingService: LoadingService,
                     @Optional() private readonly formGroupDirective: FormGroupDirective) {
  }

  public ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
  }
}

import { ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { LoadingService } from '../../../core/services/loading/loading.service';

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'input-text-field-wrapper' },
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
export class TextFieldComponent {
  @Input() public type: 'text' | 'email' = 'text';
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder: string = '';
  @Input() public isDisabled = false;
  @Input() public hasClear = true;
  @Input() public autocomplete = 'on';

  protected formGroup?: FormGroup;
  protected readonly loading$ = this.loadingService.loading$;

  public constructor(
    private loadingService: LoadingService,
    @Optional() private formGroupDirective: FormGroupDirective
  ) {}

  public ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
  }
}

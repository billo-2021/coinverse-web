import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { BehaviorSubject } from 'rxjs';
import { TuiInputPasswordComponent } from '@taiga-ui/kit';

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent {
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() hasClear = false;
  @Input() public autocomplete = 'current-password';

  private _disabled = new BehaviorSubject<boolean>(false);
  @ViewChild(TuiInputPasswordComponent) private _inputPasswordRef?: TuiInputPasswordComponent;

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {}

  @Input()
  public set isDisabled(value: boolean) {
    this._disabled.next(value);
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): AbstractControl<unknown> | null {
    return this.formGroup?.controls[this.name] || null;
  }

  public focusInput(preventScroll: boolean) {
    this._inputPasswordRef?.nativeFocusableElement?.focus({ preventScroll: preventScroll });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { BehaviorSubject } from 'rxjs';
import { TuiInputComponent } from '@taiga-ui/kit';

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent {
  @Input() public type: 'text' | 'email' = 'text';
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public hasClear = true;
  @Input() public autocomplete = 'on';

  private _disabled = new BehaviorSubject<boolean>(false);
  @ViewChild(TuiInputComponent) private _inputRef?: TuiInputComponent;

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {}

  @Input()
  public set isDisabled(value: boolean) {
    this._disabled.next(value);
  }

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `input-text-field-wrapper ${this._classes}`;
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): FormControl | null {
    return (this.formGroup?.controls[this.name] as FormControl) || null;
  }

  public focusInput(preventScroll: boolean) {
    this._inputRef?.nativeFocusableElement?.focus({ preventScroll: preventScroll });
  }
}

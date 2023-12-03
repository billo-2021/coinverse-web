import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export type SizeType = 'm' | 'l';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxComponent {
  @Input() size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';

  private _disabled = new BehaviorSubject<boolean>(false);

  public constructor(@Optional() private _formGroupDirective: FormGroupDirective) {}

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
}

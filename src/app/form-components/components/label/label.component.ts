import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

export interface LabelComponentInput {
  for: string;
  label: string;
}

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements LabelComponentInput {
  @Input() public for = '';
  @Input() public label = '';

  @HostBinding('class') private _classes = 'block';

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }
}

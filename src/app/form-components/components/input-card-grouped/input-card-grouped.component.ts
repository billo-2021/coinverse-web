import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

export interface InputCardGroupedComponentInput {
  name: string;
  label: string;
}

@Component({
  selector: 'app-input-card-grouped',
  templateUrl: './input-card-grouped.component.html',
  styleUrls: ['./input-card-grouped.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCardGroupedComponent implements InputCardGroupedComponentInput {
  @Input() public name = '';
  @Input() public label = '';

  @HostBinding('class') private _classes = 'block';

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): FormControl | null {
    return (this.formGroup?.controls[this.name] as FormControl) || null;
  }
}

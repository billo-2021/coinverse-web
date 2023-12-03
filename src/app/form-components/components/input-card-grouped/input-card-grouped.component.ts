import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DestroyService } from '../../../core/services/destroy/destroy.service';

@Component({
  selector: 'app-input-card-grouped',
  templateUrl: './input-card-grouped.component.html',
  styleUrls: ['./input-card-grouped.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class InputCardGroupedComponent {
  @Input() public name = '';
  @Input() public label = '';

  private _disabled = new BehaviorSubject<boolean>(false);

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  @Input()
  public set isDisabled(value: boolean) {
    this._disabled.next(value);
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): FormControl | null {
    return (this.formGroup?.controls[this.name] as FormControl) || null;
  }
}

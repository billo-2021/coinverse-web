import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { Observable } from "rxjs";

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldComponent {
  @Input() public type: 'text' | 'email' = 'text';
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public isDisabled = false;
  @Input() public hasClear = true;
  @Input() public autocomplete = 'on';

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {
  }

  @Input()
  public set ngClass(classNames: string) {
    this._classes = classNames;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `input-text-field-wrapper ${this._classes}`;
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }
}

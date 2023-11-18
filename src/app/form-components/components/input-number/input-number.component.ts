import { Component, Input, Optional } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { SizeType } from '../text-field/text-field.component';
import { Observable } from "rxjs";

type DecimalType = 'not-zero' | 'always' | 'never';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent {
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public isDisabled = false;
  @Input() public hasClear = true;
  @Input() public autocomplete = 'on';
  @Input() public prefix = '';
  @Input() public precision = 2;
  @Input() public decimal: DecimalType = 'not-zero';

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }
}

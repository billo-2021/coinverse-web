import { Component, Input, Optional } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { Observable } from 'rxjs';

export type SizeType = 'm' | 'l';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent {
  @Input() size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public isDisabled = false;

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private _formGroupDirective: FormGroupDirective
  ) {}

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }
}

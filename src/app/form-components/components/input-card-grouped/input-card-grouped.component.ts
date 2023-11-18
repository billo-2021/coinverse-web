import { Component, Input, Optional } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-input-card-grouped',
  templateUrl: './input-card-grouped.component.html',
  styleUrls: ['./input-card-grouped.component.scss']
})
export class InputCardGroupedComponent {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public isDisabled = false;

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {

    this.loading$.pipe(
      tap((loading) => {
        if (!this.formControl) {
          return;
        }

        if (loading) {
          this.formControl.disable();
          return;
        }

        this.formControl.enable();
      }));
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): FormControl | null {
    return this.formGroup?.controls[this.name] as FormControl || null;
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { ListOption } from '../../../../form-components/types';
import { ListOptionUtils } from '../../../../form-components/utils';

@Component({
  selector: 'app-preference-details-form',
  templateUrl: './preference-details-form.component.html',
  styleUrls: ['./preference-details-form.component.scss'],
})
export class PreferenceDetailsFormComponent {
  @Input() public form?: FormGroup;
  @Input() public saveText = '';
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly FormGroup = FormGroup;
  protected readonly currencyOptions$: Observable<ListOption[]>;

  public constructor(private readonly lookupService: LookupService) {
    this.currencyOptions$ = lookupService.getAllCurrencies().pipe(
      map((currencyResponse) => currencyResponse.map(ListOptionUtils.toListOption)),
      tap((currencyOptions) => {
        this.form?.controls['currency']?.setValue(currencyOptions[0]);
      })
    );
  }

  public getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

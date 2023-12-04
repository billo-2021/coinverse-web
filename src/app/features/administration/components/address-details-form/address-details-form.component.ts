import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { BaseComponent, LookupService } from '../../../../common';
import { CountryResponse } from '../../../../common/domain-models/lookup';

import { Option } from '../../../../form-components/types';

@Component({
  selector: 'app-address-details-form',
  templateUrl: './address-details-form.component.html',
  styleUrls: ['./address-details-form.component.scss'],
})
export class AddressDetailsFormComponent extends BaseComponent {
  @Input() public form?: FormGroup;
  @Input() public saveText = '';

  @Output() public formChange = new EventEmitter<FormGroup>();
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected countryOptions$: Observable<Option<CountryResponse>[]>;

  public constructor(private readonly lookupService: LookupService) {
    super();

    this.countryOptions$ = this.lookupService.getAllCountries().pipe(
      map((countryResponse) =>
        countryResponse.map((country) => ({
          code: country.code,
          name: country.name,
          value: country,
          avatar: country.code,
        }))
      )
    );
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

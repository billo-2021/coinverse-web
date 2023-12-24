import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';

import { LookupService } from '../../domain-services';

import { ListOption } from '../../../form-components';
import { AddressFormService } from '../../services';
import { CountryResponse } from '../../domain-models/lookup';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent {
  @Input() public saveText = '';

  @Output() public formChange = new EventEmitter<FormGroup>();
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly form: FormGroup;
  protected countryOptions$: Observable<ListOption<CountryResponse>[]>;

  public constructor(
    @SkipSelf() private readonly _addressForm$: AddressFormService,
    private readonly lookupService: LookupService
  ) {
    this.form = _addressForm$.value;
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

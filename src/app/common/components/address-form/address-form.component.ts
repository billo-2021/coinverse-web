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
import { LookupService } from '../../domain-services/lookup/lookup.service';
import { map, Observable } from 'rxjs';
import { Option } from '../../../form-components/types';
import { CountryResponse } from '../../domain-models';
import { AddressFormService } from '../../services/address-form/address-form.service';

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
  protected countryOptions$: Observable<Option<CountryResponse>[]>;

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

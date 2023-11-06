import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ListOption } from '../../../../form-components/types';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { ListOptionUtils } from '../../../../form-components/utils';
import { BaseComponent } from '../../../../common/components';

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

  protected countryOptions$: Observable<ListOption[]>;

  public constructor(private readonly lookupService: LookupService) {
    super();

    this.countryOptions$ = this.lookupService.getAllCountries().pipe(
      map((res) => {
        return res.map(ListOptionUtils.toListOption);
      })
    );
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }

  ngOnInit(): void {}
}

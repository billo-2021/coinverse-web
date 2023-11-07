import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { map, Observable } from 'rxjs';
import { BaseComponent } from '../../../../common/components';
import { ListOption } from '../../../../form-components/types';
import { ListOptionUtils } from '../../../../form-components/utils';

@Component({
  selector: 'app-address-details-form',
  templateUrl: './address-details-form.component.html',
  styleUrls: ['./address-details-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
}

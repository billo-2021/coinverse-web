import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ListOptionUtils } from '../../../../form-components/utils';

const roles = [
  {code: 'CS', name: 'customer'},
  {code: 'AD', name: 'admin'},
];

@Component({
  selector: 'app-account-details-form',
  templateUrl: './account-details-form.component.html',
  styleUrls: ['./account-details-form.component.scss'],
})
export class AccountDetailsFormComponent implements OnInit {
  @Input() public form?: FormGroup;
  @Input() public saveText = '';

  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly roleOptions = roles.map(ListOptionUtils.toListOption);

  ngOnInit(): void {
    if (!this.roleOptions.length) {
      return;
    }

    this.form?.controls['role'].setValue(this.roleOptions[0]);
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss'],
})
export class CurrencyFormComponent {
  @Input() public form?: FormGroup;
  @Input() public title = '';
  @Input() public subtitle = '';
  @Input() public saveText = '';
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  public constructor() {}

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

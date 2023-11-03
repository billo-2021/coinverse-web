import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss']
})
export class PersonalInformationFormComponent {
  @Input() public form?: FormGroup;
  @Input() public saveText = '';
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  public constructor() {
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

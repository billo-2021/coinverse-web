import { Component, EventEmitter, Input, Output, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PersonalInformationForm } from '../../models';
import { PersonalInformationFormService } from '../../services/personal-information-form/personal-information-form.service';

@Component({
  selector: 'app-personal-information-form',
  templateUrl: './personal-information-form.component.html',
  styleUrls: ['./personal-information-form.component.scss'],
})
export class PersonalInformationFormComponent {
  @Input() public saveText = '';
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly form: FormGroup<PersonalInformationForm>;

  public constructor(
    @SkipSelf() private readonly _personalInformationForm$: PersonalInformationFormService
  ) {
    this.form = _personalInformationForm$.value;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}

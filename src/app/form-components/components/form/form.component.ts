import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Maybe} from "../../../core/types/maybe";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterContentInit {
  @Input() public formGroup = new FormGroup({});
  @Input() public title: Maybe<string>;
  @Input() public isCancelShown = false;
  @Input() public cancelText = 'Cancel';
  @Input() public saveText = 'Save';
  @Input() public isCancelDisabled = false;
  @Input() public isSaveDisabled = false;
  @Input() public isLoading = false;

  @Output() public cancelClicked = new EventEmitter<void>();
  @Output() public saveClicked = new EventEmitter<void>();

  public constructor() {
  }

  public onCancelClicked(): void {
    this.cancelClicked.emit();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }

  ngOnInit(): void {
    console.log('Form', this.formGroup.controls);
  }

  ngAfterContentInit(): void {
    console.log('After content Form', this.formGroup.controls);
  }
}

import {AfterViewInit, Component, ContentChild, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {MatFormField, MatFormFieldControl} from "@angular/material/form-field";
import {Maybe} from "../../../core/types/maybe";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit, AfterViewInit {
  @Input() public label: Maybe<string>;
  @Input() public control: Maybe<AbstractControl>;
  @Input() public appearance: 'fill' | 'outline' = 'fill';

  @ContentChild('materialFormField', {static: true})
  public formFieldControl?: MatFormFieldControl<any>;


  @ContentChild(MatFormFieldControl, {static: true})
  public matFormField: Maybe<MatFormField>;

  public constructor() {
  }

  ngOnInit(): void {
    if (Maybe.isSome(this.formFieldControl) && Maybe.isSome(this.matFormField)) {
      this.matFormField._control = this.formFieldControl;
    }
  }

  ngAfterViewInit(): void {
    console.log('After view ');
  }
}

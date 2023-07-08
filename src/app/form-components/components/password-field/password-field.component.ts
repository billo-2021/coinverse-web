import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public control = new FormControl('');
  @Input() public placeholder: string = '';
  @Input() public appearance: 'fill' | 'outline' = 'outline';

  public constructor() {
  }
}

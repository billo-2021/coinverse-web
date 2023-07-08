import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public variant: 'primary' | 'secondary' | 'alternate' = 'primary';
  @Input() public text = '';
  @Input() public isDisabled = false;
  @Input() public type: 'button' | 'submit' | 'reset' = 'button';
  @Input() public showLoadingIndicator = false;
  @Input() public isLoading = false;

  @Output() public click = new EventEmitter<void>();

  public constructor() {
  }

  public onClick() {
    this.click.emit();
  }
}

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ButtonAppearance, ButtonShape, ButtonSize, ButtonType } from '../../types';

export interface IconButtonComponentInput {
  type: ButtonType;
  size: ButtonSize;
  appearance: ButtonAppearance;
  text: string;
  title: string;
  disabled: boolean;
  icon: string | null;
  shape: ButtonShape;
}

export interface IconButtonComponentOutput {
  clicked: EventEmitter<void>;
}

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements IconButtonComponentInput, IconButtonComponentOutput {
  @Input() public type: ButtonType = 'button';
  @Input() public size: ButtonSize = 's';
  @Input() public appearance: ButtonAppearance = 'flat';
  @Input() public text = '';
  @Input() public title = '';
  @Input() public disabled = false;
  @Input() public icon: string | null = null;
  @Input() public shape: ButtonShape = 'rounded';

  @Output() public clicked = new EventEmitter<void>();
  @HostBinding('class') private _classes = 'block';

  public onClick() {
    this.clicked.emit();
  }
}

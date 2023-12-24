import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { AppearanceType, ButtonType, ShapeType, SizeType } from '../button/button.type';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() public type: ButtonType = 'button';
  @Input() size: SizeType = 's';
  @Input() public appearance: AppearanceType = 'flat';
  @Input() public text = '';
  @Input() public title = '';
  @Input() public isDisabled = false;
  @Input() public icon: string | null = null;
  @Input() public shape: ShapeType = 'rounded';

  @Output() public clicked = new EventEmitter<void>();
  @HostBinding('class') private _classes = 'block';

  public onClick() {
    this.clicked.emit();
  }
}

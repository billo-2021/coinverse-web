import {Component, EventEmitter, Input, Output} from '@angular/core';

export type AppearanceType = 'primary' | 'secondary' | 'secondary-destructive'
  | 'accent' | 'flat' | 'outline' | 'icon' | 'whiteblock' | 'whiteblock-active';

export type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl';

export type ButtonType = 'button' | 'submit' | 'reset';

type ShapeType = 'square' | 'rounded' | null;

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public type: ButtonType = 'button';
  @Input() size: SizeType = 'm';
  @Input() public appearance: AppearanceType = 'primary';
  @Input() public text = '';
  @Input() public title = '';
  @Input() public icon: string | null = null;
  @Input() public isDisabled = false;
  @Input() public showLoadingIndicator = false;
  @Input() public isLoading = false;
  @Input() public shape: ShapeType = null;

  @Output() public click = new EventEmitter<void>();

  public constructor() {
  }

  public onClick() {
    this.click.emit();
  }
}

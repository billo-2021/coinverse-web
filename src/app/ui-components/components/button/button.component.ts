import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AppearanceType, ButtonType, ShapeType, SizeType } from './button.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @Output() public clicked = new EventEmitter<void>();

  public onClick() {
    this.clicked.emit();
  }
}

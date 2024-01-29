import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonAppearance, ButtonShape, ButtonSize, ButtonType } from '../../types';

export interface ButtonComponentInput {
  type: ButtonType;
  size: ButtonSize;
  appearance: ButtonAppearance;
  text: string;
  title: string;
  icon: string | null;
  disabled: boolean;
  loading: boolean;
  showLoader: boolean;
  shape: ButtonShape;
}

export interface ButtonComponentOutput {
  clicked: EventEmitter<void>;
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements ButtonComponentInput, ButtonComponentOutput {
  @Input() public type: ButtonType = 'button';
  @Input() size: ButtonSize = 'm';
  @Input() public appearance: ButtonAppearance = 'primary';
  @Input() public text = '';
  @Input() public title = '';
  @Input() public icon: string | null = null;
  @Input() public disabled = false;
  @Input() public loading = false;
  @Input() public showLoader = false;
  @Input() public shape: ButtonShape = null;

  @Output() public clicked = new EventEmitter<void>();
  @HostBinding('class') private _classes = 'block';

  public onClick() {
    this.clicked.emit();
  }
}

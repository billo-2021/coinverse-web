import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

type StatusType = 'info' | 'error' | 'warning' | 'success';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() public status: StatusType = 'info';
  @Input() public hasIcon = false;

  @Output() public closeClicked = new EventEmitter<void>();

  public constructor() {}

  public onClose() {
    this.closeClicked.emit();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

export type NotificationStatus = 'error' | 'info' | 'success' | 'warning';

export interface NotificationComponentInput {
  status: NotificationStatus;
  hasIcon: boolean;
}

export interface NotificationComponentOutput {
  closeClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent
  implements NotificationComponentInput, NotificationComponentOutput
{
  @Input() public status: NotificationStatus = 'info';
  @Input() public hasIcon = false;
  @Output() public closeClicked = new EventEmitter<void>();

  @HostBinding('class') private _classes = 'block mb-6';

  public onClose() {
    this.closeClicked.emit();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { StatusType } from './notification.type';

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
  @HostBinding('class') private _classes = 'block max-w-md m-auto mb-6';

  public onClose() {
    this.closeClicked.emit();
  }
}

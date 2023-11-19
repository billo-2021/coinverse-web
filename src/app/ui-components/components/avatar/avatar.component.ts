import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SizeType } from './avatar.type';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() public text = '';
  @Input() public autoColor = false;
  @Input() public rounded = true;
  @Input() public size: SizeType = 'm';
  @Input() public avatarUrl: string | null = null;
}

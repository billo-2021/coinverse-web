import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

type SizeType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() public text = '';
  @Input() public autoColor = false;
  @Input() public rounded = true;
  @Input() public size: SizeType = 'm';
  @Input() public avatarUrl: string | null = null;

  public constructor() {
  }
}

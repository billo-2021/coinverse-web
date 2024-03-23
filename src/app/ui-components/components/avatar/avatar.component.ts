import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { SizeXXL, SizeXXS } from '../../../shared';

export type AvatarSize = SizeXXL | SizeXXS;

export interface AvatarComponentInput {
  text: string;
  autoColor: boolean;
  rounded: boolean;
  size: AvatarSize;
  avatarUrl: string | null;
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements AvatarComponentInput {
  @Input() public text = '';
  @Input() public autoColor = false;
  @Input() public rounded = true;
  @Input() public size: AvatarSize = 'm';
  @Input() public avatarUrl: string | null = null;

  @HostBinding('class') private _classes = 'block';
}

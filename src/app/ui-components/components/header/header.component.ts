import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export interface HeaderComponentInput {
  title: string;
  subtitle: string | null;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements HeaderComponentInput {
  @Input() title = '';
  @Input() subtitle: string | null = null;

  @HostBinding('class') private _classes = 'block';
}

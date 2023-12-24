import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  ViewEncapsulation,
} from '@angular/core';

import { appNameToken } from '../../../common';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  @HostBinding('class') private _classes = 'block w-full p-8 mx-auto';

  constructor(@Inject(appNameToken) private readonly _appNameToken: string) {}

  protected get appName(): string {
    return this._appNameToken;
  }
}

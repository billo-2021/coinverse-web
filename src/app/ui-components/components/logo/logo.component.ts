import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { WEB_CONFIG_TOKEN, WebConfig } from '../../../shared';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private readonly _appName: string = this._webConfig.appName;
  @HostBinding('class') private _classes = 'block w-full p-8 mx-auto';

  constructor(@Inject(WEB_CONFIG_TOKEN) private readonly _webConfig: WebConfig) {}

  protected get appName(): string {
    return this._appName;
  }
}

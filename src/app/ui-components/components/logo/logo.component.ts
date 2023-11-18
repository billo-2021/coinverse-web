import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from '@angular/core';
import { appNameToken } from "../../../common/config";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @HostBinding('class') classes = 'logo-icon-container';
  private readonly _appName: string;

  constructor(@Inject(appNameToken) private readonly _appNameToken: string) {
    this._appName = _appNameToken;
  }

  protected get appName(): string {
    return this._appName;
  }
}

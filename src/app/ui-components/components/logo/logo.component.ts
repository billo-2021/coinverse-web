import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { appNameToken } from '../../../common/config';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  constructor(@Inject(appNameToken) private readonly _appNameToken: string) {}

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `logo-icon-container ${this._classes}`;
  }

  protected get appName(): string {
    return this._appNameToken;
  }
}

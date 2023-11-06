import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-reset-password-result',
  templateUrl: './reset-password-result.component.html',
  styleUrls: ['./reset-password-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordResultComponent {
  public constructor() {}
}

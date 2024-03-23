import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LoadingController } from '../../../../shared';

export interface ResetPasswordRequestResultComponentInput {
  passwordLinkRecipient: string;
}

export interface ResetPasswordRequestResultComponentOutput {
  resendClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-reset-password-request-result',
  templateUrl: './reset-password-request-result.component.html',
  styleUrls: ['./reset-password-request-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordRequestResultComponent
  implements ResetPasswordRequestResultComponentInput, ResetPasswordRequestResultComponentOutput
{
  @Input() public passwordLinkRecipient = '';

  @Output() public resendClicked = new EventEmitter<void>();
  protected readonly loading$ = this.loadingService.loading$;
  @HostBinding('class') private _classes = 'block';

  public constructor(private readonly loadingService: LoadingController) {}

  public onResend(): void {
    this.resendClicked.emit();
  }
}

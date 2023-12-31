import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoadingService } from '../../../../core';

@Component({
  selector: 'app-reset-password-request-result',
  templateUrl: './reset-password-request-result.component.html',
  styleUrls: ['./reset-password-request-result.component.scss'],
})
export class ResetPasswordRequestResultComponent {
  @Input() public passwordLinkRecipient = '';

  @Output() public resendClicked = new EventEmitter<void>();

  protected readonly loading$ = this.loadingService.loading$;

  public constructor(private readonly loadingService: LoadingService) {}

  public onResend(): void {
    this.resendClicked.emit();
  }
}

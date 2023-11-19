import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingService } from '../../../../core/services/loading/loading.service';

@Component({
  selector: 'app-reset-password-request-result',
  templateUrl: './reset-password-request-result.component.html',
  styleUrls: ['./reset-password-request-result.component.scss'],
})
export class ResetPasswordRequestResultComponent {
  @Input() public username = '';
  @Input() public passwordLinkRecipient: string | null = null;

  @Output() public resendClicked = new EventEmitter<void>();
  @Output() public retryClicked = new EventEmitter<void>();

  protected readonly loading$ = this.loadingService.loading$;

  public constructor(private readonly loadingService: LoadingService) {}

  public onResend(): void {
    this.resendClicked.emit();
  }

  public onRetry(): void {
    this.retryClicked.emit();
  }
}

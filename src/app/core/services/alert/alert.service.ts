import { Inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(@Inject(TuiAlertService) private readonly _alerts: TuiAlertService) {}

  public showErrorMessage(message: string, heading?: string): void {
    this._alerts
      .open(this.getSimpleMessageTemplate(message), {
        label: heading || 'Error',
        status: TuiNotification.Error,
      })
      .subscribe();
  }

  public showMessage(message: string, heading?: string): void {
    this._alerts
      .open(this.getSimpleMessageTemplate(message), {
        label: heading || 'Message',
      })
      .subscribe();
  }

  public getSimpleMessageTemplate(message: string): string {
    return `
    <p>${message}</p>
    `;
  }
}

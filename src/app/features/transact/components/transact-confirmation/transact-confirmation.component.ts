import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaymentResponse} from "../../../../common/domain-models/transact/payment-response";

@Component({
  selector: 'app-transact-confirmation',
  templateUrl: './transact-confirmation.component.html',
  styleUrls: ['./transact-confirmation.component.scss']
})
export class TransactConfirmationComponent {
  @Input() public quoteId: number | null = null;

  @Input() paymentResponse: PaymentResponse | null = null;
  @Output() payAgainClicked = new EventEmitter<void>();
  @Output() viewPaymentsClicked = new EventEmitter<void>();

  public constructor() {
  }

  public onViewPayments(): void {
    this.viewPaymentsClicked.emit();
  }

  public onPayAgain(): void {
    this.payAgainClicked.emit();
  }
}

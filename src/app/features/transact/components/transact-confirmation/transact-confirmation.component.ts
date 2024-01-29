import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Payment } from '../../../../domain';

export interface TransactConfirmationComponentInput {
  quoteId: number | null;
  paymentResponse: Payment | null;
}

export interface TransactionConfirmationComponentOutput {
  payAgainClicked: EventEmitter<void>;
  viewPaymentsClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-transact-confirmation',
  templateUrl: './transact-confirmation.component.html',
  styleUrls: ['./transact-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactConfirmationComponent
  implements TransactConfirmationComponentInput, TransactionConfirmationComponentOutput
{
  @Input() public quoteId: number | null = null;

  @Input() paymentResponse: Payment | null = null;
  @Output() payAgainClicked = new EventEmitter<void>();

  @Output() viewPaymentsClicked = new EventEmitter<void>();

  @HostBinding('class') private _classes = 'block';

  public onViewPayments(): void {
    this.viewPaymentsClicked.emit();
  }

  public onPayAgain(): void {
    this.payAgainClicked.emit();
  }
}

import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-transact-quote',
  templateUrl: './transact-quote.component.html',
  styleUrls: ['./transact-quote.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactQuoteComponent {
  @HostBinding('class') private _classes = 'block';
}

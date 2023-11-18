import { Component, Input, Optional } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { Observable } from "rxjs";

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.scss'],
})
export class InputCardComponent {
  @Input() public type: 'text' | 'email' = 'text';
  @Input() public size: SizeType = 'm';
  @Input() public cardNumberName = 'cardNumber';
  @Input() public expireName = 'expiryDate';
  @Input() public cvcName = 'securityCode';
  @Input() public cardNumberLabel = 'Card Number';
  @Input() public expireLabel = 'Expiry Date';
  @Input() public cvcLabel = 'Security Code';
  @Input() public isDisabled = false;
  @Input() public hasClear = true;
  @Input() public autocompleteEnabled = true;

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {
  }

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }
}

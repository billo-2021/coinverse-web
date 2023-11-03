import {Component, Input, Optional} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {LoadingService} from "../../../core/services/loading/loading.service";

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.scss']
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

  protected formGroup?: FormGroup;
  protected readonly loading$ = this.loadingService.loading$;

  public constructor(private loadingService: LoadingService,
                     @Optional() private formGroupDirective: FormGroupDirective) {
  }

  public ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
  }
}

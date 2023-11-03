import {Component, Input, OnInit, Optional} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {LoadingService} from "../../../core/services/loading/loading.service";
import {of, tap} from "rxjs";
import {TUI_INPUT_CARD_GROUPED_TEXTS} from "@taiga-ui/addon-commerce";

@Component({
  selector: 'app-input-card-grouped',
  templateUrl: './input-card-grouped.component.html',
  styleUrls: ['./input-card-grouped.component.scss'],
  providers: [{
    provide: TUI_INPUT_CARD_GROUPED_TEXTS,
    useValue: of({
      cardNumberText: 'Number',
      expiryText: 'mm/yy',
      cvcText: 'Code'
    })
  }]
})
export class InputCardGroupedComponent implements OnInit {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public isDisabled = false;

  protected formGroup?: FormGroup;
  protected formControl?: FormControl;

  public constructor(private loadingService: LoadingService,
                     @Optional() private formGroupDirective: FormGroupDirective) {

    this.loadingService.loading$.pipe(
      tap((loading) => {
        if (!this.formControl) {
          return;
        }

        if (loading) {
          this.formControl.disable();
          return;
        }

        this.formControl.enable();
      })
    );
  }

  public ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
    this.formControl = this.formGroup?.controls[this.name] as FormControl;
  }
}

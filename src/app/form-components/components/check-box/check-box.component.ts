import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading/loading.service';

export type SizeType = 'm' | 'l';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent implements OnInit {
  @Input() size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public isDisabled = false;

  protected formGroup?: FormGroup;
  protected readonly loading$ = this.loadingService.loading$;

  public constructor(
    private readonly loadingService: LoadingService,
    @Optional() private formGroupDirective: FormGroupDirective
  ) {}

  public ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { DestroyState, LoadingController } from '../../../shared';
import { FormUtils } from '../../utils';

export interface FormComponentInput {
  valid: boolean;
  title?: string;
  subtitle?: string;
  cancelHidden: boolean;
  cancelText: string;
  saveText: string;
  cancelDisabled: boolean;
  saveDisabled: boolean;
}

export interface FormComponentOutput {
  cancelClicked: EventEmitter<void>;
  saveClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyState],
})
export class FormComponent implements FormComponentInput, FormComponentOutput, OnInit {
  @Input() public valid = false;
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public cancelHidden = true;
  @Input() public cancelText = 'Cancel';
  @Input() public saveText = 'Save';
  @Input() public cancelDisabled = false;
  @Input() public saveDisabled = false;

  @Output() public cancelClicked = new EventEmitter<void>();
  @Output() public saveClicked = new EventEmitter<void>();

  @HostBinding('class') private _classes = 'block';

  public constructor(
    private readonly _loadingService: LoadingController,
    @Optional() private _formGroupDirective: FormGroupDirective,
    @Self() private readonly _destroy$: DestroyState
  ) {}

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  public ngOnInit(): void {
    FormUtils.disableWhenLoading(this.formGroup, this.loading$)
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  public onCancelClicked(): void {
    this.cancelClicked.emit();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit();
  }
}

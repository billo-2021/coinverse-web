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
import { LoadingService } from '../../../core/services/loading/loading.service';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { disableWhenLoading } from '../../utils';
import { DestroyService } from '../../../core/services/destroy/destroy.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class FormComponent implements OnInit {
  @Input() public isValid = false;
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public isCancelShown = false;
  @Input() public cancelText = 'Cancel';
  @Input() public saveText = 'Save';
  @Input() public isCancelDisabled = false;
  @Input() public isSaveDisabled = false;
  @Output() public cancelClicked = new EventEmitter<void>();
  @Output() public saveClicked = new EventEmitter<void>();

  private _disabled = new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly _loadingService: LoadingService,
    @Optional() private _formGroupDirective: FormGroupDirective,
    @Self() private readonly _destroy$: DestroyService
  ) {}

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `block ${this._classes}`;
  }

  protected get loading$(): Observable<boolean> {
    return this._loadingService.loading$;
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  public ngOnInit(): void {
    disableWhenLoading(this.formGroup, this._disabled.asObservable(), this.loading$)
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

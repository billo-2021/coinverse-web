import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {TUI_VALIDATION_ERRORS} from "@taiga-ui/kit";
import {ListOption} from '../../types';
import {BehaviorSubject, filter, merge, Observable, Subject} from "rxjs";
import {TUI_DEFAULT_MATCHER} from "@taiga-ui/cdk";
import {LoadingService} from "../../../core/services/loading/loading.service";

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'combo-box'},
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This is required',
        email: 'Email is invalid'
      }
    }
  ]
})
export class ComboBoxComponent implements OnInit, OnChanges {
  @Input() size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public options: ListOption[] = [];
  @Input() public isDisabled = false;
  protected formGroup?: FormGroup;
  protected readonly loading$ = this.loadingService.loading$;
  private readonly search$ = new Subject<string | null>();
  private readonly _options = new BehaviorSubject<ListOption[]>(this.options);
  public readonly options$: Observable<readonly ListOption[] | null> = this._options.asObservable();
  private readonly _height = new BehaviorSubject((this.options.length && this.options.length * 44) || 44);
  public readonly height$ = this._height.asObservable();

  public constructor(private readonly loadingService: LoadingService,
                     @Optional() private formGroupDirective: FormGroupDirective) {
    const a = merge(this._options,
      this.search$.pipe(filter(value => value !== null))
    )
  }

  public ngOnInit(): void {
    if (!this.formGroupDirective) {
      return;
    }

    this.formGroup = this.formGroupDirective.form;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options']) {
      return;
    }

    this._options.next(this.options);
    this._height.next((this.options.length && this.options.length * 44) || 44);
  }

  public onSearch(query: string | null) {
    this.search$.next(query);
    const filteredOptions = this.options
      .filter(option => TUI_DEFAULT_MATCHER(option, query || ''));

    this._options.next(filteredOptions);
    this._height.next((filteredOptions.length && filteredOptions.length * 44) || 44);
  }

  public extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TuiBreakpointService } from '@taiga-ui/core';
import { TuiStepperComponent } from '@taiga-ui/kit';

export type StepOptions = {
  readonly state: 'error' | 'normal' | 'pass';
  readonly isDisabled: boolean;
};

export interface StepperComponentInput {
  activeStepIndex: number;
  steps: readonly string[];
  stepsOptions: readonly StepOptions[];
}

export interface StepperComponentOutput {
  activeStepIndexChange: EventEmitter<number>;
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements StepperComponentInput, StepperComponentOutput {
  @Input() activeStepIndex = 0;
  @Input() steps: readonly string[] = [];
  @Input() stepsOptions: readonly StepOptions[] = [];

  @Output() activeStepIndexChange = new EventEmitter<number>();

  @ViewChild('tuiStepper') private tuiStepper?: TuiStepperComponent;

  @HostBinding('class') private _classes = 'block stepper';

  public constructor(
    @Inject(TuiBreakpointService)
    protected readonly _breakpoint$: TuiBreakpointService
  ) {}

  protected get breakpoint$() {
    return this._breakpoint$;
  }

  public onActiveStepChanged(currentStep: number) {
    this.activeStepIndexChange.emit(currentStep);
  }
}

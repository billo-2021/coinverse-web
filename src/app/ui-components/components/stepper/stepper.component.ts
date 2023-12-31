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
import { StepOptions } from './stepper.types';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input() currentStepIndex = 0;
  @Input() steps: string[] = [];
  @Input() stepsOptions: StepOptions[] = [];

  @Output() currentStepIndexChange = new EventEmitter<number>();

  @ViewChild('tuiStepper') private tuiStepper?: TuiStepperComponent;

  @HostBinding('class') private _classes = 'block stepper';

  public constructor(
    @Inject(TuiBreakpointService)
    protected readonly _breakpoint$: TuiBreakpointService
  ) {}

  protected get breakpoint$() {
    return this._breakpoint$;
  }

  public onCurrentStepChanged(currentStep: number) {
    this.currentStepIndexChange.emit(currentStep);
  }

  public activate(index: number): void {
    if (!this.tuiStepper) {
      return;
    }

    this.tuiStepper.activate(index);
  }

  public isActive(index: number): boolean {
    if (!this.tuiStepper) {
      return false;
    }

    return this.tuiStepper.isActive(index);
  }
}

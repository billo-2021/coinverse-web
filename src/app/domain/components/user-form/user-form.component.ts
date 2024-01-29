import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  Output,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  Observable,
  shareReplay,
  startWith,
} from 'rxjs';
import { DestroyService } from '../../../core';
import { FormBase, FormStatus } from '../../../common';
import { StepOptions } from '../../../ui-components';
import { ListOption } from '../../../form-components';
import { Country, Currency, UserRole } from '../../models';
import { ListOptionsService } from '../../services';
import { AddressForm, AddressFormService } from '../address-form';
import { PreferenceForm, PreferenceFormService } from '../preference-form';
import {
  PersonalInformationForm,
  PersonalInformationFormService,
} from '../personal-information-form';
import { AccountForm, AccountFormService } from '../account-form';

export enum UserFormStep {
  PersonalInformation,
  AddressDetails,
  PreferenceDetails,
  AccountDetails,
}

export interface UserFormViewModel {
  readonly currentStepIndex: UserFormStep;
  readonly formStepOptions: readonly [StepOptions, StepOptions, StepOptions, StepOptions];
  readonly countryOptions: readonly ListOption<Country>[];
  readonly currencyOptions: readonly ListOption<Currency>[];
  readonly userRoleOptions: readonly ListOption<UserRole>[];
  readonly personalInformationForm: FormBase<PersonalInformationForm>;
  readonly addressForm: FormBase<AddressForm>;
  readonly preferenceForm: FormBase<PreferenceForm>;
  readonly accountForm: FormBase<AccountForm>;
  readonly formError: string | null;
}

export interface UserFormComponentInput {
  saveText: string;
  hideUserRole: boolean;
  formClasses: string;
}

export interface UserFormComponentOutput {
  currentStepIndexChange: EventEmitter<UserFormStep>;
  saveClicked: EventEmitter<void>;
}

export const USER_FORM_STEP_OPTIONS: StepOptions = {
  state: 'normal',
  isDisabled: true,
};

@Injectable({
  providedIn: 'root',
})
export class UserFormController {
  private readonly _currentStepIndex$ = new BehaviorSubject<UserFormStep>(
    UserFormStep.PersonalInformation
  );

  private readonly _formStepOptions$: Observable<
    readonly [StepOptions, StepOptions, StepOptions, StepOptions]
  > = this.getFormStepsOptions();

  private readonly _countryOptions$ = this._listOptionsService
    .getCountryOptions()
    .pipe(shareReplay(1), startWith<readonly ListOption<Country>[]>([]));

  private readonly _currencyOptions$ = this._listOptionsService
    .getCurrencyOptions()
    .pipe(shareReplay(1), startWith<readonly ListOption<Currency>[]>([]));

  private readonly _userRoleOptions$ = this._listOptionsService
    .getUserRoleOptions()
    .pipe(shareReplay(1), startWith<readonly ListOption<UserRole>[]>([]));

  private readonly _formError$ = new BehaviorSubject<string | null>(null);

  public readonly viewModel$: Observable<UserFormViewModel> = combineLatest([
    this._currentStepIndex$.asObservable(),
    this._formStepOptions$,
    this._countryOptions$,
    this._currencyOptions$,
    this._userRoleOptions$,
    this._formError$,
  ]).pipe(
    map(
      ([
        currentStepIndex,
        formStepOptions,
        countryOptions,
        currencyOptions,
        userRoleOptions,
        formError,
      ]) => ({
        currentStepIndex,
        formStepOptions,
        countryOptions,
        currencyOptions,
        userRoleOptions,
        personalInformationForm: this.personalInformationForm,
        addressForm: this.addressForm,
        preferenceForm: this.preferenceForm,
        accountForm: this.accountForm,
        formError,
      })
    )
  );

  public constructor(
    private readonly _personalInformationFormService: PersonalInformationFormService,
    private readonly _addressFormService: AddressFormService,
    private readonly _preferenceFormService: PreferenceFormService,
    private readonly _accountFormService: AccountFormService,
    private readonly _listOptionsService: ListOptionsService,
    private readonly _destroy$: DestroyService
  ) {}

  public get currentStepIndex(): UserFormStep {
    return this._currentStepIndex$.value;
  }

  public set currentStepIndex(value: UserFormStep) {
    this._currentStepIndex$.next(value);
  }

  public set formError(value: string | null) {
    this._formError$.next(value);
  }

  public get personalInformationForm(): FormBase<PersonalInformationForm> {
    return this._personalInformationFormService;
  }

  public get addressForm(): FormBase<AddressForm> {
    return this._addressFormService;
  }

  public get preferenceForm(): FormBase<PreferenceForm> {
    return this._preferenceFormService;
  }

  public get accountForm(): FormBase<AccountForm> {
    return this._accountFormService;
  }

  public resetForms(): void {
    this.personalInformationForm.controls.emailAddress.setValue('');
    this.accountForm.controls.username.setValue('');
    this.accountForm.controls.password.setValue('');
    this.personalInformationForm.markAsPristine();
    this.accountForm.markAsPristine();
    this.currentStepIndex = UserFormStep.PersonalInformation;
  }

  private getFormStepsOptions(): Observable<
    readonly [StepOptions, StepOptions, StepOptions, StepOptions]
  > {
    return merge(
      this.personalInformationForm.statusChanges,
      this.addressForm.statusChanges,
      this.preferenceForm.statusChanges,
      this.accountForm.statusChanges
    ).pipe(
      map((): readonly [StepOptions, StepOptions, StepOptions, StepOptions] => [
        this.getFormStepOption(UserFormStep.PersonalInformation),
        this.getFormStepOption(UserFormStep.AddressDetails),
        this.getFormStepOption(UserFormStep.PreferenceDetails),
        this.getFormStepOption(UserFormStep.AccountDetails),
      ]),
      startWith<readonly [StepOptions, StepOptions, StepOptions, StepOptions]>([
        USER_FORM_STEP_OPTIONS,
        USER_FORM_STEP_OPTIONS,
        USER_FORM_STEP_OPTIONS,
        USER_FORM_STEP_OPTIONS,
      ])
    );
  }

  private getFormStepOption(formStepIndex: UserFormStep): StepOptions {
    const formStepStatuses = this.getFormStepStatuses();
    const formStatus = formStepStatuses[formStepIndex];
    const previousFormsStatuses = formStepStatuses.filter(
      (formStepStatus, index) => index < formStepIndex
    );

    const previousFormsStepsValid = previousFormsStatuses.every(
      (formStepStatus) => formStepStatus.valid
    );

    const isFirstStep = formStepIndex === UserFormStep.PersonalInformation;
    const stepHasBeenPassed = this.currentStepIndex > formStepIndex;

    return {
      state:
        formStatus.valid && stepHasBeenPassed
          ? 'pass'
          : !formStatus.touched
            ? 'normal'
            : formStatus.valid
              ? 'normal'
              : 'error',
      isDisabled: isFirstStep ? false : !previousFormsStepsValid,
    };
  }

  private getFormStepStatuses(): [FormStatus, FormStatus, FormStatus, FormStatus] {
    return [
      this.personalInformationForm.getFormStatus(),
      this.addressForm.getFormStatus(),
      this.preferenceForm.getFormStatus(),
      this.accountForm.getFormStatus(),
    ];
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements UserFormComponentInput, UserFormComponentOutput {
  @Input() public saveText = 'Signup';
  @Input() public hideUserRole = true;
  @Input() public formClasses = '';

  @Output() public currentStepIndexChange = new EventEmitter<UserFormStep>();
  @Output() public saveClicked = new EventEmitter<void>();

  public readonly viewModel$: Observable<UserFormViewModel> = this._userFormController.viewModel$;

  protected readonly FormStepIndex = UserFormStep;

  protected readonly FormSteps = [
    'Personal Information',
    'Address',
    'Preference',
    'Account',
  ] as const;
  @HostBinding('class') private _classes = 'block';

  constructor(@SkipSelf() private readonly _userFormController: UserFormController) {}

  @Input() set currentStepIndex(value: UserFormStep) {
    this._userFormController.currentStepIndex = value;
  }

  public onStepIndexChanged(value: UserFormStep): void {
    this._userFormController.currentStepIndex = value;
    this.currentStepIndexChange.emit(value);
  }

  public onSave(): void {
    this._userFormController.formError = '';
    this.saveClicked.emit();
  }
}

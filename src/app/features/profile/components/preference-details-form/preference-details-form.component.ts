import {Component, EventEmitter, Input, Output} from '@angular/core';
import {combineLatest, map, Observable, shareReplay, tap} from "rxjs";
import {ListOption} from "../../../../form-components/types";
import {LookupService} from "../../../../common/domain-services/lookup/lookup.service";
import {ListOptionUtils} from "../../../../form-components/utils";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../../../common/domain-services";
import {UserProfilePreferenceUpdate, UserProfileResponse} from "../../../../common/domain-models/profile";
import {CurrencyResponse} from "../../../../common/domain-models";
import {AlertService} from "../../../../core/services";

@Component({
  selector: 'app-preference-details-form',
  templateUrl: './preference-details-form.component.html',
  styleUrls: ['./preference-details-form.component.scss']
})
export class PreferenceDetailsFormComponent {
  public form: FormGroup;
  @Input() public saveText = 'Save Changes';
  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly FormGroup = FormGroup;
  protected readonly currencyOptions$: Observable<ListOption[]>;
  protected readonly userProfileResponse$: Observable<UserProfileResponse>;

  public constructor(private formBuilder: FormBuilder,
                     private readonly alertService: AlertService,
                     private readonly profileService: ProfileService,
                     private readonly lookupService: LookupService) {

    this.currencyOptions$ = lookupService.getAllCurrencies().pipe(
      map((currencyResponse) =>
        currencyResponse.map(ListOptionUtils.toListOption)
      ),
      shareReplay(1)
    );

    this.userProfileResponse$ = profileService.getProfile();

    this.form = this.getPreferenceDetailsForm(formBuilder);

    combineLatest([this.currencyOptions$, this.userProfileResponse$])
      .pipe(tap(([currencyOptions, userProfile]) => {
        const foundCurrencyOption = currencyOptions.find(currencyOption => {
          const currency = currencyOption.value as CurrencyResponse;

          return currency.code === userProfile.preference.currency.code;
        });

        if (!foundCurrencyOption) {
          return;
        }

        this.form.controls['currency']?.setValue(foundCurrencyOption);
        const notificationMethods = userProfile.preference.notificationMethods;

        if (!notificationMethods || !notificationMethods.length) {
          return;
        }

        const notificationMethodsControl = this.form.controls['notificationMethods'] as FormGroup;
        notificationMethods.forEach(notificationMethod => {
          notificationMethodsControl?.controls[`${notificationMethod.code}`]?.setValue(true);
        });
      })).subscribe();
  }

  public getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }

  public onSaveChanges(): void {
    const currencyOption = this.form.controls['currency'].value as ListOption;
    const currency = currencyOption.value as CurrencyResponse;

    const notificationMethodsValue = this.form.controls['notificationMethods'].value;

    const notificationMethods = [notificationMethodsValue.email,
      notificationMethodsValue.sms].filter(item => !!item)
      .map((item, index) => index === 0 ? 'email' : 'sms');

    const preferenceUpdateRequest: UserProfilePreferenceUpdate = {
      currencyCode: currency.code,
      notificationMethods: notificationMethods
    }

    this.profileService.updatePreferenceDetails(preferenceUpdateRequest)
      .pipe(tap(() => {
        this.alertService.showMessage("Preferences Updated");
        this.saveClicked.emit();
      })).subscribe();
  }

  private getPreferenceDetailsForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      currency: [null, [Validators.required]],
      notificationMethods: formBuilder.group({
        sms: [false],
        email: [false]
      })
    });
  }
}

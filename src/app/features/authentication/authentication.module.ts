import { NgModule } from '@angular/core';
import { CommonModule as NgCommon } from '@angular/common';

import { CommonModule } from '../../common/common.module';
import { FormComponentsModule } from '../../form-components/form-components.module';
import { UiComponentsModule } from '../../ui-components/ui-components.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PersonalInformationFormComponent } from './components/personal-information-form/personal-information-form.component';
import { AddressDetailsFormComponent } from './components/address-details-form/address-details-form.component';
import { PreferenceDetailsFormComponent } from './components/preference-details-form/preference-details-form.component';
import { AccountDetailsFormComponent } from './components/account-details-form/account-details-form.component';
import { GetFormStepPipe } from './pipes/get-form-step/get-form-step.pipe';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './pages/reset-password-request/reset-password-request.component';
import { ResetPasswordRequestFormComponent } from './components/reset-password-request-form/reset-password-request-form.component';
import { ResetPasswordRequestResultComponent } from './components/reset-password-request-result/reset-password-request-result.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { ResetPasswordResultComponent } from './components/reset-password-result/reset-password-result.component';

@NgModule({
  imports: [
    NgCommon,
    CommonModule,
    FormComponentsModule,
    AuthenticationRoutingModule,
    UiComponentsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    PersonalInformationFormComponent,
    AddressDetailsFormComponent,
    PreferenceDetailsFormComponent,
    AccountDetailsFormComponent,
    GetFormStepPipe,
    VerifyAccountComponent,
    OtpFormComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent,
    ResetPasswordRequestFormComponent,
    ResetPasswordRequestResultComponent,
    ResetPasswordFormComponent,
    ResetPasswordResultComponent,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent,
    AddressDetailsFormComponent,
    PreferenceDetailsFormComponent,
  ],
})
export class AuthenticationModule {}

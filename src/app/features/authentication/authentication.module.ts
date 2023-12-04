import { NgModule } from '@angular/core';
import { CommonModule as NgCommon } from '@angular/common';

import { CommonModule } from '../../common/common.module';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { FormComponentsModule } from '../../form-components/form-components.module';

import {
  OtpFormComponent,
  ResetPasswordFormComponent,
  ResetPasswordRequestFormComponent,
  ResetPasswordRequestResultComponent,
  ResetPasswordResultComponent,
} from './components';

import {
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ResetPasswordRequestPage,
  VerifyAccountPage,
} from './pages';

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  imports: [
    NgCommon,
    CommonModule,
    FormComponentsModule,
    AuthenticationRoutingModule,
    UiComponentsModule,
  ],
  declarations: [
    OtpFormComponent,
    ResetPasswordRequestFormComponent,
    ResetPasswordRequestResultComponent,
    ResetPasswordFormComponent,
    ResetPasswordResultComponent,
    LoginPage,
    RegisterPage,
    VerifyAccountPage,
    ResetPasswordPage,
    ResetPasswordRequestPage,
  ],
  exports: [
    LoginPage,
    RegisterPage,
    VerifyAccountPage,
    ResetPasswordPage,
    ResetPasswordRequestPage,
  ],
})
export class AuthenticationModule {}

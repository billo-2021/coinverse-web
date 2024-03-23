import { NgModule } from '@angular/core';
import { CommonModule as NgCommon } from '@angular/common';
import { SharedModule } from '../../shared';
import { UiComponentsModule } from '../../ui-components';
import { FormComponentsModule } from '../../form-components';
import { DomainModule } from '../../domain';
import {
  LoginFormComponent,
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
    SharedModule,
    UiComponentsModule,
    FormComponentsModule,
    DomainModule,
    AuthenticationRoutingModule,
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
    LoginFormComponent,
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

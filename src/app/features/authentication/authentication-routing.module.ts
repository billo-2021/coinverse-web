import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  ResetPasswordRequestPage,
  VerifyAccountPage,
} from './pages';

import { pagesConfig } from './config';

const routes: Routes = [
  {
    path: pagesConfig.login.path,
    component: LoginPage,
    title: pagesConfig.login.title,
  },
  {
    path: pagesConfig.register.path,
    component: RegisterPage,
    title: pagesConfig.register.title,
  },
  {
    path: pagesConfig.verify.path,
    component: VerifyAccountPage,
    title: pagesConfig.verify.title,
  },
  {
    path: pagesConfig.resetPasswordRequest.path,
    component: ResetPasswordRequestPage,
    title: pagesConfig.resetPasswordRequest.title,
  },
  {
    path: pagesConfig.resetPassword.path,
    component: ResetPasswordPage,
    title: pagesConfig.resetPassword.title,
  },
  { path: '**', redirectTo: pagesConfig.login.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}

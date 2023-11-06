import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { ResetPasswordRequestComponent } from './pages/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { pagesConfig } from './config';

const routes: Routes = [
  {
    path: pagesConfig.login.path,
    component: LoginComponent,
    title: pagesConfig.login.title,
  },
  {
    path: pagesConfig.register.path,
    component: RegisterComponent,
    title: pagesConfig.register.title,
  },
  {
    path: pagesConfig.verify.path,
    component: VerifyAccountComponent,
    title: pagesConfig.verify.title,
  },
  {
    path: pagesConfig.resetPasswordRequest.path,
    component: ResetPasswordRequestComponent,
    title: pagesConfig.resetPasswordRequest.title,
  },
  {
    path: pagesConfig.resetPassword.path,
    component: ResetPasswordComponent,
    title: pagesConfig.resetPassword.title,
  },
  { path: '**', redirectTo: pagesConfig.login.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}

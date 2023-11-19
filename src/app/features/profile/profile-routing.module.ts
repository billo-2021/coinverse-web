import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageProfileComponent } from './pages/manage-profile/manage-profile.component';
import { pagesConfig } from './config';

const routes: Routes = [
  {
    path: pagesConfig.manageProfile.path,
    component: ManageProfileComponent,
    title: pagesConfig.manageProfile.title,
  },
  { path: '**', redirectTo: pagesConfig.manageProfile.path },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pagesConfig } from './config';
import { ManageProfilePage } from './pages';

const ROUTES: Routes = [
  {
    path: pagesConfig.manageProfile.path,
    component: ManageProfilePage,
    title: pagesConfig.manageProfile.title,
  },
  { path: '**', redirectTo: pagesConfig.manageProfile.path },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

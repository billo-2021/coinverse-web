import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { pagesConfig } from './config';
import { DashboardPage } from './pages';

const ROUTES: Routes = [
  {
    path: pagesConfig.dashboard.path,
    component: DashboardPage,
    title: pagesConfig.dashboard.title,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

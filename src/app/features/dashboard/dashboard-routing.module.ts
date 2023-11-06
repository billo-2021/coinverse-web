import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { pagesConfig } from './config';

const routes: Routes = [
  {
    path: pagesConfig.dashboard.path,
    component: DashboardComponent,
    title: pagesConfig.dashboard.title,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

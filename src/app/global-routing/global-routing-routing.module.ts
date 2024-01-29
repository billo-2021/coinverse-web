import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalRoutingComponent } from './pages/global-routing/global-routing.component';

const ROUTES: Routes = [
  { path: '', component: GlobalRoutingComponent },
  { path: '**', component: GlobalRoutingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class GlobalRoutingRoutingModule {}

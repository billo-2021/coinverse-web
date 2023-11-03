import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalRoutingComponent} from "./pages/global-routing/global-routing.component";

const routes: Routes = [
  {path: '', component: GlobalRoutingComponent},
  {path: '**', component: GlobalRoutingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageProfileComponent} from "./pages/manage-profile/manage-profile.component";

const routes: Routes = [
  {path: '', component: ManageProfileComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}

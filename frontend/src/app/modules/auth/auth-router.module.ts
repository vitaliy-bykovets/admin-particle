import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import * as fromComponents from '@modules/auth/components';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: fromComponents.LoginComponent
  },
  {
    path: 'register',
    component: fromComponents.RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AuthRouterModule {}

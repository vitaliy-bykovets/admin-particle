import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import * as fromComponents from '@modules/auth/components';
import * as fromContainers from '@modules/auth/containers';

const routes: Routes = [
  {
    path: "",
    component: fromContainers.AuthComponent,
    children: [
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
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AuthRouterModule {}

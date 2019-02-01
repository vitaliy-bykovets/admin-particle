import {Routes, RouterModule} from '@angular/router';

import {NgModule} from '@angular/core';

import * as fromContainers from '@modules/dashboard/containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouterModule {}

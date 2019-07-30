import {Routes, RouterModule} from '@angular/router';

import {NgModule} from '@angular/core';

import * as fromContainers from '@modules/dashboard/containers';
import * as fromComponents from '@modules/dashboard/components';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.DashboardComponent,
    children: [
      {
        path: 'edit',
        component: fromContainers.FieldEditContainerComponent
      },
      {
        path: 'fields',
        component: fromContainers.FieldContainerComponent,
        children: [
          {
            path: '',
            component: fromComponents.FieldListComponent
          },
          {
            path: ':id',
            component: fromComponents.FieldItemComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouterModule {}

import {DashboardComponent} from '@modules/dashboard/containers/dashboard/dashboard.component';
import {HeaderComponent} from '@modules/dashboard/containers/header/header.component';
import {AgroMapComponent} from '@modules/dashboard/containers/agro-map/agro-map.component';
import {FieldEditContainerComponent} from '@modules/dashboard/containers/field-edit-container/field-edit-container.component';
import {FieldContainerComponent} from '@modules/dashboard/containers/field-container/field-container.component';

export const containers: any[] = [
  DashboardComponent,
  HeaderComponent,
  AgroMapComponent,
  FieldEditContainerComponent,
  FieldContainerComponent
];

export * from '@modules/dashboard/containers/dashboard/dashboard.component';
export * from '@modules/dashboard/containers/header/header.component';
export * from '@modules/dashboard/containers/agro-map/agro-map.component';
export * from '@modules/dashboard/containers/field-edit-container/field-edit-container.component';
export * from '@modules/dashboard/containers/field-container/field-container.component';

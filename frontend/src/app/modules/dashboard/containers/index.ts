import {DashboardComponent} from "@modules/dashboard/containers/dashboard/dashboard.component";
import {HeaderComponent} from "@modules/dashboard/containers/header/header.component";
import {AgroMapComponent} from "@modules/dashboard/containers/agro-map/agro-map.component";

export const containers: any[] = [
  DashboardComponent,
  HeaderComponent,
  AgroMapComponent
];

export * from "@modules/dashboard/containers/dashboard/dashboard.component";
export * from "@modules/dashboard/containers/header/header.component";
export * from "@modules/dashboard/containers/agro-map/agro-map.component";

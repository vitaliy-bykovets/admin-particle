import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { DashboardRouterModule } from '@modules/dashboard/dashboard-router.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgmCoreModule } from '@agm/core';

import * as fromContainers from '@modules/dashboard/containers';
import * as fromComponents from '@modules/dashboard/components';
import * as fromServices from '@modules/dashboard/services';

import { reducers } from "@modules/dashboard/+state/reducers";
import * as fromEffects from '@modules/dashboard/+state/effects';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature("dashboard", reducers),
    EffectsModule.forFeature(fromEffects.effects),
    HttpClientModule,
    DashboardRouterModule,
    HighchartsChartModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLDr0aWULEa8mpf3R68YPoqUv2WL299FM'
    }),
  ],
  providers: [
    ...fromServices.services
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class DashboardModule { }

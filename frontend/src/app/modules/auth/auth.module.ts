import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRouterModule} from "./auth-router.module";

import * as fromComponents from './components';
import * as fromContainers from './containers';

@NgModule({
  imports: [
    CommonModule,
    AuthRouterModule
  ],
  declarations: [ ...fromComponents.components, ...fromContainers.containers ]
})
export class AuthModule { }

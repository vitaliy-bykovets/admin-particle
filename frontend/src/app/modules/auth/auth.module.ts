import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRouterModule} from "./auth-router.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import * as fromComponents from './components';
import * as fromContainers from './containers';

@NgModule({
  imports: [
    CommonModule,
    AuthRouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ ...fromComponents.components, ...fromContainers.containers ]
})
export class AuthModule { }

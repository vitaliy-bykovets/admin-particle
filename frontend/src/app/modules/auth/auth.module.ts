import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material'; // move to shared
import { NgxErrorsModule } from '@hackages/ngxerrors'; // move to shared

import { AuthRouterModule } from './auth-router.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    AuthRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    NgxErrorsModule
  ],
  declarations: [ ...fromComponents.components, ...fromContainers.containers ],
  providers: [ ...fromServices.services ]
})
export class AuthModule { }

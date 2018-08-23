import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './containers/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthRouterModule} from "./auth-router.module";

@NgModule({
  imports: [
    CommonModule,
    AuthRouterModule
  ],
  declarations: [AuthComponent, LoginComponent, RegisterComponent]
})
export class AuthModule { }

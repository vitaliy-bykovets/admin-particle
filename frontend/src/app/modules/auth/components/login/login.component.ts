import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as R from 'ramda';

@Component({
  selector: 'ap-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get("email")
  }

  public hasError(fieldName) {
    const control = this.loginForm.controls[fieldName];
    return (control.dirty && control.touched) && !R.isNil(control.errors);
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as R from 'ramda';

@Component({
  selector: 'ap-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    })
  }

  public hasError(fieldName) {
    const control = this.registerForm.controls[fieldName];
    return (control.dirty && control.touched) && !R.isNil(control.errors);
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  }
}

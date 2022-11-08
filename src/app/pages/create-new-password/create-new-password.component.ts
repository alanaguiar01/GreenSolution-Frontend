import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css'],
})
export class CreateNewPasswordComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }
  createNewPassword(): void {}
  get f() {
    return this.formLogin.controls;
  }
  private initForm(): void {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
}

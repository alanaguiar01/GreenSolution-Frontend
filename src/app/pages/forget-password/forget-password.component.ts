import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  formForgotPassword!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  forgetPassword() {
    return this.authService
      .sendEmailforgotPassword(this.formForgotPassword.value)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: `${data.email} enviado com sucesso`,
        });
        this.router.navigate(['login']);
      });
  }

  get f() {
    return this.formForgotPassword.controls;
  }
  private initForm(): void {
    this.formForgotPassword = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
}

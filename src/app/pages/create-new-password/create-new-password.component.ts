import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css'],
})
export class CreateNewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  createNewPassword() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    return this.authService
      .forgotPassword({
        token,
        ...this.newPasswordForm.value,
      })
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: `senha alterada com sucesso`,
        });
        this.router.navigate(['login']);
      });
  }
  get f() {
    return this.newPasswordForm.controls;
  }
  private initForm(): void {
    this.newPasswordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirm: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
}

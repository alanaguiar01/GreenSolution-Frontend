import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  register(): void {
    if (this.formRegister.invalid) {
      return;
    }
    this.authService.register(this.formRegister.value).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${data.name} foi registrado com sucesso`,
      });
      this.router.navigate(['/login']);
    });
  }

  get f() {
    return this.formRegister.controls;
  }

  private initForm(): void {
    this.formRegister = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
}

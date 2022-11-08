import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  /**
   * The initForm() function is called when the component is initialized
   */
  ngOnInit(): void {
    this.initForm();
  }
  /**
   * If the form is invalid, return. Otherwise, call the login function in the authService and
   * subscribe to the response
   * @returns The data is being returned as an object.
   */
  login() {
    if (this.formLogin.invalid) {
      return;
    }
    this.authService.login(this.formLogin.value).subscribe((data) => {
      this.authService.saveToken(data.access_token);
      this.userService.me().subscribe((user) => {
        this.authService.saveUser(user);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${user.name} está logado com sucesso`,
        });

        this.router.navigate(['/dashboard']);
      });
    });
  }

  /**
   * The function returns the formLogin.controls object
   * @returns The formLogin.controls object.
   */
  get f() {
    return this.formLogin.controls;
  }

  /**
   * We're creating a form group with two form controls, email and password.
   *
   * The email form control has two validators, required and email.
   *
   * The password form control has two validators, required and minLength.
   *
   * The minLength validator requires the password to be at least 8 characters long.
   */
  private initForm(): void {
    this.formLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
}

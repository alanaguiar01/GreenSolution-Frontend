import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interfaces/login.interface';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: LocalStorageService,
    private readonly router: Router
  ) {}
  register(data: RegisterModel) {
    return this.httpClient.post<User>(
      environment.endpoint.concat('/auth/signup'),
      data
    );
  }

  login(data: LoginModel) {
    return this.httpClient.post<ILogin>(
      environment.endpoint.concat('/auth/signin'),
      data
    );
  }
  logout() {
    this.storageService.remove(environment.session.token);
    this.storageService.remove(environment.session.user);
    this.router.navigate(['/login']);
  }
  saveToken(token: string) {
    this.storageService.set(environment.session.token, token);
  }
  saveUser(user: User) {
    this.storageService.set(environment.session.user, user);
  }
  getToken() {
    return this.storageService.get(environment.session.token);
  }
}

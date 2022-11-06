import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly storageService: LocalStorageService,
    private readonly router: Router
  ) {}
  login(data: LoginModel) {
    return this.httpClient.post(
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
  saveUser(user: any) {
    this.storageService.set(environment.session.user, user);
  }
  getToken() {
    return this.storageService.get(environment.session.token);
  }
}

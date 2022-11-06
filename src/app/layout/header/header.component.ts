import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'angular-web-storage';
// import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  countNotification = 0;
  display = false;
  backgroundNotification = 'danger';
  showNotification = false;
  @LocalStorage(environment.session.user) user: any;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  changeNotification() {
    return this.countNotification == 0 ? 'danger' : 'success';
  }
}

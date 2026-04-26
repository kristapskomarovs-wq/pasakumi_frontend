import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../services/user-data';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  private router = inject(Router);
  private userDataService = inject(UserDataService);
  userData = this.userDataService.getUserData();

  get shortEmail(): string {
    const email = this.userData.email;
    return email ? email.split('@')[0] : '';
  }

  goToEvents() { this.router.navigateByUrl('/events'); }
  goToCreate() { this.router.navigateByUrl('/create'); }
  goToMyEvents() { this.router.navigateByUrl('/my-events'); }
  logout() {
    sessionStorage.removeItem('userData');
    this.router.navigateByUrl('/');
  }
}
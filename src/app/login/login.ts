import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { UserDataService } from '../services/user-data';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';
  isRegistered = signal<boolean | null>(null); // null=nezinām, true=eksistē, false=jauns
  errorMessage = signal('');

  onCheckEmail() {
    if (!this.email.trim()) {
      this.errorMessage.set('E-pasts ir obligāts!');
      return;
    }
    this.authService.checkEmail(this.email).subscribe({
      next: (r) => {
        this.isRegistered.set(r.body!);
        this.errorMessage.set('');
      },
      error: () => this.errorMessage.set('Kļūda pārbaudot e-pastu.')
    });
  }

  onLogin() {
    if (!this.password) {
      this.errorMessage.set('Parole ir obligāta!');
      return;
    }
    this.authService.login({ email: this.email, password: this.password, confirmPassword: '' }).subscribe({
      next: (r) => {
        if (r.status === 200) {
          this.userDataService.setUserData({ id: r.body!, email: this.email });
          this.router.navigateByUrl('/events');
        }
      },
      error: () => {
        this.errorMessage.set('Nepareizs e-pasts vai parole!');
        this.password = '';
      }
    });
  }

  onRegister() {
    if (!this.password || !this.confirmPassword) {
      this.errorMessage.set('Visas paroles ir obligātas!');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('Paroles nesakrīt!');
      return;
    }
    this.authService.register({ email: this.email, password: this.password, confirmPassword: this.confirmPassword }).subscribe({
      next: (r) => {
        if (r.status === 201) {
          this.userDataService.setUserData({ id: r.body!, email: this.email });
          this.router.navigateByUrl('/events');
        }
      },
      error: (err) => {
        this.errorMessage.set(err.error || 'Reģistrācija neizdevās!');
      }
    });
  }
}
import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth';
import { UserDataService } from '../services/user-data';
import { createUserLoginForm, validateUserLoginForm } from '../models/userModel';
import { ErrorValidation } from '../error-validation/error-validation';

@Component({
  selector: 'app-login',
  imports: [FormField, ErrorValidation],
  templateUrl: './login.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private userDataService = inject(UserDataService);
  private router = inject(Router);

  loginSignal = signal({
    user: createUserLoginForm()(),
  });

  loginForm = form(this.loginSignal, (v) => {
    validateUserLoginForm(v.user);
  });

  isRegistered = signal<boolean | null>(null);
  errorMessage = signal('');

  private emailInput$ = new Subject<string>();

  constructor() {
    this.emailInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
    ).subscribe(() => this.onCheckEmail());
  }

  onEmailInput(email: string) {
    this.isRegistered.set(null);
    this.errorMessage.set('');
    this.emailInput$.next(email);
  }

  onCheckEmail() {
    const email = this.loginForm.user.email().value();
    if (!email.trim()) {
      this.errorMessage.set('Ievadiet e-pastu!');
      return;
    }
    this.authService.checkEmail(email).subscribe({
      next: (r) => {
        this.isRegistered.set(r.body!);
        this.errorMessage.set('');
      },
      error: () => this.errorMessage.set('Kļūda pārbaudot e-pastu.'),
    });
  }

  onLogin() {
    const userData = this.loginForm().value().user;
    if (!userData.password) {
      this.errorMessage.set('Ievadiet paroli!');
      return;
    }
    this.authService.login(userData).subscribe({
      next: (r) => {
        if (r.status === 200) {
          this.userDataService.setUserData({ id: r.body!, email: userData.email });
          this.router.navigateByUrl('/events');
        }
      },
      error: () => {
        this.errorMessage.set('Nepareizs e-pasts vai parole!');
        this.loginForm.user.password().value.set('');
      },
    });
  }

  onRegister() {
    const userData = this.loginForm().value().user;
    // Pārbaudīt vai forma ir valīda
    if (!userData.email || !userData.password || !userData.confirmPassword) {
      this.errorMessage.set('Aizpildiet visus laukus!');
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      this.errorMessage.set('Paroles nesakrīt!');
      return;
    }
    this.authService.register(userData).subscribe({
      next: (r) => {
        if (r.status === 201) {
          this.userDataService.setUserData({ id: r.body!, email: userData.email });
          this.router.navigateByUrl('/events');
        }
      },
      error: (err) => {
        this.errorMessage.set(err.error || 'Reģistrācija neizdevās!');
      },
    });
  }
}
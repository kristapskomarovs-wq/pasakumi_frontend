import { Injectable } from '@angular/core';
import { UserData } from '../models/userModel';

@Injectable({ providedIn: 'root' })
export class UserDataService {

  setUserData(data: UserData): void {
    sessionStorage.setItem('userData', JSON.stringify(data));
  }

  getUserData(): UserData {
    const raw = sessionStorage.getItem('userData');
    if (!raw) return { id: 0, email: '' };
    try {
      return JSON.parse(raw) as UserData;
    } catch {
      return { id: 0, email: '' };
    }
  }

  isLoggedIn(): boolean {
    return this.getUserData().id > 0;
  }
}
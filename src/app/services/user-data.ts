import { Injectable } from '@angular/core';
import { UserData } from '../models/userModel';

@Injectable({ providedIn: 'root' })
export class UserDataService {

  setUserData(data: UserData): void {
    sessionStorage.setItem('userData', JSON.stringify(data));  //saglabājam userData sessionStorage, lai varētu izmantot citur aplikācijā
  }

  getUserData(): UserData {  //iegūstam userData no sessionStorage, ja nav, atgriežam tukšu objektu
    const raw = sessionStorage.getItem('userData');
    if (!raw) return { id: 0, email: '' };
    try {
      return JSON.parse(raw) as UserData;
    } catch {
      return { id: 0, email: '' };
    }
  }

  isLoggedIn(): boolean {
    return this.getUserData().id > 0;  // pārbauda, vai lietotājs ir pieslēdzies - ja id ir lielāks par 0, tad ir pieslēdzies
  }
}
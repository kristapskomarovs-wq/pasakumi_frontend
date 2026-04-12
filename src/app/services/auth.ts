import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginModel } from '../models/userModel';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.api.baseUrl;

  register(user: UserLoginModel): Observable<HttpResponse<number>> {
    return this.http.post<number>(`${this.baseUrl}/v1/register`, user, {
      observe: 'response',
    });
  }

  checkEmail(email: string): Observable<HttpResponse<boolean>> {
    return this.http.get<boolean>(
      `${this.baseUrl}/v1/checkemail/${encodeURIComponent(email)}`,
      { observe: 'response' }
    );
  }

  login(user: UserLoginModel): Observable<HttpResponse<number>> {
    return this.http.post<number>(`${this.baseUrl}/v1/login`, user, {
      observe: 'response',
    });
  }
}
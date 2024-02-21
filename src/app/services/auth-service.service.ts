import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/user/create`;
    return this.http.post<User>(url, user);
  }

  login(username: string, password: string): Observable<User> {
    const url = `${this.baseUrl}/user/login?username=${username}&password=${password}`;
    return this.http.get<User>(url).pipe(
      tap(user => {
        if (user) { // Check if user is not null or undefined
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          console.log('User is null or undefined')
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getRole(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.role || null;
  }

  isUsernameTaken(username: string): Observable<boolean> {
    const url = `${this.baseUrl}/user/check-username?username=${encodeURIComponent(username)}`;
    return this.http.get<boolean>(url);
  }
}

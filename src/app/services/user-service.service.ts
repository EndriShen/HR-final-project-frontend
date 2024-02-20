import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserRequest } from '../models/updateUser.model';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  updateUser(id: number, user: UpdateUserRequest): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/update/${id}`, user).pipe(
      catchError((error) => of(error))
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}

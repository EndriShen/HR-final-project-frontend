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

  updateUser(userId: number, managerId: number, user: UpdateUserRequest): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/update/${userId}/${managerId}`, user).pipe(
      catchError((error) => of(error))
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all-users`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserRequest } from '../models/user-models/updateUser.model';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user-models/user.model';
import { UserRole } from '../models/enums/user-role.enum';

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

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all-users`).pipe(
      map(users => users.filter(user => user.role !== UserRole.Manager))
    );
  }
}

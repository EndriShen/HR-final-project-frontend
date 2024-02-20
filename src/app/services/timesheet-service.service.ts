import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaveTimesheetRequest } from '../models/saveTimesheetRequest.model';
import { Timesheet } from '../models/timesheet.model';
import { Observable, catchError, of } from 'rxjs';
import { UpdateTimesheetUser } from '../models/updateTimesheetUser.model';
import { UpdateTimesheetManager } from '../models/updateTimesheetManager.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetServiceService {

  private baseUrl = 'http://localhost:8080/timesheet'; // Adjust with your backend URL

  constructor(private http: HttpClient) { }

  createTimesheet(timesheetRequest: SaveTimesheetRequest): Observable<Timesheet> {
    return this.http.post<Timesheet>(`${this.baseUrl}/create`, timesheetRequest);
  }

  updateTimesheetUser(id: number, timesheet: UpdateTimesheetUser): Observable<Timesheet> {
    return this.http.patch<Timesheet>(`${this.baseUrl}/updateByUser/${id}`, timesheet).pipe(
      catchError((error) => of(error))
    );
  }

  updateTimesheetManager(id: number, timesheet: UpdateTimesheetManager): Observable<Timesheet> {
    return this.http.patch<Timesheet>(`${this.baseUrl}/updateByManager/${id}`, timesheet).pipe(
      catchError((error) => of(error))
    );
  }

  deleteTimesheet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getTimeSheetsByUserId(userId: number): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.baseUrl}/user/${userId}`);
  }
}

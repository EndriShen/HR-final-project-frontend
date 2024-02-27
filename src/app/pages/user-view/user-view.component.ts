import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAlertBoxComponent } from 'ng-alert-box-popup';
import { tap, catchError, of } from 'rxjs';
import { StatusType } from 'src/app/models/enums/status-type.enum';
import { SaveTimesheet } from 'src/app/models/timesheet-models/saveTimesheet.model';
import { SaveTimesheetRequest } from 'src/app/models/timesheet-models/saveTimesheetRequest.model';
import { Timesheet } from 'src/app/models/timesheet-models/timesheet.model';
import { TimesheetServiceService } from 'src/app/services/timesheet-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  user: any;
  timesheetRequests: SaveTimesheet = { fromDate: '', toDate: '', note: '' };
  timesheets: Timesheet[] = [];
  editableTimesheetIndex: number | null = null;
  errorMessage: string | null = null;
  errorMessage2: string | null = null;
  statusType = StatusType;

  constructor(
    private timesheetService: TimesheetServiceService,
    private router: Router,
    private alerts: NgAlertBoxComponent
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadTimesheetRequests();
  }

  loadUserData(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadTimesheetRequests(): void {
    const userId = this.user?.id;
    if (userId) {
      this.timesheetService.getTimeSheetsByUserId(userId).pipe(
        tap(timesheets => {
          this.timesheets = timesheets;
        }),
        catchError((error) => {
          console.error('Error loading timesheets:', error);
          return of();
        })
      ).subscribe();
    }
  }

  onSubmit(): void {
    if (this.timesheetRequests.fromDate && this.timesheetRequests.toDate) {
      const timesheetRequest: SaveTimesheetRequest = {
        saveTimesheet: {
          fromDate: this.formatDate(this.timesheetRequests.fromDate),
          toDate: this.formatDate(this.timesheetRequests.toDate),
          note: this.timesheetRequests.note
        },
        user: {
          id: this.user.id
        }
      };

      this.timesheetService.createTimesheet(timesheetRequest).pipe(
        tap(newTimesheet => {
          console.log('New timesheet created:', newTimesheet);
          this.errorMessage = null;
          this.alerts.dialog('S', 'New Timesheet Request Created!')
          this.loadTimesheetRequests();
        }),
        catchError(error => {
          console.error('Error creating timesheet:', error);
          this.errorMessage = error.error.errorMessage || 'An unexpected error occurred.';
          return of();
        })
      ).subscribe();
    }
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  deleteTimesheet(id: number, index: number): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this timesheet?');

    if (isConfirmed) {
      this.timesheetService.deleteTimesheet(id).pipe(
        tap(() => {
          console.log('Timesheet deleted successfully');
          this.timesheets.splice(index, 1); // Remove the timesheet from the list
          this.editableTimesheetIndex = null; // Reset the editable index
          this.alerts.dialog('S', 'Timesheet deleted successfully!');
          this.loadTimesheetRequests();
        }),
        catchError(error => {
          console.error('Error deleting timesheet:', error);
          this.alerts.dialog('E', 'An error occurred while deleting timesheet!');
          return of();
        })
      ).subscribe();
    }
  }

  onEditSubmit(timesheetReq: Timesheet): void {
    if (timesheetReq && timesheetReq.id) {
      this.timesheetService.updateTimesheetUser(timesheetReq.id, timesheetReq).pipe(
        tap(updatedTimesheet => {
          this.timesheets[this.editableTimesheetIndex!] = updatedTimesheet.updateTimesheetRequest;
          this.editableTimesheetIndex = null; // Reset the editable index
          this.errorMessage2 = null;
          this.alerts.dialog('S', 'Timesheet updated successfully!');
          this.loadTimesheetRequests();
        }),
        catchError(error => {
          console.error('Error updating timesheet:', error);
          this.errorMessage2 = error.error.errorMessage || 'An unexpected error occurred.';
          return of();
        })
      ).subscribe();
    }
  }

  startEdit(vacation: Timesheet, index: number): void {
    this.editableTimesheetIndex = index; // Set the index of the timesheet being edited
  }

  cancelEdit(): void {
    this.editableTimesheetIndex = null;
    this.loadTimesheetRequests();
  }
}

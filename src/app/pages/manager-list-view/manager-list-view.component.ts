import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAlertBoxComponent } from 'ng-alert-box-popup';
import { filter, of, switchMap, tap } from 'rxjs';
import { StatusType } from 'src/app/models/enums/status-type.enum';
import { Timesheet } from 'src/app/models/timesheet-models/timesheet.model';
import { User } from 'src/app/models/user-models/user.model';
import { TimesheetServiceService } from 'src/app/services/timesheet-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manager-list-view',
  templateUrl: './manager-list-view.component.html',
  styleUrls: ['./manager-list-view.component.scss']
})
export class ManagerListViewComponent implements OnInit {
  users: User[] = [];
  pendingStatusMap = new Map<number, boolean>();
  searchTerm: string = '';

  constructor(
    private userService: UserServiceService,
    private timesheetService: TimesheetServiceService,
    private router: Router,
    private alerts: NgAlertBoxComponent
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().pipe(
      tap(users => {
        this.users = users;
        users.forEach(user => {
          if (user.id) {
            this.checkAndSetPendingStatus(user.id);
          }
        });
      })
    ).subscribe();
  }

  checkAndSetPendingStatus(userId: number): void {
    this.timesheetService.getTimeSheetsByUserId(userId).subscribe(timesheets => {
      const hasPending = timesheets.some(ts => ts.status === StatusType.Pending);
      this.pendingStatusMap.set(userId, hasPending);
    });
  }

  navigateToEdit(userId: number): void {
    this.router.navigate(['/manager-edit', userId]);
  }

  confirmAndDeleteUser(userId: number): void {
    of(confirm('Are you sure you want to delete this user?')).pipe(
      filter(confirmed => confirmed === true), // Proceed only if the user confirmed
      switchMap(() => this.userService.deleteUser(userId)),
      tap(() => this.alerts.dialog('S', 'User Deleted Successfully!')),
      tap(() => this.fetchUsers())
    ).subscribe();
  }

  hasPendingTimesheet(user: User): boolean {
    return user.timesheets?.some(ts => ts.status === StatusType.Pending) ?? false;
  }
}
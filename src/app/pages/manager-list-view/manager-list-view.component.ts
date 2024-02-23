import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timesheet } from 'src/app/models/timesheet.model';
import { User } from 'src/app/models/user.model';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      users.forEach(user => {
        if (user.id) {
          this.checkAndSetPendingStatus(user.id);
        }
      });
    });
  }

  checkAndSetPendingStatus(userId: number): void {
    this.timesheetService.getTimeSheetsByUserId(userId).subscribe(timesheets => {
      const hasPending = timesheets.some(ts => ts.status === 'PENDING');
      this.pendingStatusMap.set(userId, hasPending);
    });
  }

  navigateToEdit(userId: number): void {
    this.router.navigate(['/manager-edit', userId]);
  }

  confirmAndDeleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        // Refresh the list or remove the user from the local array
        this.fetchUsers();
      });
    }
  }

  hasPendingTimesheet(user: User): boolean {
    return user.timesheets?.some(ts => ts.status === 'PENDING') ?? false;
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { StatusType } from 'src/app/models/enums/status-type.enum';
import { Timesheet } from 'src/app/models/timesheet-models/timesheet.model';
import { UpdateTimesheetManager } from 'src/app/models/timesheet-models/updateTimesheetManager.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TimesheetServiceService } from 'src/app/services/timesheet-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manager-edit-view',
  templateUrl: './manager-edit-view.component.html',
  styleUrls: ['./manager-edit-view.component.scss']
})
export class ManagerEditViewComponent implements OnInit {
  editUserForm!: FormGroup;
  userId!: number;
  userTimesheets: Timesheet[] = [];
  statusType = StatusType;
  currentUser = localStorage.getItem('currentUser');
  managerUsername = this.currentUser ? JSON.parse(this.currentUser).username : null;
  managerId = this.currentUser ? JSON.parse(this.currentUser).id : null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserServiceService,
    private timesheetService: TimesheetServiceService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      tap(params => {
        this.userId = +params.get('userId')!;
      }),
      tap(() => this.userEditFormInit()),
      tap(() => this.loadUserData(this.userId)),
      tap(() => this.loadUserTimesheets(this.userId))
    ).subscribe();
  }

  userEditFormInit() {
    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  loadUserData(userId: number) {
    this.userService.getUserById(userId).pipe(
      tap((user) => {
        if (user) {
          this.editUserForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
          });
        }
      }),
      catchError((error) => {
        console.error('Error while loading User Data');
        throw error;
      })
    ).subscribe();
  }

  loadUserTimesheets(userId: number) {
    this.timesheetService.getTimeSheetsByUserId(userId).pipe(
      tap(timesheets => {
        this.userTimesheets = timesheets;
      })
    ).subscribe();
  }

  onSubmit() {
    const isConfirmed = window.confirm('Are you sure you want save the user changes?');
    if (isConfirmed) {
      if (this.editUserForm.valid) {
        this.userService.updateUser(this.userId, this.managerId, this.editUserForm.value).pipe(
          tap(() => {
            this.router.navigate(['/manager-list']);
          }),
          catchError((error) => {
            console.error('Error updating user information.');
            throw error;
          })
        ).subscribe();
      }
    }
    else {
      this.router.navigate(['/manager-list'])
    }
  }

  updateTimesheetStatus(timesheetId: number, status: StatusType) {
    const updatePayload: UpdateTimesheetManager = {
      status: status,
      modifiedBy: this.managerUsername
    };

    this.timesheetService.updateTimesheetManager(timesheetId, updatePayload).pipe(
      tap(() => {
        this.loadUserTimesheets(this.userId);
      }),
      catchError((error) => {
        console.error('Error updating timesheet status.');
        // Optionally handle the error, e.g., by showing a user message
        throw error; // Rethrow or handle as needed
      })
    ).subscribe();
  }
}

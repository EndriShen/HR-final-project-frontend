import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusType } from 'src/app/models/enums/status-type.enum';
import { Timesheet } from 'src/app/models/timesheet.model';
import { UpdateTimesheetManager } from 'src/app/models/updateTimesheetManager.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TimesheetServiceService } from 'src/app/services/timesheet-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manager-edit-view',
  templateUrl: './manager-edit-view.component.html',
  styleUrls: ['./manager-edit-view.component.scss']
})
export class ManagerEditViewComponent implements OnInit{
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
    private timesheetService: TimesheetServiceService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!; // The '+' converts the string to a number
      this.userEditFormInit();
      this.loadUserData(this.userId);
      this.loadUserTimesheets(this.userId);
    });
  }

  userEditFormInit() {
    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  loadUserData(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        if (user) {
          this.editUserForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
          });
        }
      },
      error: () => {
        console.error('Error while loading User Data');
      }
    });
  }

  loadUserTimesheets(userId: number) {
    this.timesheetService.getTimeSheetsByUserId(userId).subscribe(timesheets => {
      this.userTimesheets = timesheets;
    });
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      this.userService.updateUser(this.userId, this.managerId, this.editUserForm.value).subscribe({
        next: () => {
          this.router.navigate(['/manager-list']);
        },
        error: () => {
          console.error('Error updating user information.')
        }
      });
    }
  }

  updateTimesheetStatus(timesheetId: number, status: StatusType) {
    const updatePayload: UpdateTimesheetManager = {
      status: status,
      modifiedBy: this.managerUsername
    };
    this.timesheetService.updateTimesheetManager(timesheetId, updatePayload).subscribe({
      next: () => {
        this.loadUserTimesheets(this.userId);
      },
      error: () => {
        console.error('Error updating timesheet status.')
      }
    });
  }
}

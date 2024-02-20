import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveTimesheetRequest } from 'src/app/models/saveTimesheetRequest.model';
import { Timesheet } from 'src/app/models/timesheet.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TimesheetServiceService } from 'src/app/services/timesheet-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  user: any; // Replace with the correct user model
  vacationRequest: any = { startDay: '', endDay: '', note: '' }; // Replace with the correct model
  vacations: Timesheet[] = []; // Replace with the correct array of vacation data model
  isEditing = false;
  editableTimesheet: Timesheet | null = null;
  editableTimesheetIndex: number | null = null; // Index of the timesheet being edited

  constructor(
    private authService: AuthServiceService,
    private timesheetService: TimesheetServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadVacationRequests();
  }

  loadUserData(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      // If no user data is found, navigate back to the login page or handle accordingly
      this.router.navigate(['/login']);
    }
  }

  loadVacationRequests(): void {
    const userId = this.user?.id; // Use optional chaining to safely access user ID
    if (userId) {
      this.timesheetService.getTimeSheetsByUserId(userId).subscribe({
        next: (timesheets) => {
          this.vacations = timesheets; // Update the vacations list with the response
        },
        error: (error) => {
          console.error('Error loading timesheets:', error);
          // Optionally, handle the error in the UI, such as showing a message
        }
      });
    }
  }

  onSubmit(): void {
    if (this.vacationRequest.startDay && this.vacationRequest.endDay) {
      const timesheetRequest: SaveTimesheetRequest = {
        saveTimesheet: {
          fromDate: this.formatDate(this.vacationRequest.startDay),
          toDate: this.formatDate(this.vacationRequest.endDay),
          note: this.vacationRequest.note
        },
        user:{
        id: this.user.id // Retrieved from the loaded user data
        }
      };

      this.timesheetService.createTimesheet(timesheetRequest).subscribe({
        next: (newTimesheet) => {
          console.log('New timesheet created:', newTimesheet);
          // Reload the page to reflect the changes
          window.location.reload();
        },
        error: (error) => {
          console.error('Error creating timesheet:', error);
          // Handle error state in the UI here
        }
      });
    }
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  editTimesheet(vacation: Timesheet): void {
    this.editableTimesheet = { ...vacation }; // Create a copy for editing
    this.isEditing = true;
  }

  // onEditSubmit(): void {
  //   if (this.editableTimesheet && this.editableTimesheet.id) {
  //     // Call the update method with the edited timesheet data
  //     this.timesheetService.updateTimesheetUser(this.editableTimesheet.id, this.editableTimesheet).subscribe({
  //       next: (updatedTimesheet) => {
  //         // Replace the edited timesheet in the vacations list or refresh the list
  //         this.loadVacationRequests();
  //         this.isEditing = false;
  //         this.editableTimesheet = null; // Reset the editable timesheet
  //       },
  //       error: (error) => {
  //         console.error('Error updating timesheet:', error);
  //         // Handle error state in the UI here
  //       }
  //     });
  //   }
  // }

  onEditSubmit(vacation: Timesheet): void {
    if (vacation && vacation.id) {
      // Call the update method with the edited timesheet data
      this.timesheetService.updateTimesheetUser(vacation.id, vacation).subscribe({
        next: (updatedTimesheet) => {
          // Update the timesheet in the vacations list
          this.vacations[this.editableTimesheetIndex!] = updatedTimesheet;
          this.editableTimesheetIndex = null; // Reset the editable index
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating timesheet:', error);
          // Handle error state in the UI here
        }
      });
    }
  }

  startEdit(vacation: Timesheet, index: number): void {
    this.editableTimesheetIndex = index; // Set the index of the timesheet being edited
  }

  cancelEdit(): void {
    // Reset editing state without saving changes
    this.editableTimesheetIndex = null;
    // Optionally, reload timesheets to reset any changes made in the form
    this.loadVacationRequests();
  }
  // cancelEdit(): void {
  //   // Reset editing state without saving changes
  //   this.isEditing = false;
  //   this.editableTimesheet = null;
  // }
}
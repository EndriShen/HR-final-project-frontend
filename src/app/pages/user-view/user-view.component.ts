import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaveTimesheet } from 'src/app/models/saveTimesheet.model';
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
  user: any;
  vacationRequest: SaveTimesheet = { fromDate: '', toDate: '', note: '' };
  vacations: Timesheet[] = [];
  isEditing = false;
  editableTimesheet: Timesheet | null = null;
  editableTimesheetIndex: number | null = null;
  errorMessage: string | null = null;

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
      this.router.navigate(['/login']);
    }
  }

  loadVacationRequests(): void {
    const userId = this.user?.id;
    if (userId) {
      this.timesheetService.getTimeSheetsByUserId(userId).subscribe({
        next: (timesheets) => {
          this.vacations = timesheets;
        },
        error: (error) => {
          console.error('Error loading timesheets:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.vacationRequest.fromDate && this.vacationRequest.toDate) {
      const timesheetRequest: SaveTimesheetRequest = {
        saveTimesheet: {
          fromDate: this.formatDate(this.vacationRequest.fromDate),
          toDate: this.formatDate(this.vacationRequest.toDate),
          note: this.vacationRequest.note
        },
        user:{
        id: this.user.id
        }
      };

      this.timesheetService.createTimesheet(timesheetRequest).subscribe({
        next: (newTimesheet) => {
          console.log('New timesheet created:', newTimesheet);
          this.errorMessage = null;
          window.location.reload();
        },
        error: (error) => {
          console.error('Error creating timesheet:', error);
          this.errorMessage = error.error.errorMessage || 'An unexpected error occurred.';
        }
      });
    }
  }

  private formatDate(dateString: string): string {
    return new Date(dateString).toISOString().split('T')[0];
  }

  editTimesheet(vacation: Timesheet): void {
    this.editableTimesheet = { ...vacation }; // Create a copy for editing
    this.isEditing = true;
  }

  deleteTimesheet(id: number, index: number): void {
    this.timesheetService.deleteTimesheet(id).subscribe({
      next: () => {
        console.log('Timesheet deleted successfully');
        this.vacations.splice(index, 1); // Remove the timesheet from the list
        this.editableTimesheetIndex = null; // Reset the editable index
        // Optionally, you might reload timesheets from the server instead
        this.loadVacationRequests();
        //window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting timesheet:', error);
        // Handle error state here, possibly showing an error message to the user
      }
    });
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
      this.timesheetService.updateTimesheetUser(vacation.id, vacation).subscribe({
        next: (updatedTimesheet) => {
          this.vacations[this.editableTimesheetIndex!] = updatedTimesheet;
          this.editableTimesheetIndex = null; // Reset the editable index
          window.location.reload();
        },
        error: (error) => {
          console.error('Error updating timesheet:', error);
        }
      });
    }
  }

  startEdit(vacation: Timesheet, index: number): void {
    this.editableTimesheetIndex = index; // Set the index of the timesheet being edited
  }

  cancelEdit(): void {
    this.editableTimesheetIndex = null;
    this.loadVacationRequests();
  }
  // cancelEdit(): void {
  //   // Reset editing state without saving changes
  //   this.isEditing = false;
  //   this.editableTimesheet = null;
  // }
}
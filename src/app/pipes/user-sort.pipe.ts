import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
import { Timesheet } from '../models/timesheet.model';

@Pipe({
  name: 'userSort'
})
export class UserSortPipe implements PipeTransform {

  transform(users: User[], timesheets: Timesheet[], order: 'asc' | 'desc' = 'asc'): User[] {
    if (!users || !timesheets) {
      return users;
    }

    // Create a map of userId to the latest timesheet modified date
    const userLastModifiedMap = new Map<number, Date>();
    timesheets.forEach(timesheet => {
      const existingDate = userLastModifiedMap.get(timesheet.userId!);
      const currentDate = new Date(timesheet.modifiedAt!);
      if (!existingDate || (order === 'asc' && currentDate > existingDate) || (order === 'desc' && currentDate < existingDate)) {
        userLastModifiedMap.set(timesheet.userId!, currentDate);
      }
    });

    // Sort users based on the last modified date of their timesheets
    return users.sort((a, b) => {
      const aLastModified = userLastModifiedMap.get(a.id!) || new Date(0);
      const bLastModified = userLastModifiedMap.get(b.id!) || new Date(0);
      return order === 'asc' ? aLastModified.getTime() - bLastModified.getTime() : bLastModified.getTime() - aLastModified.getTime();
    });
  }
}

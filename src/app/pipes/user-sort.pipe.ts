import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user-models/user.model';

@Pipe({
  name: 'userSort',
  pure: true
})
export class UserSortPipe implements PipeTransform {

  transform(users: User[], latestTimesheetDates: Map<number, string>, ascending: boolean | undefined): User[] {
    if (!users) return [];

    if (ascending !== undefined) {
      return users.sort((a, b) => {
        const aDate = latestTimesheetDates.get(a.id!) || '';
        console.log(aDate);
        const bDate = latestTimesheetDates.get(b.id!) || '';
        console.log(bDate);
        return ascending ? new Date(aDate).getTime() - new Date(bDate).getTime() :
                          new Date(bDate).getTime() - new Date(aDate).getTime();
      });
    } else {
      return users.sort((a, b) => {
        return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
      });
    }
  }
}

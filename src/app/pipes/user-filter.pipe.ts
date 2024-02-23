import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: User[], searchTerm: string): any[] {
    if (!users || !searchTerm) {
      return users;
    }

    return users.filter(user =>
      user.firstName!.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

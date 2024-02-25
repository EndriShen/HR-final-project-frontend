import { Injectable, inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../models/enums/user-role.enum';
import { ManagerAccessGuardService } from './manager-access-guard.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessGuardService {

  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getRole() === UserRole.User) {
      return true;
    } else {
      this.router.navigateByUrl('/path-that-does-not-exist');
      return false;
    }
  }
}

export const UserAccess: CanActivateFn = (): boolean => {
  return inject(UserAccessGuardService).canActivate();
}
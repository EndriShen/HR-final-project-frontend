import { Injectable, inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../models/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class ManagerAccessGuardService {

  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getRole() === UserRole.Manager) {
      return true;
    } else {
      this.router.navigateByUrl('/path-that-does-not-exist');
      return false;
    }
  }
}

export const ManagerAccess: CanActivateFn = (): boolean => {
  return inject(ManagerAccessGuardService).canActivate();
}

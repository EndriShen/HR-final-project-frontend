import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { NgAlertBoxComponent } from 'ng-alert-box-popup';
import { UserRole } from '../models/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuardGuard {
  
  constructor(private authService: AuthServiceService, private router: Router, private alerts: NgAlertBoxComponent) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      const confirmLogout = confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return true;
      } else {
        if(this.authService.getRole() === UserRole.Manager){
          this.router.navigate(['/manager-list'])
        }
        else if(this.authService.getRole() === UserRole.User){
          this.router.navigate(['/user-view'])
        }
        return false;
      }
    }
    return true;
  }
}

export const IsLoggedOut: CanActivateFn = (): boolean => {
  return inject(LoggedOutGuardGuard).canActivate();
}

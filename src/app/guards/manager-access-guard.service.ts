import { Injectable } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { CanActivate, Router } from '@angular/router';
import { UserRole } from '../models/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class ManagerAccessGuardService implements CanActivate {

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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public router: Router, public authService: AuthServiceService) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  confirmLogOut(): void {
    const isConfirmed = window.confirm('Are you sure you want to Log Out?');

    if (isConfirmed) {
      this.logout();
    }
  }

  redirectToMain(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);

      if (user.role === UserRole.User) {
        this.router.navigate(['/user-view']);
      } else if (user.role === UserRole.Manager) {
        this.router.navigate(['/manager-list']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}

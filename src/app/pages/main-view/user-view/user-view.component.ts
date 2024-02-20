import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  constructor(private router: Router, public authService: AuthServiceService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}

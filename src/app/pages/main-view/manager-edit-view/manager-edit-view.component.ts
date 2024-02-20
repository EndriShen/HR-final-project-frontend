import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-manager-edit-view',
  templateUrl: './manager-edit-view.component.html',
  styleUrls: ['./manager-edit-view.component.scss']
})
export class ManagerEditViewComponent {

  constructor(private router: Router, public authService: AuthServiceService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

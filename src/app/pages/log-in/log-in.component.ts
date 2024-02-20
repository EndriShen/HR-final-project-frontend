import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm!: FormGroup;
  loginFailed: boolean = false;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).pipe(
        tap(user => {
          if (user) {
            // Save user data to local storage
            //localStorage.setItem('currentUser', JSON.stringify(user));
  
            // Redirect based on user's role
            const userRole = user.role;
            if (userRole === 'USER') {
              this.router.navigate(['/user-view']);
            } else if (userRole === 'MANAGER') {
              this.router.navigate(['/manager-list']);
            } else {
              // Handle unknown role
              console.error('Unknown role:', userRole);
            }
          } else {
            this.loginFailed = true;
          }
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          this.loginFailed = true;
          return of(null);
        })
      ).subscribe();
    }
  }
}

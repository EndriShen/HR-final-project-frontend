import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserValidators } from 'src/app/validators/user-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) {}
  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required], [UserValidators.usernameTaken(this.authService)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // onSubmit() {
  //   if (this.signupForm.valid) {
  //     const userData = this.signupForm.value;
  //     this.authService.createUser(userData).subscribe({
  //       next: () => {
  //         console.log('Signup successful');
  //         this.router.navigate(['/login']);
  //       },
  //       error: (error) => console.error('Error during signup:', error)
  //     });
  //   }
  // }
  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.authService.createUser(userData).pipe(
        tap(() => {
          console.log('Signup successful');
          this.router.navigate(['/login']);
        }),
        catchError((error) => {
          console.error('Error during signup:', error);
          // If you want to handle errors within the observable chain, you must return an observable here.
          // `of()` creates a new observable. You might want to use a different strategy based on your error handling policy.
          return of();
        })
      ).subscribe(); // The subscription is necessary to trigger the observable chain, but it's kept empty here.
    }
  }
}

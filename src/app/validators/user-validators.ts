import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, catchError, of, Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

export class UserValidators {
    static usernameTaken(authService: AuthServiceService): ValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return authService.isUsernameTaken(control.value).pipe(
                map(isTaken => {
                    // If the username is taken, return an error object, otherwise return null
                    return isTaken ? { usernameTaken: true } : null;
                }),
                catchError(() => of(null)) // In case of an error, treat the username as not taken
            );
        };
    }
}
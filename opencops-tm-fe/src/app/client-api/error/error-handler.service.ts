import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {


  getErrorMessages(error: any): string[] {
    const errorMessages: string[] = [];
    if (error && error.error && error.error.errors) {
      for (const key in error.error.errors) {
        if (error.error.errors.hasOwnProperty(key)) {
          errorMessages.push(error.error.errors[key][0]);
        }
      }
    }
    return errorMessages;
  }


}

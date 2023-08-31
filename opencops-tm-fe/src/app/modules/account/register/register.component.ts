import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'app/client-api/error/error-handler.service';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/server-api/account/account.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @ViewChild('signUpNgForm') signUpNgForm: NgForm;

  errorMessages: string[] = [];
  registerForm: UntypedFormGroup;
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _accountService: AccountService,
    private _formBuilder: UntypedFormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matSnackBar: MatSnackBar
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.registerForm = this._formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.pattern("^(?=.*[\W_])(?=.*[0-9]).{8,}$")]],
      CompanyName: ['', Validators.required],
      Agreements: ['', Validators.requiredTrue],
      Captcha: ['', Validators.required]
    },
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register
   */
  register(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe({
      next: (token) => {
        this.registerForm.get("Captcha").setValue(token);
        if (!this.registerForm.valid) {
          return;
        }
        this._accountService.Register(this.registerForm.value).subscribe({
          next: (response) => {
            if (response.Status == "Success") {
              this._matSnackBar.open(response.Message, 'End now', {
                panelClass: 'snack-success',
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
              this._router.navigate(['/dashboard/library/sections/' + response.Message])
            } else {
              this.registerForm.enable();
              this._matSnackBar.open(response.Message, 'End now', {
                panelClass: 'snack-warning',
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            }
          },
          error: (error) => {
            this._matSnackBar.open("Something went wrong", 'End now', {
              panelClass: 'snack-error',
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        })
      }
    })
  }
}
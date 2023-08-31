import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { AccountService } from 'app/server-api/account/account.service';
import { UserService } from 'app/server-api/user/user.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  signInForm: UntypedFormGroup;
  showAlert: boolean = false;
  Captcha: any

  /**
   * Constructor
   */
  constructor(
    private _accountService: AccountService,
    private _formBuilder: UntypedFormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _matSnackBar: MatSnackBar,
    private _router: Router
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
    this.signInForm = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
      Captcha: ['', Validators.required]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe({
      next: (token) => {
        this.signInForm.get("Captcha").setValue(token);
        if (!this.signInForm.valid) {
          return;
        }
        this.signInForm.disable();
        this._accountService.Login(this.signInForm.value).subscribe({
          next: (response) => {
            if (response.AccessToken) {
              this._userService.Details().subscribe((res) => {
                const redirectURL =
                  this._activatedRoute.snapshot.queryParamMap.get(
                    'redirectURL'
                  ) || 'signed-in-redirect';
                this._router.navigateByUrl(redirectURL);
              });
            } else {
              this._matSnackBar.open(response.Message, 'End now', {
                panelClass: 'snack-warning',
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            }
          },
          error: (error) => {
            this.signInForm.enable();
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
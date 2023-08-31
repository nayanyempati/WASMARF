import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Route, RouterModule } from '@angular/router';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


const routes: Route[] = [

  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: "Login In" }
      },
      {
        path: 'forgot',
        component: ForgotComponent,
        data: { title: "Forgot Password" }
      },
      {
        path: 'reset/:id',
        component: ResetComponent,
        data: { title: "Reset Password" }
      },
      {
        path: 'activate/:id',
        component: ActivateComponent,
        data: { title: "Activate Account" }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: "Register" }
      },
    ]
  }
]


@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent,
    RegisterComponent,
    ActivateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaV3Module,
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: "6Lf6nnYnAAAAAIYgenHIUO2lDdr5nCsrj7DJT6_o" }],
})
export class AccountModule { }

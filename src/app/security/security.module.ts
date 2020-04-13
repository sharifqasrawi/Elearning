import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SecurityRoutingModule } from './security-routing.module';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AuthComponent,
        EmailConfirmationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        SecurityRoutingModule,
    ],
    exports: []
})
export class SecurityModule { }
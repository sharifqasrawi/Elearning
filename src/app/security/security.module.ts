import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
// import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

import { SecurityRoutingModule } from './security-routing.module';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth/auth.component';
import { MaterialModule } from '../material-module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AuthComponent,
        EmailConfirmationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        AccessDeniedComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // RecaptchaModule,
        // RecaptchaFormsModule,
        MaterialModule,
        FontAwesomeModule,
        SecurityRoutingModule,
    ],
    exports: [],
    providers: [
        // {
        //     provide: RECAPTCHA_SETTINGS,
        //     useValue: { siteKey: '<ghtBHreVgsfZRgsQSD578dh5HTUtyjTYJUIuyotuiytOyt864uRNryjtUOYTUO>' } as RecaptchaSettings,
        // },
    ],
})
export class SecurityModule { }
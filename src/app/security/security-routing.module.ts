import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LayoutComponent } from './../layout/layout.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';



const routes: Routes = [
    {
        path: 'security', component: LayoutComponent, children: [
            { path: '', redirectTo: '/security/auth', pathMatch: 'full' },
            { path: 'auth', component: AuthComponent },
            { path: 'email-confirmation', component: EmailConfirmationComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'access-denied', component: AccessDeniedComponent },
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }

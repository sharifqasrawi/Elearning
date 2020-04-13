import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './security/auth.guard';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './security/auth/auth.component';
import { EmailConfirmationComponent } from './security/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './security/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MainComponent } from './admin/main/main.component';
import { ListUsersComponent } from './admin/users/list-users/list-users.component';
import { AdminGuard } from './security/admin.guard';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: 'about-me', component: AboutmeComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ]
  },
  
  // {
  //   path: 'admin', children: [
  //     { path: '', component: MainComponent },
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'list-users', component: ListUsersComponent },
  //   ]
  // },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

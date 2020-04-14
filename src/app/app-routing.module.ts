import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './security/auth.guard';
import { HomeComponent } from './home/home.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { AdminGuard } from './security/admin.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: 'home', component: HomeComponent },
      { path: 'contact-us', component: ContactUsComponent },
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
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

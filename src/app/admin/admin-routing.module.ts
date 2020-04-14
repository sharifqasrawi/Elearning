import { AdminGuard } from './../security/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UsersResolverService } from './users/users-resolver.service';
import { ListMessagesComponent } from './messages/list-messages/list-messages.component';
import { MessagesResolverService } from './messages/messages-resolver.service';


const routes: Routes = [
  {
    path: 'admin', component: MainComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'users', children: [
          { path: 'new-user', component: NewUserComponent },
          { path: 'edit-user', component: NewUserComponent, resolve: [UsersResolverService] },
          { path: '', component: ListUsersComponent, pathMatch: 'full' },
        ]
      },
      {
        path: 'messages', children: [
          { path: '', component: ListMessagesComponent, pathMatch: 'full', resolve: [MessagesResolverService] }
        ]
      },
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }
    ],
    // canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

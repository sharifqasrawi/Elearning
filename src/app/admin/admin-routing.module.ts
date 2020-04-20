import { ListEmailsComponent } from './messages/list-emails/list-emails.component';
import { NewEmailComponent } from './messages/new-email/new-email.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';
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
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { TrashedCategoriesComponent } from './categories/trashed-categories/trashed-categories.component';
import { ListDirectoriesComponent } from './directories/list-directories/list-directories.component';
import { FileUploadComponent } from './files/file-upload/file-upload.component';
import { DirectoriesResolverService } from './directories/directories-resolver.service';
import { ListFilesComponent } from './files/list-files/list-files.component';


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
        path: 'categories', children: [
          { path: '', component: ListCategoriesComponent, pathMatch: 'full' },
          { path: 'trashed', component: TrashedCategoriesComponent },
        ]
      },
      {
        path: 'messages', children: [
          { path: '', component: ListMessagesComponent, pathMatch: 'full' },
          { path: 'send-email', component: NewEmailComponent },
          { path: 'sent-emails', component: ListEmailsComponent },
          { path: ':id', component: ViewMessageComponent,  resolve: [MessagesResolverService] }
        ]
      },
      {
        path: 'directories', children: [
          { path: '', component: ListDirectoriesComponent, pathMatch: 'full'}
        ]
      },
      {
        path: 'files', children: [
          { path: '', component: ListFilesComponent, pathMatch: 'full', resolve: [DirectoriesResolverService]},
          { path: 'upload', component: FileUploadComponent, resolve: [DirectoriesResolverService]}
        ]
      },
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }
    ],
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

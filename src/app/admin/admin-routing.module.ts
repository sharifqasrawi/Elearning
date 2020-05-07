import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseLikesComponent } from './courses/course-details/course-likes/course-likes.component';
import { SessionContentComponent } from './courses/course-details/course-sessions/session-content/session-content.component';
import { CourseSessionsComponent } from './courses/course-details/course-sessions/course-sessions.component';
import { CourseTagsComponent } from './courses/course-details/course-tags/course-tags.component';
import { CourseSectionsComponent } from './courses/course-details/course-sections/course-sections.component';
import { CourseInfoComponent } from './courses/course-details/course-info/course-info.component';
import { CoursesResolverService } from './courses/courses-resolver.service';
import { ListTagsComponent } from './tags/list-tags/list-tags.component';


import { NewCourseComponent } from './courses/new-course/new-course.component';
import { ListCoursesComponent } from './courses/list-courses/list-courses.component';
import { ListEmailsComponent } from './messages/list-emails/list-emails.component';
import { NewEmailComponent } from './messages/new-email/new-email.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';
import { AdminGuard } from './../security/admin.guard';


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
import { TrashedCoursesComponent } from './courses/trashed-courses/trashed-courses.component';
import { CanDeactivateGuard } from './courses/new-course/can-deactivate-guard.service';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';


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
          { path: 'trashed', component: TrashedCategoriesComponent },
          { path: '', component: ListCategoriesComponent, pathMatch: 'full' },
        ]
      },
      {
        path: 'courses', children: [
          {
            path: 'new-course',
            component: NewCourseComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          { path: 'trashed', component: TrashedCoursesComponent },
          {
            path: 'edit-course/:id/:slug',
            component: NewCourseComponent,
            resolve: [CoursesResolverService],
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: ':courseId/:slug',
            component: CourseDetailsComponent,
            resolve: [CoursesResolverService],
            children: [
              {
                path: 'tags/:courseId',
                component: CourseTagsComponent
              },
              {
                path: 'likes/:courseId',
                component: CourseLikesComponent
              },
              {
                path: 'sections/:courseId', children: [
                  {
                    path: 'sessions/:sectionId',
                    children: [
                      {
                        path: 'content/:id/:slug',
                        component: SessionContentComponent
                      },
                      {
                        path: '',
                        component: CourseSessionsComponent,
                        pathMatch: 'full'
                      }
                    ]
                  },
                  {
                    path: '',
                    component: CourseSectionsComponent,
                    pathMatch: 'full'
                  }
                ]
              },
              {
                path: '',
                component: CourseInfoComponent,
                pathMatch: 'full'
              },
            ]
          },
          {
            path: '',
            component: ListCoursesComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'messages', children: [
          { path: '', component: ListMessagesComponent, pathMatch: 'full' },
          { path: 'send-email', component: NewEmailComponent },
          { path: 'sent-emails', component: ListEmailsComponent },
          { path: ':id', component: ViewMessageComponent, resolve: [MessagesResolverService] }
        ]
      },
      {
        path: 'directories', children: [
          { path: '', component: ListDirectoriesComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'tags', children: [
          { path: '', component: ListTagsComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'files', children: [
          { path: '', component: ListFilesComponent, pathMatch: 'full', resolve: [DirectoriesResolverService] },
          { path: 'upload', component: FileUploadComponent, resolve: [DirectoriesResolverService] }
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

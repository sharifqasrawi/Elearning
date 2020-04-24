import { MaterialModule } from './../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountUpModule } from 'ngx-countup';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';

import { NavigationComponent } from './navigation/navigation.component';
import { MainComponent } from './main/main.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NewUserComponent } from './users/new-user/new-user.component';
import { ListMessagesComponent } from './messages/list-messages/list-messages.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { TrashedCategoriesComponent } from './categories/trashed-categories/trashed-categories.component';
import { ListDirectoriesComponent } from './directories/list-directories/list-directories.component';
import { NewDirectoryComponent } from './directories/new-directory/new-directory.component';
import { PhysicalDirectoriesComponent } from './directories/physical-directories/physical-directories.component';
import { FileUploadComponent } from './files/file-upload/file-upload.component';
import { ListFilesComponent } from './files/list-files/list-files.component';
import { DragAndDropDirectiveDirective } from './files/drag-and-drop-directive.directive';
import { ViewMessageComponent } from './messages/view-message/view-message.component';
import { NewEmailComponent } from './messages/new-email/new-email.component';
import { ListEmailsComponent } from './messages/list-emails/list-emails.component';
import { ListCoursesComponent } from './courses/list-courses/list-courses.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { ListTagsComponent } from './tags/list-tags/list-tags.component';
import { NewTagComponent } from './tags/new-tag/new-tag.component';
import { TrashedCoursesComponent } from './courses/trashed-courses/trashed-courses.component';
import { CanDeactivateGuard } from './courses/new-course/can-deactivate-guard.service';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseInfoComponent } from './courses/course-details/course-info/course-info.component';
import { CourseTagsComponent } from './courses/course-details/course-tags/course-tags.component';
import { CourseSectionsComponent } from './courses/course-details/course-sections/course-sections.component';
import { NewSectionComponent } from './courses/course-details/course-sections/new-section/new-section.component';

@NgModule({
    declarations: [
        MainComponent,
        NavigationComponent,
        ListUsersComponent,
        DashboardComponent,
        NewUserComponent,
        ListMessagesComponent,
        ListCategoriesComponent,
        NewCategoryComponent,
        TrashedCategoriesComponent,
        ListDirectoriesComponent,
        NewDirectoryComponent,
        PhysicalDirectoriesComponent,
        FileUploadComponent,
        ListFilesComponent,
        DragAndDropDirectiveDirective,
        ViewMessageComponent,
        NewEmailComponent,
        ListEmailsComponent,
        ListCoursesComponent,
        NewCourseComponent,
        ListTagsComponent,
        NewTagComponent,
        TrashedCoursesComponent,
        CourseDetailsComponent,
        CourseInfoComponent,
        CourseTagsComponent,
        CourseSectionsComponent,
        NewSectionComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        CountUpModule,
        FroalaEditorModule.forRoot(), 
        FroalaViewModule.forRoot(),
        AdminRoutingModule,
        SharedModule,
    ],
    providers: [
        CanDeactivateGuard
    ]
})
export class AdminModule { }
import { MaterialModule } from './../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        AdminRoutingModule,
        SharedModule,
    ],
})
export class AdminModule { }
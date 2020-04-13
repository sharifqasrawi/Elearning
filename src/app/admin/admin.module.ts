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

@NgModule({
    declarations: [
        MainComponent,
        NavigationComponent,
        ListUsersComponent,
        DashboardComponent,
        NewUserComponent,
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
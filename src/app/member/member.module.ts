import { RatingModule } from 'ng-starrating';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountUpModule } from 'ngx-countup';

import { MaterialModule } from '../material-module';

import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberRoutingModule } from './member-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MemberCoursesComponent } from './member-courses/member-courses.component';
import { MemberSavedSessionsComponent } from './member-saved-sessions/member-saved-sessions.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReportsComponent } from './reports/reports.component';
import { ViewReportComponent } from './reports/view-report/view-report.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    declarations: [
        MemberDashboardComponent,
        MemberCoursesComponent,
        MemberSavedSessionsComponent,
        EditProfileComponent,
        ReportsComponent,
        ViewReportComponent,
        ChangePasswordComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        CountUpModule,
        RatingModule,
        MemberRoutingModule,
        SharedModule
    ],
    providers: [
    ]
})
export class MemberModule { }
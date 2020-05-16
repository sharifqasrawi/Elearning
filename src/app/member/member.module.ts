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

@NgModule({
    declarations: [
        MemberDashboardComponent,
        MemberCoursesComponent,
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
        MemberRoutingModule,
        SharedModule
    ],
    providers: [
    ]
})
export class MemberModule { }
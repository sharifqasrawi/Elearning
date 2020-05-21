import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../security/auth.guard';

import { LayoutComponent } from './../layout/layout.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberCoursesComponent } from './member-courses/member-courses.component';
import { MemberSavedSessionsComponent } from './member-saved-sessions/member-saved-sessions.component';
import { ReportsComponent } from './reports/reports.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {
        path: 'member',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: MemberDashboardComponent,
                children: [
                    { path: 'courses', component: MemberCoursesComponent },
                    { path: 'saved-sessions', component: MemberSavedSessionsComponent },
                    { path: 'reports', component: ReportsComponent },
                ]
            },
            { path: 'edit-profile', component: EditProfileComponent },
            { path: 'change-password', component: EditProfileComponent },
            { path: '', redirectTo: '/member/dashboard', pathMatch: 'full' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule { }

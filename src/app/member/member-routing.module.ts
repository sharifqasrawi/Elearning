import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../security/auth.guard';

import { LayoutComponent } from './../layout/layout.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberCoursesComponent } from './member-courses/member-courses.component';

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
                    { path: 'courses', component: MemberCoursesComponent, pathMatch: 'full' },
                ]
            },
            { path: '', redirectTo: '/member/dashboard', pathMatch: 'full' }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MemberRoutingModule { }

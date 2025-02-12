import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { CoursesResolverService } from './courses/courses-resolver.service';
import { AuthGuard } from './security/auth.guard';
import { HomeComponent } from './home/home.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { CoursesComponent } from './courses/courses.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { CourseViewComponent } from './courses/course-view/course-view.component';
import { CourseInfoComponent } from './courses/course-view/course-info/course-info.component';
import { CourseSessionComponent } from './courses/course-view/course-session/course-session.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { CourseCommentsComponent } from './courses/course-view/course-comments/course-comments.component';
import { QuizProccessComponent } from './quizzes/quiz-proccess/quiz-proccess.component';
import { QuizResultComponent } from './quizzes/quiz-result/quiz-result.component';
import { CanDeactivateGuard } from './quizzes/quiz-proccess/can-deactivate-guard.service';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'courses',
        children: [
          {
            path: 'course/:courseId/:courseSlug',
            component: CourseViewComponent,
            children: [
              {
                path: 'session/:sessionId/:sessionSlug',
                component: CourseSessionComponent,
              },
              { path: 'comments/:courseId', component: CourseCommentsComponent },
              { path: '', component: CourseInfoComponent, pathMatch: 'full' }
            ]
          },
          { path: '', component: CoursesComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'categories/:categoryId/:categorySlug',
        children: [
          {
            path: 'course/:courseId/:courseSlug',
            component: CourseViewComponent,
            children: [
              {
                path: 'session/:sessionId/:sessionSlug',
                component: CourseSessionComponent,
              },
              { path: 'comments/:courseId', component: CourseCommentsComponent },
              { path: '', component: CourseInfoComponent, pathMatch: 'full' }
            ]
          },
          { path: '', component: CoursesComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'quizzes',
        children: [
          { path: ':quizId/:quizSlug', component: QuizComponent },
          {
            path: ':quizId/:quizSlug/start',
            component: QuizProccessComponent,
            // canDeactivate: [CanDeactivateGuard]
          },
          { path: ':quizId/:quizSlug/result', component: QuizResultComponent },
          { path: '', component: QuizzesComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'about-me',
        component: AboutmeComponent,
      },
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ],
  },
  {
    path: '**', component: LayoutComponent, children: [
      { path: '', component: NotFoundComponent, pathMatch: 'full' }
    ]
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

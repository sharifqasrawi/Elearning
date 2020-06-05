import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CountUpModule } from 'ngx-countup';
import { TimeagoModule } from 'ngx-timeago';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { RatingModule } from 'ng-starrating';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import * as fromApp from './store/app.reducer';

import { ReportsEffects } from './admin/reports/store/reports.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { LoginEffects } from './security/login/store/login.effects';
import { RegisterEffects } from './security/register/store/register.effects';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';
import { UsersEffects } from './admin/users/store/users.effects';
import { MaterialModule } from './material-module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MessagesEffects } from './admin/messages/store/messages.effects';
import { CategoriesEffects } from './admin/categories/store/categories.effects';
import { CoursesEffects } from './admin/courses/store/courses.effects';
import { LayoutComponent } from './layout/layout.component';
import { DirectoriesEffects } from './admin/directories/store/directories.effects';
import { FilesEffects } from './admin/files/store/files.effects';
import { SessionContentsEffects } from './admin/courses/course-details/course-sessions/session-content/store/session-contents.effects';
import { CoursesComponent } from './courses/courses.component';
import { HomeEffects } from './home/store/home.effects';
import { SessionsEffects } from './admin/courses/course-details/course-sessions/store/sessions.effects';
import { SectionsEffects } from './admin/courses/course-details/course-sections/store/sections.effects';
import { TagsEffects } from './admin/tags/store/tags.effects';
import { HomeCoursesEffects } from './courses/store/courses.effects';
import { CourseViewComponent } from './courses/course-view/course-view.component';
import { CourseInfoComponent } from './courses/course-view/course-info/course-info.component';
import { CourseSessionComponent } from './courses/course-view/course-session/course-session.component';
import { CourseCommentsComponent } from './courses/course-view/course-comments/course-comments.component';
import { HomeCommentsEffects } from './courses/course-view/course-comments/store/comments.effects';
import { HomeSessionEffects } from './courses/course-view/course-session/store/session.effects';
import { NotificationsEffects } from './admin/notifications/store/notifications.effects';
import { CoursePickupDialogComponent } from './courses/course-view/course-pickup-dialog/course-pickup-dialog.component';
import { MemberEffects } from './member/store/member.effects';
import { MemberModule } from './member/member.module';
import { CommonModule } from '@angular/common';
import { AppSettingsEffects } from './AppSettings/store/app-settings.effects';
import { CommentLikesComponent } from './courses/course-view/course-comments/comment-likes/comment-likes.component';
import { ReportBugComponent } from './report-bug/report-bug.component';
import { QuizzesEffects } from './admin/quizzes/store/quizzes.effects';
import { HomeQuizzesEffects } from './quizzes/store/quizzes.effects';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { QuizProccessComponent } from './quizzes/quiz-proccess/quiz-proccess.component';
import { CanDeactivateGuard } from './quizzes/quiz-proccess/can-deactivate-guard.service';
import { QuizResultComponent } from './quizzes/quiz-result/quiz-result.component';
import { DynamicLocaleId } from './internationalization/DynamicLocaleId';

registerLocaleData(localeFr, 'fr');
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AboutmeComponent,
    ContactUsComponent,
    LayoutComponent,
    CoursesComponent,
    CourseViewComponent,
    CourseInfoComponent,
    CourseSessionComponent,
    CourseCommentsComponent,
    CoursePickupDialogComponent,
    CommentLikesComponent,
    ReportBugComponent,
    QuizzesComponent,
    QuizComponent,
    QuizProccessComponent,
    QuizResultComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    TimeagoModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([
      LoginEffects,
      RegisterEffects,
      UsersEffects,
      MessagesEffects,
      NotificationsEffects,
      CategoriesEffects,
      HomeEffects,
      CoursesEffects,
      HomeCoursesEffects,
      HomeSessionEffects,
      SectionsEffects,
      SessionsEffects,
      SessionContentsEffects,
      DirectoriesEffects,
      FilesEffects,
      TagsEffects,
      HomeCommentsEffects,
      MemberEffects,
      AppSettingsEffects,
      ReportsEffects,
      QuizzesEffects,
      HomeQuizzesEffects
    ]),
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CountUpModule,
    MonacoEditorModule.forRoot(),
    RatingModule,
    SharedModule,
    SecurityModule,
    AdminModule,
    MemberModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
  ],
  providers: [
    // { provide: LOCALE_ID, useClass: DynamicLocaleId},
    // { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // },
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

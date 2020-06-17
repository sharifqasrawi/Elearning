import { MatVideoModule } from 'mat-video';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './../material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountUpModule } from 'ngx-countup';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ToastrModule } from 'ngx-toastr';
import { MonacoEditorModule } from 'ngx-monaco-editor';

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
import { TrashedCoursesComponent } from './courses/trashed-courses/trashed-courses.component';
import { CanDeactivateGuard } from './courses/new-course/can-deactivate-guard.service';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseInfoComponent } from './courses/course-details/course-info/course-info.component';
import { CourseTagsComponent } from './courses/course-details/course-tags/course-tags.component';
import { CourseSectionsComponent } from './courses/course-details/course-sections/course-sections.component';
import { NewSectionComponent } from './courses/course-details/course-sections/new-section/new-section.component';
import { CourseSessionsComponent } from './courses/course-details/course-sessions/course-sessions.component';
import { NewSessionComponent } from './courses/course-details/course-sessions/new-session/new-session.component';
import { SessionContentComponent } from './courses/course-details/course-sessions/session-content/session-content.component';
import { NewContentComponent } from './courses/course-details/course-sessions/session-content/new-content/new-content.component';
import { CourseLikesComponent } from './courses/course-details/course-likes/course-likes.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CourseClassComponent } from './courses/course-details/course-class/course-class.component';
import { AppRatingsComponent } from './app-ratings/app-ratings.component';
import { CourseCommentsComponent } from './courses/course-details/course-comments/course-comments.component';
import { TimeagoModule } from 'ngx-timeago';
import { AddMemberComponent } from './courses/course-details/course-class/add-member/add-member.component';
import { BugReportsComponent } from './reports/bug-reports/bug-reports.component';
import { ViewReportComponent } from './reports/bug-reports/view-report/view-report.component';
import { ListQuizzesComponent } from './quizzes/list-quizzes/list-quizzes.component';
import { NewQuizComponent } from './quizzes/new-quiz/new-quiz.component';
import { TrashedQuizzesComponent } from './quizzes/trashed-quizzes/trashed-quizzes.component';
import { SetQuizComponent } from './quizzes/set-quiz/set-quiz.component';
import { SetQuestionComponent } from './quizzes/set-quiz/set-question/set-question.component';
import { NewQuestionComponent } from './quizzes/set-quiz/set-question/new-question/new-question.component';
import { QuestionsLandingPageComponent } from './quizzes/set-quiz/set-question/questions-landing-page/questions-landing-page.component';
import { NewAnswerComponent } from './quizzes/set-quiz/set-question/new-answer/new-answer.component';
import { ListCountriesComponent } from './countries/list-countries/list-countries.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsiteVisitorsComponent } from './website-visitors/website-visitors.component';
import { VisitorDetailsComponent } from './website-visitors/visitor-details/visitor-details.component';

@NgModule({
    declarations: [
        MainComponent,
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
        TrashedCoursesComponent,
        CourseDetailsComponent,
        CourseInfoComponent,
        CourseTagsComponent,
        CourseSectionsComponent,
        NewSectionComponent,
        CourseSessionsComponent,
        NewSessionComponent,
        SessionContentComponent,
        NewContentComponent,
        CourseLikesComponent,
        NotificationsComponent,
        CourseClassComponent,
        AppRatingsComponent,
        CourseCommentsComponent,
        AddMemberComponent,
        BugReportsComponent,
        ViewReportComponent,
        ListQuizzesComponent,
        NewQuizComponent,
        TrashedQuizzesComponent,
        SetQuizComponent,
        SetQuestionComponent,
        NewQuestionComponent,
        QuestionsLandingPageComponent,
        NewAnswerComponent,
        ListCountriesComponent,
        AboutComponent,
        WebsiteVisitorsComponent,
        VisitorDetailsComponent,
        
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        CountUpModule,
        CKEditorModule,
        ToastrModule.forRoot({
            // preventDuplicates: true
        }),
        MonacoEditorModule.forRoot(),
        TimeagoModule.forRoot(),
        TranslateModule,
        BrowserAnimationsModule,
        MatVideoModule,
        AdminRoutingModule,
        SharedModule,
    ],
    providers: [
        CanDeactivateGuard
    ]
})
export class AdminModule { }
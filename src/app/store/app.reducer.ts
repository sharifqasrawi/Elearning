import { ActionReducerMap } from '@ngrx/store';

import * as fromLogin from '../security/login/store/login.reducer';
import * as fromRegister from '../security/register/store/register.reducer';
import * as fromUsers from '../admin/users/store/users.reducer';
import * as fromMessages from '../admin/messages/store/messages.reducer';
import * as fromCategories from '../admin/categories/store/categories.reducer';
import * as fromCourses from '../admin/courses/store/courses.reducer';
import * as fromDirectories from '../admin/directories/store/directories.reducer';
import * as fromFiles from '../admin/files/store/files.reducer';
import * as fromTags from '../admin/tags/store/tags.reducer';
import * as fromSections from '../admin/courses/course-details/course-sections/store/sections.reducer';
import * as fromSessions from '../admin/courses/course-details/course-sessions/store/sessions.reducer';
import * as fromSessionContents from '../admin/courses/course-details/course-sessions/session-content/store/session-contents.reducer';
import * as fromNotifications from '../admin/notifications/store/notifications.reducer';
import * as fromReports from '../admin/reports/store/reports.reducer';

import * as fromHome from '../home/store/home.reducer';
import * as fromHomeCourses from '../courses/store/courses.reducer';
import * as fromHomeSession from '../courses/course-view/course-session/store/session.reducer';
import * as fromHomeComments from '../courses/course-view/course-comments/store/comments.reducer';
import * as fromMember from '../member/store/member.reducer';
import * as fromAppSettings from '../AppSettings/store/app-settings.reducer';
import * as fromQuizzes from '../admin/quizzes/store/quizzes.reducer';
import * as fromHomeQuizzes from '../quizzes/store/quizzes.reducer';


export interface AppState {
    login: fromLogin.State
    register: fromRegister.State,
    users: fromUsers.State,
    messages: fromMessages.State,
    notifications: fromNotifications.State,
    categories: fromCategories.State,
    home: fromHome.State,
    homeCourses: fromHomeCourses.State,
    courses: fromCourses.State,
    sections: fromSections.State,
    sessions: fromSessions.State,
    homeSession: fromHomeSession.State,
    sessionContents: fromSessionContents.State,
    directories: fromDirectories.State,
    files: fromFiles.State,
    tags: fromTags.State,
    homeComments: fromHomeComments.State,
    member: fromMember.State,
    appSettings: fromAppSettings.State,
    reports: fromReports.State,
    quizzes: fromQuizzes.State,
    homeQuizzes: fromHomeQuizzes.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    login: fromLogin.loginReducer,
    register: fromRegister.registerReducer,
    users: fromUsers.usersReducer,
    messages: fromMessages.messagesReducer,
    notifications: fromNotifications.notificationsReducer,
    categories: fromCategories.categoriesReducer,
    home: fromHome.homeReducer,
    courses: fromCourses.coursesReducer,
    homeCourses: fromHomeCourses.coursesReducer,
    sections: fromSections.sectionsReducer,
    sessions: fromSessions.sessionsReducer,
    homeSession: fromHomeSession.sessionReducer,
    sessionContents: fromSessionContents.sessionContentsReducer,
    directories: fromDirectories.directoriesReducer,
    files: fromFiles.filesReducer,
    tags: fromTags.tagsReducer,
    homeComments: fromHomeComments.commentsReducer,
    member: fromMember.memberReducer,
    appSettings: fromAppSettings.appSettingsReducer,
    reports: fromReports.reportsReducer,
    quizzes: fromQuizzes.quizzesReducer,
    homeQuizzes:fromHomeQuizzes.homeQuizzesReducer,
};
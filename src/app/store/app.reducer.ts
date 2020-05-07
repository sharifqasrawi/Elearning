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

import * as fromHomeCategories from '../home/store/categories.reducer';
import * as fromHomeCourses from '../courses/store/courses.reducer';
import * as fromHomeSession from '../courses/course-view/course-session/store/session.reducer';

export interface AppState {
    login: fromLogin.State
    register: fromRegister.State,
    users: fromUsers.State,
    messages: fromMessages.State,
    categories: fromCategories.State,
    homeCategories: fromHomeCategories.State,
    homeCourses: fromHomeCourses.State,
    courses: fromCourses.State,
    sections: fromSections.State,
    sessions: fromSessions.State,
    homeSession: fromHomeSession.State,
    sessionContents: fromSessionContents.State,
    directories: fromDirectories.State,
    files: fromFiles.State,
    tags: fromTags.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    login: fromLogin.loginReducer,
    register: fromRegister.registerReducer,
    users: fromUsers.usersReducer,
    messages: fromMessages.messagesReducer,
    categories: fromCategories.categoriesReducer,
    homeCategories: fromHomeCategories.categoriesReducer,
    courses: fromCourses.coursesReducer,
    homeCourses: fromHomeCourses.coursesReducer,
    sections: fromSections.sectionsReducer,
    sessions: fromSessions.sessionsReducer,
    homeSession: fromHomeSession.sessionReducer,
    sessionContents: fromSessionContents.sessionContentsReducer,
    directories: fromDirectories.directoriesReducer,
    files: fromFiles.filesReducer,
    tags: fromTags.tagsReducer,
};
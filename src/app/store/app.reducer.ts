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

export interface AppState {
    login: fromLogin.State
    register: fromRegister.State,
    users: fromUsers.State,
    messages: fromMessages.State,
    categories: fromCategories.State,
    courses: fromCourses.State,
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
    courses: fromCourses.coursesReducer,
    directories: fromDirectories.directoriesReducer,
    files: fromFiles.filesReducer,
    tags: fromTags.tagsReducer,
};
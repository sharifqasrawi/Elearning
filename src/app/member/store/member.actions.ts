import { UserQuiz } from './../../models/userQuiz.model';
import { DoneSession } from './../../models/doneSession.model';
import { Action } from '@ngrx/store';

import { Favorite } from './../../models/favorite.model';
import { SavedSession } from './../../models/savedSession.model';
import { Course } from './../../models/course.model';

export const FETCH_COURSES_START = '[Member] Fetch Courses Start';
export const FETCH_COURSES_SUCCESS = '[Member] Fetch Courses Success';
export const FETCH_COURSES_FAIL = '[Member] Fetch Courses Fail';

export const FETCH_FAVORITES_START = '[Member] Fetch Favorites Start';
export const FETCH_FAVORITES_SUCCESS = '[Member] Fetch Favorites Success';
export const FETCH_FAVORITES_FAIL = '[Member] Fetch Favorites Fail';

export const FETCH_FAVORITE_COURSES_START = '[Member] Fetch Favorite Courses Start';
export const FETCH_FAVORITE_COURSES_SUCCESS = '[Member] Fetch Favorite Courses Success';
export const FETCH_FAVORITE_COURSES_FAIL = '[Member] Fetch Favorite Courses Fail';

export const ADD_COURSE_TO_FAVORITES_START = '[Home Courses] Add Course To Favorites Start';
export const ADD_COURSE_TO_FAVORITES_SUCCESS = '[Home Courses] Add Course To Favorites Success';
export const ADD_COURSE_TO_FAVORITES_FAIL = '[Home Courses] Add Course To Favorites Fail';

export const REMOVE_COURSE_FROM_FAVORITES_START = '[Home Courses] Remove Course from Favorites Start';
export const REMOVE_COURSE_FROM_FAVORITES_SUCCESS = '[Home Courses] Remove Course from Favorites Success';
export const REMOVE_COURSE_FROM_FAVORITES_FAIL = '[Home Courses] Remove Course from Favorites Fail';


export const FETCH_SAVED_SESSIONS_START = '[Member] Fetch Saved Sessions Start';
export const FETCH_SAVED_SESSIONS_SUCCESS = '[Member] Fetch Saved Sessions Success';
export const FETCH_SAVED_SESSIONS_FAIL = '[Member] Fetch Saved Sessions Fail';

export const FETCH_USER_SAVED_SESSIONS_START = '[Member] Fetch User Saved Sessions Start';


export const SAVE_SESSION_START = '[Member] Save Session Start';
export const SAVE_SESSION_SUCCESS = '[Member] Save Session Success';
export const SAVE_SESSION_FAIL = '[Member] Save Session Fail';

export const REMOVE_SESSION_START = '[Member] Remove Session Start';
export const REMOVE_SESSION_SUCCESS = '[Member] Remove Session Success';
export const REMOVE_SESSION_FAIL = '[Member] Remove Session Fail';

export const MARK_SESSION_START = '[Member] Mark Session Start';
export const MARK_SESSION_SUCCESS = '[Member] Mark Session Success';
export const MARK_SESSION_FAIL = '[Member] Mark Session Fail';

export const UNMARK_SESSION_START = '[Member] Unmark Session Start';
export const UNMARK_SESSION_SUCCESS = '[Member] Unmark Session Success';
export const UNMARK_SESSION_FAIL = '[Member] Unmark Session Fail';

export const FETCH_DONE_SESSIONS_START = '[Member] Fetch Done Sessions Start';
export const FETCH_DONE_SESSIONS_SUCCESS = '[Member] Fetch Done Sessions Success';
export const FETCH_DONE_SESSIONS_FAIL = '[Member] Fetch Done Sessions Fail';

export const FETCH_PROGRESS_COURSES_START = '[Member] Fetch Progress Courses Start';
export const FETCH_PROGRESS_COURSES_SUCCESS = '[Member] Fetch Progress Courses Success';
export const FETCH_PROGRESS_COURSES_FAIL = '[Member] Fetch Progress Courses Fail';

export const FETCH_USER_QUIZZES_START = '[Member] Fetch User Quizzes Start';
export const FETCH_USER_QUIZZES_SUCCESS = '[Member] Fetch User Quizzes Success';
export const FETCH_USER_QUIZZES_FAIL = '[Member] Fetch User Quizzes Fail';

export const FETCH_DASHBOARD_INFO_START = '[Member] Fetch Dashboard Info Start';
export const FETCH_DASHBOARD_INFO_SUCCESS = '[Member] Fetch Dashboard Info Success';
export const FETCH_DASHBOARD_INFO_FAIL = '[Member] Fetch Dashboard Info Fail';


export const CLEAR_ERRORS = '[Member] Clear Errors';
export const CLEAR_STATUS = '[Member] Clear Status';



export class FetchCoursesStart implements Action {
    readonly type = FETCH_COURSES_START;
}


export class FetchCoursesSuccess implements Action {
    readonly type = FETCH_COURSES_SUCCESS;

    constructor(public payload: Course[]) { }
}

export class FetchCoursesFail implements Action {
    readonly type = FETCH_COURSES_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class FetchDashboardInfoStart implements Action {
    readonly type = FETCH_DASHBOARD_INFO_START;
}


export class FetchDashboardInfoSuccess implements Action {
    readonly type = FETCH_DASHBOARD_INFO_SUCCESS;

    constructor(public payload: { coursesCount: number, favoritesCount: number, savedSessionsCount: number, userQuizzesCount: number }) { }
}

export class FetchDashboardInfoFail implements Action {
    readonly type = FETCH_DASHBOARD_INFO_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////

export class FetchFavoriteCoursesStart implements Action {
    readonly type = FETCH_FAVORITE_COURSES_START;
}



/////////////////////

export class FetchFavoritesStart implements Action {
    readonly type = FETCH_FAVORITES_START;
}


export class FetchFavoritesSuccess implements Action {
    readonly type = FETCH_FAVORITES_SUCCESS;

    constructor(public payload: Favorite[]) { }
}

export class FetchFavoritesFail implements Action {
    readonly type = FETCH_FAVORITES_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class AddCourseToFavoritesStart implements Action {
    readonly type = ADD_COURSE_TO_FAVORITES_START;

    constructor(public payload: number) { }
}

export class AddCourseToFavoritesSuccess implements Action {
    readonly type = ADD_COURSE_TO_FAVORITES_SUCCESS;

    constructor(public payload: Favorite) { }
}

export class AddCourseToFavoritesFail implements Action {
    readonly type = ADD_COURSE_TO_FAVORITES_FAIL;

    constructor(public payload: string[]) { }
}



/////////////////////


export class RemoveCourseFromFavoritesStart implements Action {
    readonly type = REMOVE_COURSE_FROM_FAVORITES_START;

    constructor(public payload: number) { }
}

export class RemoveCourseFromFavoritesSuccess implements Action {
    readonly type = REMOVE_COURSE_FROM_FAVORITES_SUCCESS;

    constructor(public payload: number) { }
}

export class RemoveCourseFromFavoritesFail implements Action {
    readonly type = REMOVE_COURSE_FROM_FAVORITES_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class SaveSessionStart implements Action {
    readonly type = SAVE_SESSION_START;

    constructor(public payload: { sessionId: number, sessionUrl: string }) { }
}

export class SaveSessionSuccess implements Action {
    readonly type = SAVE_SESSION_SUCCESS;

    constructor(public payload: SavedSession) { }
}

export class SaveSessionFail implements Action {
    readonly type = SAVE_SESSION_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class RemoveSessionStart implements Action {
    readonly type = REMOVE_SESSION_START;

    constructor(public payload: number) { }
}

export class RemoveSessionSuccess implements Action {
    readonly type = REMOVE_SESSION_SUCCESS;

    constructor(public payload: number) { }
}

export class RemoveSessionFail implements Action {
    readonly type = REMOVE_SESSION_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class MarkSessionStart implements Action {
    readonly type = MARK_SESSION_START;

    constructor(public payload: number) { }
}

export class MarkSessionSuccess implements Action {
    readonly type = MARK_SESSION_SUCCESS;

    constructor(public payload: { createdDoneSession: DoneSession, donePercentage: number }) { }
}

export class MarkSessionFail implements Action {
    readonly type = MARK_SESSION_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class UnmarkSessionStart implements Action {
    readonly type = UNMARK_SESSION_START;

    constructor(public payload: number) { }
}

export class UnmarkSessionSuccess implements Action {
    readonly type = UNMARK_SESSION_SUCCESS;

    constructor(public payload: { deletedDoneSessionId: number, donePercentage: number }) { }
}

export class UnmarkSessionFail implements Action {
    readonly type = UNMARK_SESSION_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class FetchDoneSessionsStart implements Action {
    readonly type = FETCH_DONE_SESSIONS_START;

    constructor(public payload: number) { }
}

export class FetchDoneSessionsSuccess implements Action {
    readonly type = FETCH_DONE_SESSIONS_SUCCESS;

    constructor(public payload: { doneSessions: DoneSession[], donePercentage: number }) { }
}

export class FetchDoneSessionsFail implements Action {
    readonly type = FETCH_DONE_SESSIONS_FAIL;

    constructor(public payload: string[]) { }
}



/////////////////////

export class FetchSavedSessionsStart implements Action {
    readonly type = FETCH_SAVED_SESSIONS_START;
}


export class FetchSavedSessionsSuccess implements Action {
    readonly type = FETCH_SAVED_SESSIONS_SUCCESS;

    constructor(public payload: SavedSession[]) { }
}

export class FetchSavedSessionsFail implements Action {
    readonly type = FETCH_SAVED_SESSIONS_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////

export class FetchUserSavedSessionsStart implements Action {
    readonly type = FETCH_USER_SAVED_SESSIONS_START;
}

/////////////////////

export class FetchProgressCoursesStart implements Action {
    readonly type = FETCH_PROGRESS_COURSES_START;
}


export class FetchProgressCoursesSuccess implements Action {
    readonly type = FETCH_PROGRESS_COURSES_SUCCESS;

    constructor(public payload: { memberCoursesProgress: { courseId: number, donePercentage: number }[] }) { }
}

export class FetchProgressCoursesFail implements Action {
    readonly type = FETCH_PROGRESS_COURSES_FAIL;

    constructor(public payload: string[]) { }
}


//////////////

export class FetchUserQuizzesStart implements Action {
    readonly type = FETCH_USER_QUIZZES_START;
}


export class FetchUserQuizzesSuccess implements Action {
    readonly type = FETCH_USER_QUIZZES_SUCCESS;

    constructor(public payload: UserQuiz[]) { }
}

export class FetchUserQuizzesFail implements Action {
    readonly type = FETCH_USER_QUIZZES_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}




//////////////
export type MemberActions =
    | FetchCoursesStart
    | FetchCoursesSuccess
    | FetchCoursesFail
    | FetchFavoriteCoursesStart
    | FetchFavoritesStart
    | FetchFavoritesSuccess
    | FetchFavoritesFail
    | AddCourseToFavoritesStart
    | AddCourseToFavoritesSuccess
    | AddCourseToFavoritesFail
    | RemoveCourseFromFavoritesStart
    | RemoveCourseFromFavoritesSuccess
    | RemoveCourseFromFavoritesFail
    | FetchSavedSessionsStart
    | FetchSavedSessionsSuccess
    | FetchSavedSessionsFail
    | FetchUserSavedSessionsStart
    | SaveSessionStart
    | SaveSessionSuccess
    | SaveSessionFail
    | RemoveSessionStart
    | RemoveSessionSuccess
    | RemoveSessionFail
    | MarkSessionStart
    | MarkSessionSuccess
    | MarkSessionFail
    | UnmarkSessionStart
    | UnmarkSessionSuccess
    | UnmarkSessionFail
    | FetchDoneSessionsStart
    | FetchDoneSessionsSuccess
    | FetchDoneSessionsFail
    | FetchProgressCoursesStart
    | FetchProgressCoursesSuccess
    | FetchProgressCoursesFail
    | FetchUserQuizzesStart
    | FetchUserQuizzesSuccess
    | FetchUserQuizzesFail
    | FetchDashboardInfoStart
    | FetchDashboardInfoSuccess
    | FetchDashboardInfoFail
    | ClearErrors
    | ClearStatus
    ;
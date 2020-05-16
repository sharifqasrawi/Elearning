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

export const SAVE_SESSION_START = '[Member] Save Session Start';
export const SAVE_SESSION_SUCCESS = '[Member] Save Session Success';
export const SAVE_SESSION_FAIL = '[Member] Save Session Fail';

export const REMOVE_SESSION_START = '[Member] Remove Session Start';
export const REMOVE_SESSION_SUCCESS = '[Member] Remove Session Success';
export const REMOVE_SESSION_FAIL = '[Member] Remove Session Fail';


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

    constructor(public payload: number) { }
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


//////////////

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
    | SaveSessionStart
    | SaveSessionSuccess
    | SaveSessionFail
    | RemoveSessionStart
    | RemoveSessionSuccess
    | RemoveSessionFail
    | ClearErrors
    | ClearStatus
    ;
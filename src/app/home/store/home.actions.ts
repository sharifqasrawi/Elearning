import { Course } from './../../models/course.model';
import { Action } from '@ngrx/store';

import { Category } from '../../models/category.model';

export const FETCH_START = '[Home] Fetch Start';
export const FETCH_SUCCESS = '[Home] Fetch Success';
export const FETCH_FAIL = '[Home] Fetch Fail';

export const FETCH_LATEST_COURSES_START = '[Home] Fetch Latest Courses Start Start';
export const FETCH_LATEST_COURSES_SUCCESS = '[Home] Fetch Latest Courses Start Success';
export const FETCH_LATEST_COURSES_FAIL = '[Home] Fetch Latest Courses Start Fail';

export const CLEAR_ERRORS = '[Home] Clear Errors';
export const CLEAR_STATUS = '[Home] Clear Status';

////////////

export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Category[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class FetchLatestCoursesStart implements Action {
    readonly type = FETCH_LATEST_COURSES_START;
}

export class FetchLatestCoursesSuccess implements Action {
    readonly type = FETCH_LATEST_COURSES_SUCCESS;

    constructor(public payload: Course[]) { }
}

export class FetchLatestCoursesFail implements Action {
    readonly type = FETCH_LATEST_COURSES_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////
export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

////

export type HomeActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | FetchLatestCoursesStart
    | FetchLatestCoursesSuccess
    | FetchLatestCoursesFail
    | ClearErrors
    | ClearStatus
    ;
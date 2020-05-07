import { Action } from '@ngrx/store';

import { Course } from './../../models/course.model';

export const FETCH_START = '[Home Courses] Fetch Start';
export const FETCH_SUCCESS = '[Home Courses] Fetch Success';
export const FETCH_FAIL = '[Home Courses] Fetch Fail';

export const LIKE_START = '[Home Courses] Like Start';
export const LIKE_SUCCESS = '[Home Courses] Like Success';
export const LIKE_FAIL = '[Home Courses] Like Fail';

export const CLEAR_ERRORS = '[Home Courses] Clear Errors';
export const CLEAR_STATUS = '[Home Courses] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload?: { categoryId?: number, courseId?: number }) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Course[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}


/////////////////////


export class LikeStart implements Action {
    readonly type = LIKE_START;

    constructor(public payload: { courseId: number, action: string }) { }
}

export class LikeSuccess implements Action {
    readonly type = LIKE_SUCCESS;

    constructor(public payload: Course) { }
}

export class LikeFail implements Action {
    readonly type = LIKE_FAIL;

    constructor(public payload: string[]) { }
}


/////////////////////
export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

//////////

export type HomeCoursesActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | LikeStart
    | LikeSuccess
    | LikeFail
    | ClearErrors
    | ClearStatus
    ;
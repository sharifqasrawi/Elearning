import { Like } from './../../models/like.model';
import { Class } from './../../models/class.model';
import { Action } from '@ngrx/store';

import { Course } from './../../models/course.model';

export const FETCH_START = '[Home Courses] Fetch Start';
export const FETCH_SUCCESS = '[Home Courses] Fetch Success';
export const FETCH_FAIL = '[Home Courses] Fetch Fail';

export const LIKE_START = '[Home Courses] Like Start';
export const LIKE_SUCCESS = '[Home Courses] Like Success';
export const LIKE_FAIL = '[Home Courses] Like Fail';

export const ENROLL_START = '[Home Courses] Enroll Start';
export const ENROLL_SUCCESS = '[Home Courses] Enroll Success';
export const ENROLL_FAIL = '[Home Courses] Enroll Fail';


export const RATE_START = '[Home Courses] Rate Start';
export const RATE_SUCCESS = '[Home Courses] Rate Success';
export const RATE_FAIL = '[Home Courses] Rate Fail';


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

    constructor(public payload: { like: Like, action: string }) { }
}

export class LikeFail implements Action {
    readonly type = LIKE_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class EnrollStart implements Action {
    readonly type = ENROLL_START;

    constructor(public payload: { classId: string, action: string }) { }
}

export class EnrollSuccess implements Action {
    readonly type = ENROLL_SUCCESS;

    constructor(public payload: Class) { }
}

export class EnrollFail implements Action {
    readonly type = ENROLL_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class RateStart implements Action {
    readonly type = RATE_START;

    constructor(public payload: { courseId: number, value: number }) { }
}

export class RateSuccess implements Action {
    readonly type = RATE_SUCCESS;

    constructor(public payload: Course) { }
}

export class RateFail implements Action {
    readonly type = RATE_FAIL;

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
    | RateStart
    | RateSuccess
    | RateFail
    | EnrollStart
    | EnrollSuccess
    | EnrollFail
    | ClearErrors
    | ClearStatus
    ;
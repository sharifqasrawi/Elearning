import { Action } from '@ngrx/store';

import { Course } from './../../../models/course.model';

export const FETCH_START = '[Courses] Fetch Start';
export const FETCH_SUCCESS = '[Courses] Fetch Success';
export const FETCH_FAIL = '[Courses] Fetch Fail';

export const FETCH_DELETED_START = '[Courses] Fetch Deleted Start';
export const FETCH_DELETED_SUCCESS = '[Courses] Fetch Deleted Success';
export const FETCH_DELETED_FAIL = '[Courses] Fetch Deleted Fail';


export const CREATE_START = '[Courses] Create Start';
export const CREATE_SUCCESS = '[Courses] Create Success';
export const CREATE_FAIL = '[Courses] Create Fail';

export const TRASH_RESTORE_START = '[Courses] Tash Restore Start';
export const TRASH_SUCCESS = '[Courses] Tash Success';
export const RESTORE_SUCCESS = '[Courses] Restore Success';
export const TRASH_RESTORE_FAIL = '[Courses] Tash Restore Fail';



export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Course[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

//////////

export class FetchDeletedStart implements Action {
    readonly type = FETCH_DELETED_START;
}

export class FetchDeletedSuccess implements Action {
    readonly type = FETCH_DELETED_SUCCESS;

    constructor(public payload: Course[]) { }
}

export class FetchDeletedFail implements Action {
    readonly type = FETCH_DELETED_FAIL;

    constructor(public payload: string[]) { }
}


//////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        title_EN: string,
        duration: number,
        isPublished: boolean,
        category: number,
        price: number,
        isFree: boolean,
        imagePath: string,
        languages: string,
        level: string,
        description_EN: string,
        prerequisites_EN: string
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Course) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}


//////////

export class TrashRestoreStart implements Action {
    readonly type = TRASH_RESTORE_START;

    constructor(public payload: { id: number, action: string}) { }
}

export class TrashSuccess implements Action {
    readonly type = TRASH_SUCCESS;

    constructor(public payload: Course) { }
}

export class RestoreSuccess implements Action {
    readonly type = RESTORE_SUCCESS;

    constructor(public payload: Course) { }
}

export class TrashRestoreFail implements Action {
    readonly type = TRASH_RESTORE_FAIL;

    constructor(public payload: string[]) { }
}

//////////

export type CoursesActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | FetchDeletedStart
    | FetchDeletedSuccess
    | FetchDeletedFail
    | CreateStart
    | CreateSuccess
    | CreateFail
    | TrashRestoreStart
    | RestoreSuccess
    | TrashSuccess
    | TrashRestoreFail
    ;
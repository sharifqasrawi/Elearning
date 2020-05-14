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

export const UPDATE_START = '[Courses] Update Start';
export const UPDATE_SUCCESS = '[Courses] Update Success';
export const UPDATE_FAIL = '[Courses] Update Fail';

export const PUBLISH_UNPUBLISH_START = '[Courses] Publish Unpublish Start';
export const PUBLISH_UNPUBLISH_SUCCESS = '[Courses] Publish Unpublish Success';
export const PUBLISH_UNPUBLISH_FAIL = '[Courses] Publish Unpublish Fail';

export const TRASH_RESTORE_START = '[Courses] Trash Restore Start';
export const TRASH_SUCCESS = '[Courses] Trash Success';
export const RESTORE_SUCCESS = '[Courses] Restore Success';
export const TRASH_RESTORE_FAIL = '[Courses] Trash Restore Fail';

export const ADD_REMOVE_TAG_START = '[Courses] Add Remove Tag Start';
export const ADD_REMOVE_TAG_SUCCESS = '[Courses] Remove Tag Success';
export const ADD_REMOVE_TAG_FAIL = '[Courses] Remove Tag Restore Fail';

export const CREATE_CLASS_START = '[Courses] Create Class Start';
export const CREATE_CLASS_SUCCESS = '[Courses] Create Class Success';
export const CREATE_CLASS_FAIL = '[Courses] Create Class Fail';


export const CLEAR_ERRORS = '[Courses] Clear Errors';
export const CLEAR_STATUS = '[Courses] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload?: number) { }
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

export class CreateClassStart implements Action {
    readonly type = CREATE_CLASS_START;

    constructor(public payload: {
        name_EN: string,
        courseId: number
    }) { }
}

export class CreateClassSuccess implements Action {
    readonly type = CREATE_CLASS_SUCCESS;

    constructor(public payload: Course) { }
}

export class CreateClassFail implements Action {
    readonly type = CREATE_CLASS_FAIL;

    constructor(public payload: string[]) { }
}

//////////

export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        id: number,
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

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Course) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}

//////////

export class PublishUnpublishStart implements Action {
    readonly type = PUBLISH_UNPUBLISH_START;

    constructor(public payload: {
        id: number,
        action: string
    }) { }
}

export class PublishUnpublishSuccess implements Action {
    readonly type = PUBLISH_UNPUBLISH_SUCCESS;

    constructor(public payload: Course) { }
}

export class PublishUnpublishFail implements Action {
    readonly type = PUBLISH_UNPUBLISH_FAIL;

    constructor(public payload: string[]) { }
}


//////////

export class AddRemoveTagStart implements Action {
    readonly type = ADD_REMOVE_TAG_START;

    constructor(public payload: {
        courseId: number,
        tagId: number,
        action: string
    }) { }
}

export class AddRemoveTagSuccess implements Action {
    readonly type = ADD_REMOVE_TAG_SUCCESS;

    constructor(public payload: Course) { }
}

export class AddRemoveTagFail implements Action {
    readonly type = ADD_REMOVE_TAG_FAIL;

    constructor(public payload: string[]) { }
}

//////////

export class TrashRestoreStart implements Action {
    readonly type = TRASH_RESTORE_START;

    constructor(public payload: { id: number, action: string }) { }
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


/////////////////////
export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
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
    | CreateClassStart
    | CreateClassSuccess
    | CreateClassFail
    | PublishUnpublishStart
    | PublishUnpublishSuccess
    | PublishUnpublishFail
    | AddRemoveTagStart
    | AddRemoveTagSuccess
    | AddRemoveTagFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | TrashRestoreStart
    | RestoreSuccess
    | TrashSuccess
    | TrashRestoreFail
    | ClearErrors
    | ClearStatus
    ;
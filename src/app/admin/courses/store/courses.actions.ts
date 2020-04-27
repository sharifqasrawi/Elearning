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

export const TRASH_RESTORE_START = '[Courses] Tash Restore Start';
export const TRASH_SUCCESS = '[Courses] Tash Success';
export const RESTORE_SUCCESS = '[Courses] Restore Success';
export const TRASH_RESTORE_FAIL = '[Courses] Tash Restore Fail';

export const ADD_REMOVE_TAG_START = '[Courses] Add Remove Tag Start';
export const ADD_REMOVE_TAG_SUCCESS = '[Courses] Remove Tag Success';
export const ADD_REMOVE_TAG_FAIL = '[Courses] Remove Tag Restore Fail';

export const CREATE_SECTION_START = '[Courses] Create Section Start';
export const CREATE_SECTION_SUCCESS = '[Courses] Create Section Success';
export const CREATE_SECTION_FAIL = '[Courses] Create Section Fail';

export const UPDATE_SECTION_START = '[Courses] Update Section Start';
export const UPDATE_SECTION_SUCCESS = '[Courses] Update Section Success';
export const UPDATE_SECTION_FAIL = '[Courses] Update Section Fail';

export const DELETE_SECTION_START = '[Courses] Delete Section Start';
export const DELETE_SECTION_SUCCESS = '[Courses] Delete Section Success';
export const DELETE_SECTION_FAIL = '[Courses] Delete Section Fail';


export const CREATE_SESSION_START = '[Courses] Create Session Start';
export const CREATE_SESSION_SUCCESS = '[Courses] Create Session Success';
export const CREATE_SESSION_FAIL = '[Courses] Create Session Fail';

export const UPDATE_SESSION_START = '[Courses] Update Session Start';
export const UPDATE_SESSION_SUCCESS = '[Courses] Update Session Success';
export const UPDATE_SESSION_FAIL = '[Courses] Update Session Fail';

export const DELETE_SESSION_START = '[Courses] Delete Session Start';
export const DELETE_SESSION_SUCCESS = '[Courses] Delete Session Success';
export const DELETE_SESSION_FAIL = '[Courses] Delete Session Fail';




export const CLEAR_ERRORS = '[Courses] Clear Errors';
export const CLEAR_STATUS = '[Courses] Clear Status';


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

///////////////


export class CreateSectionStart implements Action {
    readonly type = CREATE_SECTION_START;

    constructor(public payload: {
        course: { id: number },
        name_EN: string,
        order: number,
        action: string
    }) { }
}

export class CreateSectionSuccess implements Action {
    readonly type = CREATE_SECTION_SUCCESS;

    constructor(public payload: Course) { }
}

export class CreateSectionFail implements Action {
    readonly type = CREATE_SECTION_FAIL;

    constructor(public payload: string[]) { }
}


export class UpdateSectionStart implements Action {
    readonly type = UPDATE_SECTION_START;

    constructor(public payload: {
        course: { id: number },
        id: number,
        name_EN: string,
        order: number,
        action: string
    }) { }
}

export class UpdateSectionSuccess implements Action {
    readonly type = UPDATE_SECTION_SUCCESS;

    constructor(public payload: Course) { }
}

export class UpdateSectionFail implements Action {
    readonly type = UPDATE_SECTION_FAIL;

    constructor(public payload: string[]) { }
}


export class DeleteSectionStart implements Action {
    readonly type = DELETE_SECTION_START;

    constructor(public payload: {
        course: { id: number },
        id: number,
        action: string
    }) { }
}


export class DeleteSectionSuccess implements Action {
    readonly type = DELETE_SECTION_SUCCESS;

    constructor(public payload: Course) { }
}

export class DeleteSectionFail implements Action {
    readonly type = DELETE_SECTION_FAIL;

    constructor(public payload: string[]) { }
}

//////////////


export class CreateSessionStart implements Action {
    readonly type = CREATE_SESSION_START;

    constructor(public payload: {
        section: { id: number, course: { id: number } },
        title_EN: string,
        duration: number,
        order: number,
        action: string
    }) { }
}

export class CreateSessionSuccess implements Action {
    readonly type = CREATE_SESSION_SUCCESS;

    constructor(public payload: Course) { }
}

export class CreateSessionFail implements Action {
    readonly type = CREATE_SESSION_FAIL;

    constructor(public payload: string[]) { }
}



export class UpdateSessionStart implements Action {
    readonly type = UPDATE_SESSION_START;

    constructor(public payload: {
        id: number,
        section: { id: number, course: { id: number } },
        title_EN: string,
        duration: number,
        order: number,
        action: string
    }) { }
}

export class UpdateSessionSuccess implements Action {
    readonly type = UPDATE_SESSION_SUCCESS;

    constructor(public payload: Course) { }
}

export class UpdateSessionFail implements Action {
    readonly type = UPDATE_SESSION_FAIL;

    constructor(public payload: string[]) { }
}


export class DeleteSessionStart implements Action {
    readonly type = DELETE_SESSION_START;

    constructor(public payload: number) { }
}

export class DeleteSessionSuccess implements Action {
    readonly type = DELETE_SESSION_SUCCESS;

    constructor(public payload: Course) { }
}

export class DeleteSessionFail implements Action {
    readonly type = DELETE_SESSION_FAIL;

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
    | CreateSectionStart
    | CreateSectionSuccess
    | CreateSectionFail
    | UpdateSectionStart
    | UpdateSectionSuccess
    | UpdateSectionFail
    | DeleteSectionStart
    | DeleteSectionSuccess
    | DeleteSectionFail
    | CreateSessionStart
    | CreateSessionSuccess
    | CreateSessionFail
    | UpdateSessionStart
    | UpdateSessionSuccess
    | UpdateSessionFail
    | DeleteSessionStart
    | DeleteSessionSuccess
    | DeleteSessionFail
    | ClearErrors
    | ClearStatus
    ;
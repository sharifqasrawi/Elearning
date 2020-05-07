import { Action } from '@ngrx/store';

import { Category } from './../../../models/category.model';


export const CREATE_START = '[Categories] Create Start';
export const CREATE_SUCCESS = '[Categories] Create Success';
export const CREATE_FAIL = '[Categories] Create Fail';

export const UPDATE_START = '[Categories] Update Start';
export const UPDATE_SUCCESS = '[Categories] Update Success';
export const UPDATE_FAIL = '[Categories] Update Fail';

export const TRASH_START = '[Categories] Trash Start';
export const TRASH_SUCCESS = '[Categories] Trash Success';
export const TRASH_FAIL = '[Categories] Trash Fail';

export const RESTORE_START = '[Categories] Restore Start';
export const RESTORE_SUCCESS = '[Categories] Restore Success';
export const RESTORE_FAIL = '[Categories] Restore Fail';

export const DELETE_START = '[Categories] Delete Start';
export const DELETE_SUCCESS = '[Categories] Delete Success';
export const DELETE_FAIL = '[Categories] Delete Fail';

export const FETCH_START = '[Categories] Fetch Start';
export const FETCH_SUCCESS = '[Categories] Fetch Success';
export const FETCH_FAIL = '[Categories] Fetch Fail';

export const FETCH_DELETED_START = '[Categories] Fetch Deleted Start';
export const FETCH_DELETED_SUCCESS = '[Categories] Fetch Deleted Success';
export const FETCH_DELETED_FAIL = '[Categories] Fetch Deleted Fail';

export const CLEAR_ERRORS = '[Categories] Clear Errors';
export const CLEAR_STATUS = '[Categories] Clear Status';


export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: { title_En: string, imagePath: string }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Category) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: { id: number, title_En: string, imagePath: string }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Category) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class TrashStart implements Action {
    readonly type = TRASH_START;

    constructor(public payload: number) { }
}

export class TrashSuccess implements Action {
    readonly type = TRASH_SUCCESS;

    constructor(public payload: Category) { }
}

export class TrashFail implements Action {
    readonly type = TRASH_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class RestoreStart implements Action {
    readonly type = RESTORE_START;

    constructor(public payload: number) { }
}

export class RestoreSuccess implements Action {
    readonly type = RESTORE_SUCCESS;

    constructor(public payload: Category) { }
}

export class RestoreFail implements Action {
    readonly type = RESTORE_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class DeleteStart implements Action {
    readonly type = DELETE_START;

    constructor(public payload: number) { }
}

export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload: number) { }
}

export class DeleteFail implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: string[]) { }
}

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

export class FetchDeletedStart implements Action {
    readonly type = FETCH_DELETED_START;
}

export class FetchDeletedSuccess implements Action {
    readonly type = FETCH_DELETED_SUCCESS;

    constructor(public payload: Category[]) { }
}

export class FetchDeletedFail implements Action {
    readonly type = FETCH_DELETED_FAIL;

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

export type CategoriesActions =
    | CreateStart
    | CreateSuccess
    | CreateFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | TrashStart
    | TrashSuccess
    | TrashFail
    | RestoreStart
    | RestoreSuccess
    | RestoreFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    | FetchStart
    | FetchSuccess
    | FetchFail
    | FetchDeletedStart
    | FetchDeletedSuccess
    | FetchDeletedFail
    | ClearErrors
    | ClearStatus
    ;
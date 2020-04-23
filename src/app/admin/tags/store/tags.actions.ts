import { Action } from '@ngrx/store';

import { Tag } from './../../../models/tag.model';


export const CREATE_START = '[Tags] Create Start';
export const CREATE_SUCCESS = '[Tags] Create Success';
export const CREATE_FAIL = '[Tags] Create Fail';

export const UPDATE_START = '[Tags] Update Start';
export const UPDATE_SUCCESS = '[Tags] Update Success';
export const UPDATE_FAIL = '[Tags] Update Fail';

export const DELETE_START = '[Tags] Delete Start';
export const DELETE_SUCCESS = '[Tags] Delete Success';
export const DELETE_FAIL = '[Tags] Delete Fail';

export const FETCH_START = '[Tags] Fetch Start';
export const FETCH_SUCCESS = '[Tags] Fetch Success';
export const FETCH_FAIL = '[Tags] Fetch Fail';

export const CLEAR_ERRORS = '[Tags] Clear Errors';
export const CLEAR_STATUS = '[Tags] Clear Status';


export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: string) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Tag) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////

export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: { id: number, name: string }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Tag) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////

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

/////////////////

export class FetchStart implements Action {
    readonly type = FETCH_START;

}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Tag[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;

}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


/////////////////

export type TagsActions =
    | CreateStart
    | CreateSuccess
    | CreateFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    | FetchStart
    | FetchSuccess
    | FetchFail
    | ClearErrors
    | ClearStatus
    ;
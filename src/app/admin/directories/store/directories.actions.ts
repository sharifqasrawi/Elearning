import { Action } from '@ngrx/store';

import { Directory } from './../../../models/directory.model';

export const FETCH_START = '[Directories] Fetch Start';
export const FETCH_SUCCESS = '[Directories] Fetch Success';
export const FETCH_FAIL = '[Directories] Fetch Fail';

export const FETCH_PHYSICAL_START = '[Directories] Fetch Physical Start';
export const FETCH_PHYSICAL_SUCCESS = '[Directories] Fetch Physical Success';
export const FETCH_PHYSICAL_FAIL = '[Directories] Fetch Physical Fail';

export const CREATE_START = '[Directories] Create Start';
export const CREATE_SUCCESS = '[Directories] Create Success';
export const CREATE_FAIL = '[Directories] Create Fail';

export const DELETE_START = '[Directories] Delete Start';
export const DELETE_SUCCESS = '[Directories] Delete Success';
export const DELETE_FAIL = '[Directories] Delete Fail';


export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Directory[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

/////////////

export class FetchPhysicalStart implements Action {
    readonly type = FETCH_PHYSICAL_START;

    constructor(public payload: string) { }
}

export class FetchPhysicalSuccess implements Action {
    readonly type = FETCH_PHYSICAL_SUCCESS;

    constructor(public payload: Directory[]) { }
}

export class FetchPhysicalFail implements Action {
    readonly type = FETCH_PHYSICAL_FAIL;

    constructor(public payload: string[]) { }
}


/////////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: { name: string, path: string }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Directory) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}


/////////////

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

export type DirectoriesActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | FetchPhysicalStart
    | FetchPhysicalSuccess
    | FetchPhysicalFail
    | CreateStart
    | CreateSuccess
    | CreateFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    ;
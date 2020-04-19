import { Action } from '@ngrx/store';

import { UploadedFile } from './../../../models/uploadedFile.model';

export const FETCH_START = '[Files] Fetch Start';
export const FETCH_SUCCESS = '[Files] Fetch Success';
export const FETCH_FAIL = '[Files] Fetch Fail';

export const DELETE_START = '[Files] Delete Start';
export const DELETE_SUCCESS = '[Files] Delete Success';
export const DELETE_FAIL = '[Files] Delete Fail';


export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: UploadedFile[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

//////////////////////////////////

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

////////////////

export type FilesActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    ;
import { Action } from '@ngrx/store';

import { UploadedFile } from './../../../models/uploadedFile.model';

export const FETCH_START = '[Files] Fetch Start';
export const FETCH_SUCCESS = '[Files] Fetch Success';
export const FETCH_FAIL = '[Files] Fetch Fail';


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


////////////////

export type FilesActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    ;
import { About } from './../../../models/about.model';
import { Action } from '@ngrx/store';
export const FETCH_START = '[About] Fetch Start';
export const FETCH_SUCCESS = '[About] Fetch Success';
export const FETCH_FAIL = '[About] Fetch Fail';

export const UPDATE_START = '[About] Update Start';
export const UPDATE_SUCCESS = '[About] Update Success';
export const UPDATE_FAIL = '[About] Update Fail';

export const CLEAR_ERRORS = '[About] Clear Errors';
export const CLEAR_STATUS = '[About] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: About) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;
    constructor(public payload: string[]) { }
}


export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        name: string,
        title: string,
        imagePath: string,
        info: string,
        email1: string,
        info_FR?: string,
        email2?: string,
        website?: string,
        title_FR?: string,
        phoneNumber?: string
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: About) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;
    constructor(public payload: string[]) { }
}


export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


export type AboutActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | ClearErrors
    | ClearStatus
    ;
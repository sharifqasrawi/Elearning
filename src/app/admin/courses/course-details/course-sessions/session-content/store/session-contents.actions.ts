import { Action } from '@ngrx/store';

import { SessionContent } from './../../../../../../models/sessionContent.model';

export const FETCH_START = '[Session Contents] Fetch Start';
export const FETCH_SUCCESS = '[Session Contents] Fetch Success';
export const FETCH_FAIL = '[Session Contents] Fetch Fail';

export const CREATE_START = '[Session Contents] Create Start';
export const CREATE_SUCCESS = '[Session Contents] Create Success';
export const CREATE_FAIL = '[Session Contents] Create Fail';

export const UPDATE_START = '[Session Contents] Update Start';
export const UPDATE_SUCCESS = '[Session Contents] Update Success';
export const UPDATE_FAIL = '[Session Contents] Update Fail';

export const DELETE_START = '[Session Contents] Delete Start';
export const DELETE_SUCCESS = '[Session Contents] Delete Success';
export const DELETE_FAIL = '[Session Contents] Delete Fail';

export const CLEAR_ERRORS = '[Session Contents] Clear Errors';
export const CLEAR_STATUS = '[Session Contents] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload: number) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: SessionContent[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}



export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        session: { id: number },
        type: string,
        content: string,
        order: number,
        note?: string
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: SessionContent) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}



export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        id: number,
        session: { id: number },
        type: string,
        content: string,
        order: number,
        note?: string
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: { updatedSessionContent: SessionContent, updatedOldSessionContent: SessionContent }) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}


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


/////////////////////
export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

//////////

export type SessionContentsActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | CreateStart
    | CreateSuccess
    | CreateFail
    | UpdateStart
    | UpdateSuccess
    | UpdateFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    | ClearErrors
    | ClearStatus
    ;
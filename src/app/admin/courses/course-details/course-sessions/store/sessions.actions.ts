import { Action } from '@ngrx/store';

import { Session } from './../../../../../models/session.model';

export const FETCH_START = '[Sessions] Fetch Start';
export const FETCH_SUCCESS = '[Sessions] Fetch Success';
export const FETCH_FAIL = '[Sessions] Fetch Fail';

export const CREATE_START = '[Sessions] Create Start';
export const CREATE_SUCCESS = '[Sessions] Create Success';
export const CREATE_FAIL = '[Sessions] Create Fail';

export const UPDATE_START = '[Sessions] Update Start';
export const UPDATE_SUCCESS = '[Sessions] Update Success';
export const UPDATE_FAIL = '[Sessions] Update Fail';

export const DELETE_START = '[Sessions] Delete Start';
export const DELETE_SUCCESS = '[Sessions] Delete Success';
export const DELETE_FAIL = '[Sessions] Delete Fail';

export const CLEAR_ERRORS = '[Sessions] Clear Errors';
export const CLEAR_STATUS = '[Sessions] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload: number) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Session[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}



export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        section: { id: number, course: { id: number } },
        title_EN: string,
        duration: number,
        order: number,
        title_FR?: string,
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Session) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}



export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        id: number,
        section: { id: number, course: { id: number } },
        title_EN: string,
        duration: number,
        order: number,
        title_FR?: string,
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: { updatedSession: Session, updatedOldSession: Session }) { }
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

export type SessionActions =
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
import { Action } from '@ngrx/store';

import { Session } from './../../../../models/session.model';

export const FETCH_START = '[Session] Fetch Start';
export const FETCH_SUCCESS = '[Session] Fetch Success';
export const FETCH_FAIL = '[Session] Fetch Fail';

export const SET_CURRENT_SESSION_START = '[Session] Set Current Session Start';
export const SET_CURRENT_SESSION_SUCCESS = '[Session] Set Current Session Success';
export const SET_CURRENT_SESSION_FAIL = '[Session] Set Current Session Fail';


export const CLEAR_ERRORS = '[Session] Clear Errors';
export const CLEAR_STATUS = '[Session] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload: number) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Session) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}


/////////////////////


export class SetCurrentSessionStart implements Action {
    readonly type = SET_CURRENT_SESSION_START;

    constructor(public payload: {
        classId: string,
        sessionId: number
    }) { }
}

export class SetCurrentSessionSuccess implements Action {
    readonly type = SET_CURRENT_SESSION_SUCCESS;

    constructor(public payload: boolean) { }
}

export class SetCurrentSessionFail implements Action {
    readonly type = SET_CURRENT_SESSION_FAIL;

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

export type HomeSessionActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | SetCurrentSessionStart
    | SetCurrentSessionSuccess
    | SetCurrentSessionFail
    | ClearErrors
    | ClearStatus
    ;
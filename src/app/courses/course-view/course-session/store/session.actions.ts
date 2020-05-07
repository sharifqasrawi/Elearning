import { Action } from '@ngrx/store';

import { Session } from './../../../../models/session.model';

export const FETCH_START = '[Session] Fetch Start';
export const FETCH_SUCCESS = '[Session] Fetch Success';
export const FETCH_FAIL = '[Session] Fetch Fail';

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
    | ClearErrors
    | ClearStatus
    ;
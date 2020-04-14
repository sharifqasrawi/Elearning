import { Action } from '@ngrx/store';

import { Message } from './../../../models/message.model';


export const SEND_START = '[Messages] Send Start';
export const SEND_SUCCESS = '[Messages] Send Success';
export const SEND_FAIL = '[Messages] Send Fail';

export const FETCH_START = '[Messages] Fetch Start';
export const FETCH_SUCCESS = '[Messages] Fetch Success';
export const FETCH_FAIL = '[Messages] Fetch Fail';

export const CLEAR_ERRORS = '[Messages] Clear Errors';
export const CLEAR_STATUS = '[Messages] Clear Status';


export class SendStart implements Action {
    readonly type = SEND_START;

    constructor(public payload: { name: string, email: string; subject: string, text: string }) { }
}

export class SendSuccess implements Action {
    readonly type = SEND_SUCCESS;

    constructor(public payload: Message) { }

}

export class SendFail implements Action {
    readonly type = SEND_FAIL;

    constructor(public payload: string[]) { }

}


export class FetchStart implements Action {
    readonly type = FETCH_START;

}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Message[]) { }

}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }

}

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


export type MessagesActions =
    SendStart
    | SendSuccess
    | SendFail
    | ClearErrors
    | ClearStatus
    | FetchStart
    | FetchSuccess
    | FetchFail
    ;


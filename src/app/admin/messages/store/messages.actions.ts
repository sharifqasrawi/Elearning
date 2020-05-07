import { Action } from '@ngrx/store';

import { Message } from './../../../models/message.model';
import { EmailMessage } from './../../../models/emailMessage.model';


export const SEND_START = '[Messages] Send Start';
export const SEND_SUCCESS = '[Messages] Send Success';
export const SEND_FAIL = '[Messages] Send Fail';

export const SEND_EMAIL_START = '[Messages] Send Email Start';
export const SEND_EMAIL_SUCCESS = '[Messages] Send Email Success';
export const SEND_EMAIL_FAIL = '[Messages] Send Email Fail';

export const FETCH_START = '[Messages] Fetch Start';
export const FETCH_SUCCESS = '[Messages] Fetch Success';
export const FETCH_FAIL = '[Messages] Fetch Fail';

export const FETCH_EMAILS_START = '[Messages] Fetch Emails Start';
export const FETCH_EMAILS_SUCCESS = '[Messages] Fetch Emails Success';
export const FETCH_EMAILS_FAIL = '[Messages] Fetch Emails Fail';

export const DELETE_START = '[Messages] Delete Start';
export const DELETE_SUCCESS = '[Messages] Delete Success';
export const DELETE_FAIL = '[Messages] Delete Fail';

export const CHANGE_SEEN_START = '[Messages] Change Seen Start';
export const CHANGE_SEEN_SUCCESS = '[Messages] Change Seen Success';
export const CHANGE_SEEN_FAIL = '[Messages] Change Seen Fail';

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

/////////////////////

export class SendEmailStart implements Action {
    readonly type = SEND_EMAIL_START;

    constructor(public payload: { emails: string[]; subject: string, text: string }) { }
}

export class SendEmailSuccess implements Action {
    readonly type = SEND_EMAIL_SUCCESS;

    constructor(public payload: EmailMessage) { }

}

export class SendEmailFail implements Action {
    readonly type = SEND_EMAIL_FAIL;

    constructor(public payload: string[]) { }

}

/////////////////////

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

/////////////////////

export class FetchEmailsStart implements Action {
    readonly type = FETCH_EMAILS_START;

}

export class FetchEmailsSuccess implements Action {
    readonly type = FETCH_EMAILS_SUCCESS;

    constructor(public payload: EmailMessage[]) { }

}

export class FetchEmailsFail implements Action {
    readonly type = FETCH_EMAILS_FAIL;

    constructor(public payload: string[]) { }

}

/////////////////////

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

export class ChangeSeenStart implements Action {
    readonly type = CHANGE_SEEN_START;

    constructor(public payload: number) { }
}

export class ChangeSeenSuccess implements Action {
    readonly type = CHANGE_SEEN_SUCCESS;

    constructor(public payload: Message) { }

}

export class ChangeSeenFail implements Action {
    readonly type = CHANGE_SEEN_FAIL;

    constructor(public payload: string[]) { }

}

/////////////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


export type MessagesActions =
    | SendStart
    | SendSuccess
    | SendFail
    | SendEmailStart
    | SendEmailSuccess
    | SendEmailFail
    | ClearErrors
    | ClearStatus
    | FetchStart
    | FetchSuccess
    | FetchFail
    | FetchEmailsStart
    | FetchEmailsSuccess
    | FetchEmailsFail
    | DeleteStart
    | DeleteSuccess
    | DeleteFail
    | ChangeSeenStart
    | ChangeSeenSuccess
    | ChangeSeenFail
    ;


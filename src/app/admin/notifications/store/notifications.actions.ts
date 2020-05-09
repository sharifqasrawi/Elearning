import { Action } from '@ngrx/store';

import { Notification } from './../../../models/notification.model';

export const FETCH_START = '[Notifications] Fetch Start';
export const FETCH_SUCCESS = '[Notifications] Fetch Success';
export const FETCH_FAIL = '[Notifications] Fetch Fail';


export class FetchStart implements Action {
    readonly type = FETCH_START;
}


export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Notification[]) { }
}


export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

///////////////

export type NotificationsActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    ;
import { Action } from '@ngrx/store';

import { Report } from './../../../models/report.model';


export const FETCH_START = '[Reports] Fetch Start';
export const FETCH_BY_USER_START = '[Reports] Fetch By User Start';
export const FETCH_SUCCESS = '[Reports] Fetch Success';
export const FETCH_FAIL = '[Reports] Fetch Fail';

export const REPORT_BUG_START = '[Reports] Report Bug Start';
export const REPORT_BUG_SUCCESS = '[Reports] Report Bug Success';
export const REPORT_BUG_FAIL = '[Reports] Report Bug Fail';

export const MARK_REPORT_START = '[Reports] Mark Report Start';
export const MARK_REPORT_SUCCESS = '[Reports] Mark Report Success';
export const MARK_REPORT_FAIL = '[Reports] Mark Report Fail';

export const MARK_REPLY_START = '[Reports] Mark Reply Start';
export const MARK_REPLY_SUCCESS = '[Reports] Mark Reply Success';
export const MARK_REPLY_FAIL = '[Reports] Mark Reply Fail';

export const REPLY_REPORT_START = '[Reports] Reply Report Start';
export const REPLY_REPORT_SUCCESS = '[Reports] Reply Report Success';
export const REPLY_REPORT_FAIL = '[Reports] Reply Report Fail';

export const CLEAR_ERRORS = '[Reports] Clear Errors';
export const CLEAR_STATUS = '[Reports] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;
    constructor(public payload?: string) { }
}

export class FetchByUserStart implements Action {
    readonly type = FETCH_BY_USER_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;
    constructor(public payload: Report[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;
    constructor(public payload: string[]) { }
}


////////////////////////////


export class ReportBugStart implements Action {
    readonly type = REPORT_BUG_START;
    constructor(public payload:
        {
            type: string,
            userFullName: string,
            userEmail: string,
            severity: string,
            severityLevel: number,
            description: string
        }) { }
}

export class ReportBugSuccess implements Action {
    readonly type = REPORT_BUG_SUCCESS;
    constructor(public payload: Report) { }
}

export class ReportBugFail implements Action {
    readonly type = REPORT_BUG_FAIL;
    constructor(public payload: string[]) { }
}

////////////////////////////


export class MarkReportStart implements Action {
    readonly type = MARK_REPORT_START;
    constructor(public payload:
        {
            id: number,
            isSeen: boolean
        }) { }
}

export class MarkReportSuccess implements Action {
    readonly type = MARK_REPORT_SUCCESS;
    constructor(public payload: Report) { }
}

export class MarkReportFail implements Action {
    readonly type = MARK_REPORT_FAIL;
    constructor(public payload: string[]) { }
}

////////////////////////////


export class MarkReplyStart implements Action {
    readonly type = MARK_REPLY_START;
    constructor(public payload:
        {
            id: number,
            isReplySeen: boolean
        }) { }
}

export class MarkReplySuccess implements Action {
    readonly type = MARK_REPLY_SUCCESS;
    constructor(public payload: Report) { }
}

export class MarkReplyFail implements Action {
    readonly type = MARK_REPLY_FAIL;
    constructor(public payload: string[]) { }
}


////////////////////////////


export class ReplyReportStart implements Action {
    readonly type = REPLY_REPORT_START;
    constructor(public payload:
        {
            id: number,
            replyMessage: string
        }) { }
}

export class ReplyReportSuccess implements Action {
    readonly type = REPLY_REPORT_SUCCESS;
    constructor(public payload: Report) { }
}

export class ReplyReportFail implements Action {
    readonly type = REPLY_REPORT_FAIL;
    constructor(public payload: string[]) { }
}



////////////////////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


////////////////////////////

export type ReportsActions =
    | FetchStart
    | FetchByUserStart
    | FetchSuccess
    | FetchFail
    | ReportBugStart
    | ReportBugSuccess
    | ReportBugFail
    | MarkReportStart
    | MarkReportSuccess
    | MarkReportFail
    | MarkReplyStart
    | MarkReplySuccess
    | MarkReplyFail
    | ReplyReportStart
    | ReplyReportSuccess
    | ReplyReportFail
    | ClearErrors
    | ClearStatus
    ;
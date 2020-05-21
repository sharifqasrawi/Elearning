import { Action } from '@ngrx/store';

import { Report } from './../../../models/report.model';


export const FETCH_START = '[Reports] Fetch Start';
export const FETCH_SUCCESS = '[Reports] Fetch Success';
export const FETCH_FAIL = '[Reports] Fetch Fail';

export const REPORT_BUG_START = '[Reports] Report Bug Start';
export const REPORT_BUG_SUCCESS = '[Reports] Report Bug Success';
export const REPORT_BUG_FAIL = '[Reports] Report Bug Fail';

export const CLEAR_ERRORS = '[Reports] Clear Errors';
export const CLEAR_STATUS = '[Reports] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;
    constructor(public payload: string) { }
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

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


////////////////////////////

export type ReportsActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | ReportBugStart
    | ReportBugSuccess
    | ReportBugFail
    | ClearErrors
    | ClearStatus
    ;
import { Visit } from './../../models/visit.model';
import { AppRating } from './../../models/appRating.model';
import { Action } from "@ngrx/store";

export const RATE_START = '[App Settings] Rate Start';
export const RATE_SUCCESS = '[App Settings] Rate Success';
export const RATE_FAIL = '[App Settings] Rate Fail';

export const FETCH_RATE_START = '[App Settings] Fetch Rate Start';
export const FETCH_RATE_SUCCESS = '[App Settings] Fetch Rate Success';
export const FETCH_RATE_FAIL = '[App Settings] Fetch Rate Fail';

export const FETCH_VISITS_CLIENT_START = '[App Settings] Fetch Visits Client Start';
export const FETCH_VISITS_CLIENT_SUCCESS = '[App Settings] Fetch Visits Client Success';
export const FETCH_VISITS_CLIENT_FAIL = '[App Settings] Fetch Visits Client Fail';


export const FETCH_VISITS_ADMIN_START = '[App Settings] Fetch Visits Admin Start';
export const FETCH_VISITS_ADMIN_SUCCESS = '[App Settings] Fetch Visits Admin Success';
export const FETCH_VISITS_ADMIN_FAIL = '[App Settings] Fetch Visits Admin Fail';

export const VISIT_START = '[App Settings] Visit Start';
export const VISIT_SUCCESS = '[App Settings] Visit Success';
export const VISIT_FAIL = '[App Settings] Visit Fail';


export const CLEAR_ERRORS = '[App Settings] Clear Errors';
export const CLEAR_STATUS = '[App Settings] Clear Status';



export class RateStart implements Action {
    readonly type = RATE_START;

    constructor(public payload: number) { }
}

export class RateSuccess implements Action {
    readonly type = RATE_SUCCESS;

    constructor(public payload: { ratings: { total: number, ratings: AppRating[] } }) { }
}

export class RateFail implements Action {
    readonly type = RATE_FAIL;

    constructor(public payload: string[]) { }
}



/////////////////////


export class FetchRateStart implements Action {
    readonly type = FETCH_RATE_START;
}

export class FetchRateSuccess implements Action {
    readonly type = FETCH_RATE_SUCCESS;

    constructor(public payload: { ratings: { total: number, ratings: AppRating[] } }) { }
}

export class FetchRateFail implements Action {
    readonly type = FETCH_RATE_FAIL;

    constructor(public payload: string[]) { }
}



/////////////////////

export class VisitStart implements Action {
    readonly type = VISIT_START;

}

export class VisitSuccess implements Action {
    readonly type = VISIT_SUCCESS;

    constructor(public payload: number) { }
}

export class VisitFail implements Action {
    readonly type = VISIT_FAIL;

    constructor(public payload: string[]) { }
}


/////////////////////


export class FetchVisitsClientStart implements Action {
    readonly type = FETCH_VISITS_CLIENT_START;
}

export class FetchVisitsClientSuccess implements Action {
    readonly type = FETCH_VISITS_CLIENT_SUCCESS;

    constructor(public payload: number) { }
}

export class FetchVisitsClientFail implements Action {
    readonly type = FETCH_VISITS_CLIENT_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class FetchVisitsAdminStart implements Action {
    readonly type = FETCH_VISITS_ADMIN_START;
}

export class FetchVisitsAdminSuccess implements Action {
    readonly type = FETCH_VISITS_ADMIN_SUCCESS;

    constructor(public payload: Visit[]) { }
}

export class FetchVisitsAdminFail implements Action {
    readonly type = FETCH_VISITS_ADMIN_FAIL;

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

export type AppSettingsActions =
    | RateStart
    | RateSuccess
    | RateFail
    | FetchRateStart
    | FetchRateSuccess
    | FetchRateFail
    | FetchVisitsClientStart
    | FetchVisitsClientSuccess
    | FetchVisitsClientFail
    | FetchVisitsAdminStart
    | FetchVisitsAdminSuccess
    | FetchVisitsAdminFail
    | VisitStart
    | VisitSuccess
    | VisitFail
    | ClearErrors
    | ClearStatus
    ;
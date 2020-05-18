import { AppRating } from './../../models/appRating.model';
import { Action } from "@ngrx/store";

export const RATE_START = '[App Settings] Rate Start';
export const RATE_SUCCESS = '[App Settings] Rate Success';
export const RATE_FAIL = '[App Settings] Rate Fail';

export const FETCH_RATE_START = '[App Settings] Fetch Rate Start';
export const FETCH_RATE_SUCCESS = '[App Settings] Fetch Rate Success';
export const FETCH_RATE_FAIL = '[App Settings] Fetch Rate Fail';


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
    | ClearErrors
    | ClearStatus
    ;
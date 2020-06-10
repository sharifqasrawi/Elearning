import { Action } from '@ngrx/store';
import { Country } from './../../../models/country.model';

export const FETCH_START = '[Countries] Fetch Start';
export const FETCH_SUCCESS = '[Countries] Fetch Success';
export const FETCH_FAIL = '[Countries] Fetch Fail';

export const CREATE_START = '[Countries] Create Start';
export const CREATE_SUCCESS = '[Countries] Create Success';
export const CREATE_FAIL = '[Countries] Create Fail';

export const UPDATE_START = '[Countries] Update Start';
export const UPDATE_SUCCESS = '[Countries] Update Success';
export const UPDATE_FAIL = '[Countries] Update Fail';

export const DELETE_START = '[Countries] Delete Start';
export const DELETE_SUCCESS = '[Countries] Delete Success';
export const DELETE_FAIL = '[Countries] Delete Fail';


export const CLEAR_ERRORS = '[Countries] Clear Errors';
export const CLEAR_STATUS = '[Countries] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Country[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        name_EN: string,
        flagPath: string,
        name_FR?: string
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Country) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        id: number,
        name_EN: string,
        flagPath: string,
        name_FR?: string
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Country) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}

////////////

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

////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

////////////

export type CountriesActions = 
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
import { Action } from '@ngrx/store';

import { Category } from './../../models/category.model';

export const FETCH_START = '[Home Categories] Fetch Start';
export const FETCH_SUCCESS = '[Home Categories] Fetch Success';
export const FETCH_FAIL = '[Home Categories] Fetch Fail';

export const CLEAR_ERRORS = '[Home Categories] Clear Errors';
export const CLEAR_STATUS = '[Home Categories] Clear Status';

////////////

export class FetchStart implements Action {
    readonly type = FETCH_START;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Category[]) { }
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

////

export type HomeCategoriesActions =
    | FetchStart
    | FetchSuccess
    | FetchFail
    | ClearErrors
    | ClearStatus
    ;
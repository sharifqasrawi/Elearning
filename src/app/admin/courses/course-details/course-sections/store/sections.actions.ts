import { Action } from '@ngrx/store';

import { Section } from './../../../../../models/section.model';

export const FETCH_START = '[Sections] Fetch Start';
export const FETCH_SUCCESS = '[Sections] Fetch Success';
export const FETCH_FAIL = '[Sections] Fetch Fail';

export const CREATE_START = '[Sections] Create Start';
export const CREATE_SUCCESS = '[Sections] Create Success';
export const CREATE_FAIL = '[Sections] Create Fail';

export const UPDATE_START = '[Sections] Update Start';
export const UPDATE_SUCCESS = '[Sections] Update Success';
export const UPDATE_FAIL = '[Sections] Update Fail';

export const DELETE_START = '[Sections] Delete Start';
export const DELETE_SUCCESS = '[Sections] Delete Success';
export const DELETE_FAIL = '[Sections] Delete Fail';


export const CLEAR_ERRORS = '[Sections] Clear Errors';
export const CLEAR_STATUS = '[Sections] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload: number) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Section[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}


//////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: {
        course: { id: number },
        name_EN: string,
        order: number,
    }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Section) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}

//////////

export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: {
        id: number,
        name_EN: string,
        order: number,
    }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: { updatedSection: Section, updatedOldSection: Section }) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}


export class DeleteStart implements Action {
    readonly type = DELETE_START;

    constructor(public payload: number ) { }
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
export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

//////////

export type SectionsActions =
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
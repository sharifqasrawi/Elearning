import { Action } from '@ngrx/store';

import { Comment } from './../../../../models/comment.model';


export const FETCH_START = '[Comments] Fetch Start';
export const FETCH_SUCCESS = '[Comments] Fetch Success';
export const FETCH_FAIL = '[Comments] Fetch Fail';

export const CREATE_START = '[Comments] Create Start';
export const CREATE_SUCCESS = '[Comments] Create Success';
export const CREATE_FAIL = '[Comments] Create Fail';

export const UPDATE_START = '[Comments] Update Start';
export const UPDATE_SUCCESS = '[Comments] Update Success';
export const UPDATE_FAIL = '[Comments] Update Fail';

export const DELETE_START = '[Comments] Delete Start';
export const DELETE_SUCCESS = '[Comments] Delete Success';
export const DELETE_FAIL = '[Comments] Delete Fail';

export const LIKE_START = '[Comments] Like Start';
export const LIKE_SUCCESS = '[Comments] Like Success';
export const LIKE_FAIL = '[Comments] Like Fail';

export const CLEAR_ERRORS = '[Comments] Clear Errors';
export const CLEAR_STATUS = '[Comments] Clear Status';


export class FetchStart implements Action {
    readonly type = FETCH_START;

    constructor(public payload: number) { }
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;

    constructor(public payload: Comment[]) { }
}

export class FetchFail implements Action {
    readonly type = FETCH_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////

export class CreateStart implements Action {
    readonly type = CREATE_START;

    constructor(public payload: { courseId: number, text: string, commentId?: number }) { }
}

export class CreateSuccess implements Action {
    readonly type = CREATE_SUCCESS;

    constructor(public payload: Comment) { }
}

export class CreateFail implements Action {
    readonly type = CREATE_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////

export class UpdateStart implements Action {
    readonly type = UPDATE_START;

    constructor(public payload: { id: number, text: string }) { }
}

export class UpdateSuccess implements Action {
    readonly type = UPDATE_SUCCESS;

    constructor(public payload: Comment) { }
}

export class UpdateFail implements Action {
    readonly type = UPDATE_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////

export class DeleteStart implements Action {
    readonly type = DELETE_START;

    constructor(public payload: number) { }
}

export class DeleteSuccess implements Action {
    readonly type = DELETE_SUCCESS;

    constructor(public payload: Comment) { }
}

export class DeleteFail implements Action {
    readonly type = DELETE_FAIL;

    constructor(public payload: string[]) { }
}

/////////////////////


export class LikeStart implements Action {
    readonly type = LIKE_START;

    constructor(public payload: { commentId: number, action: string }) { }
}

export class LikeSuccess implements Action {
    readonly type = LIKE_SUCCESS;

    constructor(public payload: Comment) { }
}

export class LikeFail implements Action {
    readonly type = LIKE_FAIL;

    constructor(public payload: string[]) { }
}


/////////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}
export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}

//////////////////

export type HomeCommentsActions =
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
    | LikeStart
    | LikeSuccess
    | LikeFail
    | ClearErrors
    | ClearStatus
    ;
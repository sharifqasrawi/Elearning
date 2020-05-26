import { Action } from '@ngrx/store';

import { Quiz } from './../../models/quiz.model';

export const FETCH_QUIZZES_START = '[Quizzes] Fetch Quizzes Start';
export const FETCH_QUIZZES_SUCCESS = '[Quizzes] Fetch Quizzes Success';
export const FETCH_QUIZZES_FAIL = '[Quizzes] Fetch Quizzes Fail';

export const CLEAR_ERRORS = '[Quizzes] Clear Errors';
export const CLEAR_STATUS = '[Quizzes] Clear Status';



export class FetchQuizzesStart implements Action {
    readonly type = FETCH_QUIZZES_START;
}

export class FetchQuizzesSuccess implements Action {
    readonly type = FETCH_QUIZZES_SUCCESS;

    constructor(public payload: Quiz[]) { }
}

export class FetchQuizzesFail implements Action {
    readonly type = FETCH_QUIZZES_FAIL;

    constructor(public payload: string[]) { }
}


////////////////

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}



////////////////

export type QuizzesAction =
    | FetchQuizzesStart
    | FetchQuizzesSuccess
    | FetchQuizzesFail
    | ClearErrors
    | ClearStatus
    ;
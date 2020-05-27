import { Action } from '@ngrx/store';

import { Quiz } from './../../models/quiz.model';
import { Question } from '../../models/question.model';

export const FETCH_QUIZZES_START = '[Quizzes] Fetch Home Quizzes Start';
export const FETCH_QUIZZES_SUCCESS = '[Quizzes] Fetch Home Quizzes Success';
export const FETCH_QUIZZES_FAIL = '[Quizzes] Fetch Home Quizzes Fail';

export const FETCH_QUESTIONS_START = '[Quizzes] Fetch Home Questions Start';
export const FETCH_QUESTIONS_SUCCESS = '[Quizzes] Fetch Home Questions Success';
export const FETCH_QUESTIONS_FAIL = '[Quizzes] Fetch Home Questions Fail';

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


export class FetchQuestionsStart implements Action {
    readonly type = FETCH_QUESTIONS_START;

    constructor(public payload: number) { }
}

export class FetchQuestionsSuccess implements Action {
    readonly type = FETCH_QUESTIONS_SUCCESS;

    constructor(public payload: Question[]) { }
}

export class FetchQuestionsFail implements Action {
    readonly type = FETCH_QUESTIONS_FAIL;

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

export type HomeQuizzesActions =
    | FetchQuizzesStart
    | FetchQuizzesSuccess
    | FetchQuizzesFail
    | FetchQuestionsStart
    | FetchQuestionsSuccess
    | FetchQuestionsFail
    | ClearErrors
    | ClearStatus
    ;
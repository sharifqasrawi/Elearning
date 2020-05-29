import { Action } from '@ngrx/store';

import { Quiz } from './../../models/quiz.model';
import { Question } from '../../models/question.model';
import { UserQuiz } from './../../models/userQuiz.model';
import { UserQuizAnswer } from './../../models/userQuizAnswer.model';

export const FETCH_QUIZZES_START = '[Home Quizzes] Fetch Home Quizzes Start';
export const FETCH_QUIZZES_SUCCESS = '[Home Quizzes] Fetch Home Quizzes Success';
export const FETCH_QUIZZES_FAIL = '[Home Quizzes] Fetch Home Quizzes Fail';

export const FETCH_QUESTIONS_START = '[Home Quizzes] Fetch Home Questions Start';
export const FETCH_QUESTIONS_SUCCESS = '[Home Quizzes] Fetch Home Questions Success';
export const FETCH_QUESTIONS_FAIL = '[Home Quizzes] Fetch Home Questions Fail';

export const START_QUIZ_START = '[Home Quizzes] Start Quiz Start';
export const START_QUIZ_SUCCESS = '[Home Quizzes] Start Quiz Success';
export const START_QUIZ_FAIL = '[Home Quizzes] Start Quiz Fail';

export const CHOOSE_ANSWER_START = '[Home Quizzes] Choose Answer Start';
export const CHOOSE_ANSWER_SUCCESS = '[Home Quizzes] Choose Answer Success';
export const CHOOSE_ANSWER_FAIL = '[Home Quizzes] Choose Answer Fail';

export const FETCH_USER_QUIZ_START = '[Home Quizzes] Fetch User Quiz Start';
export const FETCH_USER_QUIZ_SUCCESS = '[Home Quizzes] Fetch User Quiz Success';
export const FETCH_USER_QUIZ_FAIL = '[Home Quizzes] Fetch User Quiz Fail';

export const SUBMIT_QUIZ_START = '[Home Quizzes] Submit Quiz Start';
export const SUBMIT_QUIZ_SUCCESS = '[Home Quizzes] Submit Quiz Success';
export const SUBMIT_QUIZ_FAIL = '[Home Quizzes] Submit Quiz Fail';

export const CLEAR_ERRORS = '[Home Quizzes] Clear Errors';
export const CLEAR_STATUS = '[Home Quizzes] Clear Status';



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


export class StartQuizStart implements Action {
    readonly type = START_QUIZ_START;

    constructor(public payload: number) { }
}

export class StartQuizSuccess implements Action {
    readonly type = START_QUIZ_SUCCESS;

    constructor(public payload: UserQuiz) { }
}

export class StartQuizFail implements Action {
    readonly type = START_QUIZ_FAIL;

    constructor(public payload: string[]) { }
}

////////////////


export class ChooseAnswerStart implements Action {
    readonly type = CHOOSE_ANSWER_START;

    constructor(public payload: {
        userQuizId: number,
        questionId: number,
        answerId: number
    }) { }
}

export class ChooseAnswerSuccess implements Action {
    readonly type = CHOOSE_ANSWER_SUCCESS;

    constructor(public payload: UserQuizAnswer) { }
}

export class ChooseAnswerFail implements Action {
    readonly type = CHOOSE_ANSWER_FAIL;

    constructor(public payload: string[]) { }
}



////////////////

export class FetchUserQuizStart implements Action {
    readonly type = FETCH_USER_QUIZ_START;

    constructor(public payload: number) { }
}

export class FetchUserQuizSuccess implements Action {
    readonly type = FETCH_USER_QUIZ_SUCCESS;

    constructor(public payload: { userQuiz: UserQuiz, userQuizAnswers: UserQuizAnswer[] }) { }
}

export class FetchUserQuizFail implements Action {
    readonly type = FETCH_USER_QUIZ_FAIL;

    constructor(public payload: string[]) { }
}

////////////////


export class SubmitQuizStart implements Action {
    readonly type = SUBMIT_QUIZ_START;

    constructor(public payload: number) { }
}

export class SubmitQuizSuccess implements Action {
    readonly type = SUBMIT_QUIZ_SUCCESS;

    constructor(public payload: { updatedUserQuiz: UserQuiz, userQuizAnswers: UserQuizAnswer[] }) { }
}

export class SubmitQuizFail implements Action {
    readonly type = SUBMIT_QUIZ_FAIL;

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
    | StartQuizStart
    | StartQuizSuccess
    | StartQuizFail
    | ChooseAnswerStart
    | ChooseAnswerSuccess
    | ChooseAnswerFail
    | FetchUserQuizStart
    | FetchUserQuizSuccess
    | FetchUserQuizFail
    | SubmitQuizStart
    | SubmitQuizSuccess
    | SubmitQuizFail
    | ClearErrors
    | ClearStatus
    ;
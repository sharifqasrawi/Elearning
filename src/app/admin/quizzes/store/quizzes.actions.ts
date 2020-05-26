import { Answer } from './../../../models/answer.model';
import { Action } from '@ngrx/store';

import { Quiz } from './../../../models/quiz.model';
import { Question } from './../../../models/question.model';

export const FETCH_QUIZZES_START = '[Quizzes] Fetch Quizzes Start';
export const FETCH_QUIZZES_SUCCESS = '[Quizzes] Fetch Quizzes Success';
export const FETCH_QUIZZES_FAIL = '[Quizzes] Fetch Quizzes Fail';

export const FETCH_TRASHED_QUIZZES_START = '[Quizzes] Fetch Trashed Quizzes Start';
export const FETCH_TRASHED_QUIZZES_SUCCESS = '[Quizzes] Fetch Trashed Quizzes Success';

export const CREATE_QUIZ_START = '[Quizzes] Create Quiz Start';
export const CREATE_QUIZ_SUCCESS = '[Quizzes] Create Quiz Success';
export const CREATE_QUIZ_FAIL = '[Quizzes] Create Quiz Fail';

export const UPDATE_QUIZ_START = '[Quizzes] Update Quiz Start';
export const UPDATE_QUIZ_SUCCESS = '[Quizzes] Update Quiz Success';
export const UPDATE_QUIZ_FAIL = '[Quizzes] Update Quiz Fail';


export const TRASH_RESTORE_QUIZ_START = '[Quizzes] Trash Restore Quiz Start';
export const TRASH_QUIZ_SUCCESS = '[Quizzes] Trash Quiz Success';
export const RESTORE_QUIZ_SUCCESS = '[Quizzes] Restore Quiz Success';
export const TRASH_RESTORE_QUIZ_FAIL = '[Quizzes] Trash Restore Quiz Fail';

export const DELETE_QUIZ_START = '[Quizzes] Delete Quiz Start';
export const DELETE_QUIZ_SUCCESS = '[Quizzes] Delete Quiz Success';
export const DELETE_QUIZ_FAIL = '[Quizzes] Delete Quiz Fail';

export const PUBLISH_UNPUBLISH_START = '[Quizzes] Publish Unpublish Start';
export const PUBLISH_UNPUBLISH_SUCCESS = '[Quizzes] Publish Unpublish Success';
export const PUBLISH_UNPUBLISH_FAIL = '[Quizzes] Publish Unpublish Fail';


export const CREATE_QUESTION_START = '[Quizzes] Create Question Start';
export const CREATE_QUESTION_SUCCESS = '[Quizzes] Create Question Success';
export const CREATE_QUESTION_FAIL = '[Quizzes] Create Question Fail';

export const UPDATE_QUESTION_START = '[Quizzes] Update Question Start';
export const UPDATE_QUESTION_SUCCESS = '[Quizzes] Update Question Success';
export const UPDATE_QUESTION_FAIL = '[Quizzes] Update Question Fail';

export const TRASH_RESTORE_QUESTION_START = '[Quizzes] Trash Restore Question Start';
export const TRASH_RESTORE_QUESTION_SUCCESS = '[Quizzes] Trash Restore Question Success';
export const TRASH_RESTORE_QUESTION_FAIL = '[Quizzes] Trash Restore Question Fail';

export const DELETE_QUESTION_START = '[Quizzes] Delete Question Start';
export const DELETE_QUESTION_SUCCESS = '[Quizzes] Delete Question Success';
export const DELETE_QUESTION_FAIL = '[Quizzes] Delete Question Fail';

export const CREATE_ANSWER_START = '[Quizzes] Create Answer Start';
export const CREATE_ANSWER_SUCCESS = '[Quizzes] Create Answer Success';
export const CREATE_ANSWER_FAIL = '[Quizzes] Create Answer Fail';

export const UPDATE_ANSWER_START = '[Quizzes] Update Answer Start';
export const UPDATE_ANSWER_SUCCESS = '[Quizzes] Update Answer Success';
export const UPDATE_ANSWER_FAIL = '[Quizzes] Update Answer Fail';

export const DELETE_ANSWER_START = '[Quizzes] Delete Answer Start';
export const DELETE_ANSWER_SUCCESS = '[Quizzes] Delete Answer Success';
export const DELETE_ANSWER_FAIL = '[Quizzes] Delete Answer Fail';


export const CLEAR_ERRORS = '[Quizzes] Clear Errors';
export const CLEAR_STATUS = '[Quizzes] Clear Status';

////////////

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

////////////

export class FetchTrashedQuizzesStart implements Action {
    readonly type = FETCH_TRASHED_QUIZZES_START;
}

export class FetchTrashedQuizzesSuccess implements Action {
    readonly type = FETCH_TRASHED_QUIZZES_SUCCESS;

    constructor(public payload: Quiz[]) { }
}

////////////

export class CreateQuizStart implements Action {
    readonly type = CREATE_QUIZ_START;

    constructor(public payload: {
        title_EN: string,
        description_EN: string,
        imagePath: string,
        languages: string,
        duration: number
    }) { }
}

export class CreateQuizSuccess implements Action {
    readonly type = CREATE_QUIZ_SUCCESS;

    constructor(public payload: Quiz) { }
}

export class CreateQuizFail implements Action {
    readonly type = CREATE_QUIZ_FAIL;

    constructor(public payload: string[]) { }
}


////////////

export class UpdateQuizStart implements Action {
    readonly type = UPDATE_QUIZ_START;

    constructor(public payload: {
        id: number,
        title_EN: string,
        description_EN: string,
        imagePath: string,
        languages: string,
        duration: number
    }) { }
}

export class UpdateQuizSuccess implements Action {
    readonly type = UPDATE_QUIZ_SUCCESS;

    constructor(public payload: Quiz) { }
}

export class UpdateQuizFail implements Action {
    readonly type = UPDATE_QUIZ_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class TrashRestoreQuizStart implements Action {
    readonly type = TRASH_RESTORE_QUIZ_START;

    constructor(public payload: { id: number, action: string }) { }
}

export class TrashQuizSuccess implements Action {
    readonly type = TRASH_QUIZ_SUCCESS;

    constructor(public payload: Quiz) { }
}

export class RestoreQuizSuccess implements Action {
    readonly type = RESTORE_QUIZ_SUCCESS;

    constructor(public payload: Quiz) { }
}

export class TrashRestoreQuizFail implements Action {
    readonly type = TRASH_RESTORE_QUIZ_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class DeleteQuizStart implements Action {
    readonly type = DELETE_QUIZ_START;

    constructor(public payload: number) { }
}

export class DeleteQuizSuccess implements Action {
    readonly type = DELETE_QUIZ_SUCCESS;

    constructor(public payload: number) { }
}


export class DeleteQuizFail implements Action {
    readonly type = DELETE_QUIZ_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class PublishUnpublishStart implements Action {
    readonly type = PUBLISH_UNPUBLISH_START;

    constructor(public payload: {
        id: number,
        action: string
    }) { }
}

export class PublishUnpublishSuccess implements Action {
    readonly type = PUBLISH_UNPUBLISH_SUCCESS;

    constructor(public payload: Quiz) { }
}

export class PublishUnpublishFail implements Action {
    readonly type = PUBLISH_UNPUBLISH_FAIL;

    constructor(public payload: string[]) { }
}


////////////

export class CreateQuestionStart implements Action {
    readonly type = CREATE_QUESTION_START;

    constructor(public payload: {
        quizId: number,
        text_EN: string,
        imagePath: string,
        duration: number
    }) { }
}

export class CreateQuestionSuccess implements Action {
    readonly type = CREATE_QUESTION_SUCCESS;

    constructor(public payload: Question) { }
}

export class CreateQuestionFail implements Action {
    readonly type = CREATE_QUESTION_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class UpdateQuestionStart implements Action {
    readonly type = UPDATE_QUESTION_START;

    constructor(public payload: {
        id: number,
        text_EN: string,
        imagePath: string,
        duration: number
    }) { }
}

export class UpdateQuestionSuccess implements Action {
    readonly type = UPDATE_QUESTION_SUCCESS;

    constructor(public payload: Question) { }
}

export class UpdateQuestionFail implements Action {
    readonly type = UPDATE_QUESTION_FAIL;

    constructor(public payload: string[]) { }
}


////////////

export class TrashRestoreQuestionStart implements Action {
    readonly type = TRASH_RESTORE_QUESTION_START;

    constructor(public payload: { id: number, action: string }) { }
}


export class TrashRestoreQuestionSuccess implements Action {
    readonly type = TRASH_RESTORE_QUESTION_SUCCESS;

    constructor(public payload: Question) { }
}

export class TrashRestoreQuestionFail implements Action {
    readonly type = TRASH_RESTORE_QUESTION_FAIL;

    constructor(public payload: string[]) { }
}


////////////

export class DeleteQuestionStart implements Action {
    readonly type = DELETE_QUESTION_START;

    constructor(public payload: number) { }
}


export class DeleteQuestionSuccess implements Action {
    readonly type = DELETE_QUESTION_SUCCESS;

    constructor(public payload: Question) { }
}

export class DeleteQuestionFail implements Action {
    readonly type = DELETE_QUESTION_FAIL;

    constructor(public payload: string[]) { }
}


////////////

export class CreateAnswerStart implements Action {
    readonly type = CREATE_ANSWER_START;

    constructor(public payload: {
        questionId: number,
        text_EN: string,
        imagePath: string,
        isCorrect: boolean
    }) { }
}

export class CreateAnswerSuccess implements Action {
    readonly type = CREATE_ANSWER_SUCCESS;

    constructor(public payload: Question) { }
}

export class CreateAnswerFail implements Action {
    readonly type = CREATE_ANSWER_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class UpdateAnswerStart implements Action {
    readonly type = UPDATE_ANSWER_START;

    constructor(public payload: {
        id: number,
        questionId: number,
        text_EN: string,
        imagePath: string,
        isCorrect: boolean
    }) { }
}

export class UpdateAnswerSuccess implements Action {
    readonly type = UPDATE_ANSWER_SUCCESS;

    constructor(public payload: Question) { }
}

export class UpdateAnswerFail implements Action {
    readonly type = UPDATE_ANSWER_FAIL;

    constructor(public payload: string[]) { }
}

////////////

export class DeleteAnswerStart implements Action {
    readonly type = DELETE_ANSWER_START;

    constructor(public payload: number) { }
}


export class DeleteAnswerSuccess implements Action {
    readonly type = DELETE_ANSWER_SUCCESS;

    constructor(public payload: Question) { }
}

export class DeleteAnswerFail implements Action {
    readonly type = DELETE_ANSWER_FAIL;

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
export type QuizzesActions =
    | FetchQuizzesStart
    | FetchQuizzesSuccess
    | FetchQuizzesFail
    | FetchTrashedQuizzesStart
    | FetchTrashedQuizzesSuccess
    | CreateQuizStart
    | CreateQuizSuccess
    | CreateQuizFail
    | UpdateQuizStart
    | UpdateQuizSuccess
    | UpdateQuizFail
    | TrashRestoreQuizStart
    | TrashQuizSuccess
    | RestoreQuizSuccess
    | TrashRestoreQuizFail
    | DeleteQuizStart
    | DeleteQuizSuccess
    | DeleteQuizFail
    | PublishUnpublishStart
    | PublishUnpublishSuccess
    | PublishUnpublishFail
    | CreateQuestionStart
    | CreateQuestionSuccess
    | CreateQuestionFail
    | UpdateQuestionStart
    | UpdateQuestionSuccess
    | UpdateQuestionFail
    | TrashRestoreQuestionStart
    | TrashRestoreQuestionSuccess
    | TrashRestoreQuestionFail
    | DeleteQuestionStart
    | DeleteQuestionSuccess
    | DeleteQuestionFail
    | CreateAnswerStart
    | CreateAnswerSuccess
    | CreateAnswerFail
    | UpdateAnswerStart
    | UpdateAnswerSuccess
    | UpdateAnswerFail
    | DeleteAnswerStart
    | DeleteAnswerSuccess
    | DeleteAnswerFail
    | ClearErrors
    | ClearStatus
    ;
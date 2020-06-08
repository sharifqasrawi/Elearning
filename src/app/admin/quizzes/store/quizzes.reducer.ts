import { Answer } from './../../../models/answer.model';

import * as QuizzesActions from './quizzes.actions';
import { Quiz } from './../../../models/quiz.model';
import { Question } from './../../../models/question.model';


export interface State {
    quizzes: Quiz[],
    questions: Question[],
    answers: Answer[],
    trashedQuizzes: Quiz[],
    loadingQuizzes: boolean,
    loadedQuizzes: boolean,
    loadingQuestions: boolean,
    loadedQuestions: boolean,
    loadingAnswers: boolean,
    loadedAnswers: boolean,
    quizCreating: boolean,
    quizCreated: boolean,
    quizUpdating: boolean,
    quizUpdated: boolean,
    quizDeleting: boolean,
    quizDeleted: boolean,
    questionCreating: boolean,
    questionCreated: boolean,
    questionUpdating: boolean,
    questionUpdated: boolean,
    questionDeleting: boolean,
    questionDeleted: boolean,
    answerCreating: boolean,
    answerCreated: boolean,
    answerUpdating: boolean,
    answerUpdated: boolean,
    answerDeleting: boolean,
    answerDeleted: boolean,
    publishing: boolean,
    published: boolean,
    errors: string[],
}

const initialState: State = {
    quizzes: [],
    questions: [],
    answers: [],
    trashedQuizzes: [],
    loadingQuizzes: false,
    loadedQuizzes: false,
    loadingQuestions: false,
    loadedQuestions: false,
    loadingAnswers: false,
    loadedAnswers: false,
    quizCreating: false,
    quizCreated: false,
    quizUpdating: false,
    quizUpdated: false,
    quizDeleting: false,
    quizDeleted: false,
    questionCreating: false,
    questionCreated: false,
    questionUpdating: false,
    questionUpdated: false,
    questionDeleting: false,
    questionDeleted: false,
    answerCreating: false,
    answerCreated: false,
    answerUpdating: false,
    answerUpdated: false,
    answerDeleting: false,
    answerDeleted: false,
    publishing: false,
    published: false,
    errors: null
}

export function quizzesReducer(state: State = initialState, action: QuizzesActions.QuizzesActions) {
    switch (action.type) {
        case QuizzesActions.FETCH_QUIZZES_START:
            return {
                ...state,
                loadingQuizzes: true,
                loadedQuizzes: false,
                errors: null
            };

        case QuizzesActions.FETCH_QUIZZES_SUCCESS:
            return {
                ...state,
                loadingQuizzes: false,
                loadedQuizzes: true,
                quizzes: [...action.payload]
            };

        case QuizzesActions.FETCH_TRASHED_QUIZZES_START:
            return {
                ...state,
                loadingQuizzes: true,
                loadedQuizzes: false,
                errors: null
            };

        case QuizzesActions.FETCH_TRASHED_QUIZZES_SUCCESS:
            return {
                ...state,
                loadingQuizzes: false,
                loadedQuizzes: true,
                trashedQuizzes: [...action.payload]
            };

        case QuizzesActions.FETCH_QUIZZES_FAIL:
            return {
                ...state,
                loadingQuizzes: false,
                errors: [...action.payload]
            };


        ///////////////

        case QuizzesActions.CREATE_QUIZ_START:
            return {
                ...state,
                quizCreating: true,
                quizCreated: false,
                errors: null
            };

        case QuizzesActions.CREATE_QUIZ_SUCCESS:
            return {
                ...state,
                quizCreating: false,
                quizCreated: true,
                quizzes: [...state.quizzes, action.payload]
            };

        case QuizzesActions.CREATE_QUIZ_FAIL:
            return {
                ...state,
                quizCreating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.UPDATE_QUIZ_START:
            return {
                ...state,
                quizUpdating: true,
                quizUpdated: false,
                errors: null
            };

        case QuizzesActions.UPDATE_QUIZ_SUCCESS:
            const quizToUpdateIndex = state.quizzes.findIndex(q => q.id === action.payload.id);
            const quizToUpdate = state.quizzes.find(q => q.id === action.payload.id);
            const quizzesAfterUpdate = [...state.quizzes];

            const quizAfterUpdate = {
                ...quizToUpdate,
                title_EN: action.payload.title_EN,
                slug_EN: action.payload.slug_EN,
                description_EN: action.payload.description_EN,
                title_FR: action.payload.title_FR,
                slug_FR: action.payload.slug_FR,
                description_FR: action.payload.description_FR,
                duration: action.payload.duration,
                languages: action.payload.languages,
                imagePath: action.payload.imagePath,
                updatedAt: action.payload.updatedAt,
                updatedBy: action.payload.updatedBy,
            };

            quizzesAfterUpdate[quizToUpdateIndex] = quizAfterUpdate;

            return {
                ...state,
                quizUpdating: false,
                quizUpdated: true,
                quizzes: [...quizzesAfterUpdate]
            };

        case QuizzesActions.UPDATE_QUIZ_FAIL:
            return {
                ...state,
                quizUpdating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.TRASH_RESTORE_QUIZ_START:
            return {
                ...state,
                loadingQuizzes: true,
                loadedQuizzes: false,
                errors: null
            };
        case QuizzesActions.TRASH_QUIZ_SUCCESS:
            const quizToTrashIndex = state.quizzes.findIndex(c => c.id === action.payload.id);
            const quizzesAfterTrash = [...state.quizzes];
            quizzesAfterTrash.splice(quizToTrashIndex, 1);

            return {
                ...state,
                loadingQuizzes: false,
                loadedQuizzes: true,
                quizzes: quizzesAfterTrash,
            };
        case QuizzesActions.RESTORE_QUIZ_SUCCESS:
            const quizToRestoreIndex = state.trashedQuizzes.findIndex(c => c.id === action.payload.id);
            const quizzesAfterRestore = [...state.trashedQuizzes];
            quizzesAfterRestore.splice(quizToRestoreIndex, 1);

            return {
                ...state,
                loadingQuizzes: false,
                loadedQuizzes: true,
                trashedQuizzes: quizzesAfterRestore,
            };
        case QuizzesActions.TRASH_RESTORE_QUIZ_FAIL:
            return {
                ...state,
                loadingQuizzes: false,
                errors: [...action.payload]
            };
        /////////////////

        case QuizzesActions.DELETE_QUIZ_START:
            return {
                ...state,
                quizDeleting: true,
                quizDeleted: false,
                errors: null
            };

        case QuizzesActions.DELETE_QUIZ_SUCCESS:
            const quizToDeleteIndex = state.trashedQuizzes.findIndex(c => c.id === action.payload);
            const quizzesAfterDelete = [...state.trashedQuizzes];
            quizzesAfterDelete.splice(quizToDeleteIndex, 1);

            return {
                ...state,
                quizDeleting: false,
                quizDeleted: true,
                trashedQuizzes: quizzesAfterDelete,
            };
        case QuizzesActions.DELETE_QUIZ_FAIL:
            return {
                ...state,
                quizDeleting: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.PUBLISH_UNPUBLISH_START:
            return {
                ...state,
                publishing: true,
                published: false,
                errors: null
            };

        case QuizzesActions.PUBLISH_UNPUBLISH_SUCCESS:
            const quizToPublishIndex = state.quizzes.findIndex(q => q.id === action.payload.id);
            const quizToPublish = state.quizzes.find(q => q.id === action.payload.id);
            const quizzesAfterPublish = [...state.quizzes];

            const quizAfterPublish = {
                ...quizToPublish,
                isPublished: action.payload.isPublished,
                publishDateTime: action.payload.publishDateTime
            };

            quizzesAfterPublish[quizToPublishIndex] = quizAfterPublish;

            return {
                ...state,
                publishing: false,
                published: true,
                quizzes: [...quizzesAfterPublish]
            };

        case QuizzesActions.PUBLISH_UNPUBLISH_FAIL:
            return {
                ...state,
                publishing: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.FETCH_QUESTIONS_START:
            return {
                ...state,
                loadingQuestions: true,
                loadedQuestions: false,
                errors: null
            };

        case QuizzesActions.FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loadingQuestions: false,
                loadedQuestions: true,
                questions: [...action.payload]
            };

        case QuizzesActions.FETCH_QUESTIONS_FAIL:
            return {
                ...state,
                loadingQuestions: true,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.CREATE_QUESTION_START:
            return {
                ...state,
                questionCreating: true,
                questionCreated: false,
                errors: null
            };

        case QuizzesActions.CREATE_QUESTION_SUCCESS:

            return {
                ...state,
                questionCreating: false,
                questionCreated: true,
                questions: [...state.questions, action.payload]
            };

        case QuizzesActions.CREATE_QUESTION_FAIL:
            return {
                ...state,
                questionCreating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.UPDATE_QUESTION_START:
            return {
                ...state,
                questionUpdating: true,
                questionUpdated: false,
                errors: null
            };

        case QuizzesActions.UPDATE_QUESTION_SUCCESS:
            const questionToUpdateIndex = state.questions.findIndex(q => q.id === action.payload.id);
            const questionToUpdate = state.questions.find(q => q.id === action.payload.id);
            const questionsAfterUpdate = [...state.questions];

            const questionAfterUpdate = {
                ...questionToUpdate,
                text_EN: action.payload.text_EN,
                slug_EN: action.payload.slug_EN,
                text_FR: action.payload.text_FR,
                slug_FR: action.payload.slug_FR,
                imagePath: action.payload.imagePath,
                duration: action.payload.duration,
                updatedAt: action.payload.updatedAt,
                updatedBy: action.payload.updatedBy,
            };

            questionsAfterUpdate[questionToUpdateIndex] = questionAfterUpdate;

            return {
                ...state,
                questionUpdating: false,
                questionUpdated: true,
                questions: [...questionsAfterUpdate]
            };

        case QuizzesActions.UPDATE_QUESTION_FAIL:
            return {
                ...state,
                questionUpdating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.TRASH_RESTORE_QUESTION_START:
            return {
                ...state,
                loadingQuestions: true,
                loadedQuestions: false,
                errors: null
            };

        case QuizzesActions.TRASH_RESTORE_QUESTION_SUCCESS:
            const questionToTrashRestoreIndex = state.questions.findIndex(q => q.id === action.payload.id);
            const questionToTrashRestore = state.questions.find(q => q.id === action.payload.id);
            const questionsAfterTrashRestore = [...state.questions];

            const questionAfterTrashRestore = {
                ...questionToTrashRestore,
                deletedAt: action.payload.deletedAt,
                deletedBy: action.payload.deletedBy,
            };

            questionsAfterTrashRestore[questionToTrashRestoreIndex] = questionAfterTrashRestore;

            return {
                ...state,
                loadingQuestions: false,
                loadedQuestions: true,
                questions: [...questionsAfterTrashRestore]
            };

        case QuizzesActions.TRASH_RESTORE_QUESTION_FAIL:
            return {
                ...state,
                loadingQuestions: false,
                errors: [...action.payload]
            };


        /////////////////

        case QuizzesActions.DELETE_QUESTION_START:
            return {
                ...state,
                loadingQuestions: true,
                loadedQuestions: false,
                errors: null
            };

        case QuizzesActions.DELETE_QUESTION_SUCCESS:
            const questionToDeleteIndex = state.questions.findIndex(c => c.id === action.payload);
            const questionsAfterDelete = [...state.questions];
            questionsAfterDelete.splice(questionToDeleteIndex, 1);

            return {
                ...state,
                loadingQuestions: false,
                loadedQuestions: true,
                questions: [...questionsAfterDelete]
            };

        case QuizzesActions.DELETE_QUESTION_FAIL:
            return {
                ...state,
                loadingQuestions: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.FETCH_ANSWERS_START:
            return {
                ...state,
                loadingAnswers: true,
                loadedAnswers: false,
                errors: null
            };

        case QuizzesActions.FETCH_ANSWERS_SUCCESS:
            return {
                ...state,
                loadingAnswers: false,
                loadedAnswers: true,
                answers: [...action.payload]
            };

        case QuizzesActions.FETCH_ANSWERS_FAIL:
            return {
                ...state,
                loadingAnswers: true,
                errors: [...action.payload]
            };


        /////////////////


        case QuizzesActions.CREATE_ANSWER_START:
            return {
                ...state,
                answerCreating: true,
                answerCreated: false,
                errors: null
            };

        case QuizzesActions.CREATE_ANSWER_SUCCESS:
           
            return {
                ...state,
                answerCreating: false,
                answerCreated: true,
                answers: [...state.answers, action.payload]
            };

        case QuizzesActions.CREATE_ANSWER_FAIL:
            return {
                ...state,
                answerCreating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.UPDATE_ANSWER_START:
            return {
                ...state,
                answerUpdating: true,
                answerUpdated: false,
                errors: null
            };

        case QuizzesActions.UPDATE_ANSWER_SUCCESS:
            const answerToUpdateIndex = state.answers.findIndex(q => q.id === action.payload.id);
            const answerToUpdate = state.answers.find(q => q.id === action.payload.id);
            const answersAfterUpdate = [...state.answers];

            const answerfterUpdate = {
                ...answerToUpdate,
                text_EN: action.payload.text_EN,
                text_FR: action.payload.text_FR,
                imagePath: action.payload.imagePath,
                isCorrect: action.payload.isCorrect,
                updatedAt: action.payload.updatedAt,
                updatedBy: action.payload.updatedBy,
            };

            answersAfterUpdate[answerToUpdateIndex] = answerfterUpdate;
            return {
                ...state,
                answerUpdating: false,
                answerUpdated: true,
                answers: [...answersAfterUpdate]
            };

        case QuizzesActions.UPDATE_ANSWER_FAIL:
            return {
                ...state,
                answerUpdating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.DELETE_ANSWER_START:
            return {
                ...state,
                answerDeleting: true,
                answerDeleted: false,
                errors: null
            };

        case QuizzesActions.DELETE_ANSWER_SUCCESS:
            const answerToDeleteIndex = state.answers.findIndex(q => q.id === action.payload);
            const answersAfterDelete = [...state.answers];

            answersAfterDelete.splice(answerToDeleteIndex, 1);

            return {
                ...state,
                answerDeleting: false,
                answerDeleted: true,
                answers: [...answersAfterDelete]
            };

        case QuizzesActions.DELETE_ANSWER_FAIL:
            return {
                ...state,
                answerDeleting: false,
                errors: [...action.payload]
            };

        ///////////////

        case QuizzesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };

        case QuizzesActions.CLEAR_STATUS:
            return {
                ...state,
                loadingQuizzes: false,
                loadedQuizzes: false,
                quizCreating: false,
                quizCreated: false,
                quizUpdating: false,
                quizUpdated: false,
                quizDeleting: false,
                quizDeleted: false,
                questionCreating: false,
                questionCreated: false,
                questionUpdating: false,
                questionUpdated: false,
                questionDeleting: false,
                questionDeleted: false,
                answerCreating: false,
                answerCreated: false,
                answerUpdating: false,
                answerUpdated: false,
                answerDeleting: false,
                answerDeleted: false,
                publishing: false,
                published: false,
            };





        /////////////////
        default:
            return state;
    }
}
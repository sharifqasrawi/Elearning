
import * as QuizzesActions from './quizzes.actions';
import { Quiz } from './../../../models/quiz.model';


export interface State {
    quizzes: Quiz[],
    trashedQuizzes: Quiz[],
    loadingQuizzes: boolean,
    loadedQuizzes: boolean,
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
    publishing: boolean,
    published: boolean,
    errors: string[],
}

const initialState: State = {
    quizzes: [],
    trashedQuizzes: [],
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


        /////////////////

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
                quizUpdating: true,
                quizUpdated: false,
                errors: null
            };
        case QuizzesActions.TRASH_QUIZ_SUCCESS:
            const quizToTrashIndex = state.quizzes.findIndex(c => c.id === action.payload.id);
            const quizzesAfterTrash = [...state.quizzes];
            quizzesAfterTrash.splice(quizToTrashIndex, 1);

            return {
                ...state,
                quizUpdating: false,
                quizUpdated: true,
                quizzes: quizzesAfterTrash,
            };
        case QuizzesActions.RESTORE_QUIZ_SUCCESS:
            const quizToRestoreIndex = state.trashedQuizzes.findIndex(c => c.id === action.payload.id);
            const quizzesAfterRestore = [...state.trashedQuizzes];
            quizzesAfterRestore.splice(quizToRestoreIndex, 1);

            return {
                ...state,
                quizUpdating: false,
                quizUpdated: true,
                trashedQuizzes: quizzesAfterRestore,
            };
        case QuizzesActions.TRASH_RESTORE_QUIZ_FAIL:
            return {
                ...state,
                quizUpdating: false,
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

        case QuizzesActions.CREATE_QUESTION_START:
            return {
                ...state,
                questionCreating: true,
                questionCreated: false,
                errors: null
            };

        case QuizzesActions.CREATE_QUESTION_SUCCESS:
            const quizToAddQuestionIndex = state.quizzes.findIndex(q => q.id === action.payload.quizId);
            const quizToAddQuestion = state.quizzes.find(q => q.id === action.payload.quizId);
            const quizzesAfterAddQuestion = [...state.quizzes];

            const quizAfterAddQuestion = {
                ...quizToAddQuestion,
                questions: [...quizToAddQuestion.questions, action.payload]
            };

            quizzesAfterAddQuestion[quizToAddQuestionIndex] = quizAfterAddQuestion;

            return {
                ...state,
                questionCreating: false,
                questionCreated: true,
                quizzes: [...quizzesAfterAddQuestion]
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
            const quizToUpdateQuestionIndex = state.quizzes.findIndex(q => q.id === action.payload.quizId);
            const quizToUpdateQuestion = state.quizzes.find(q => q.id === action.payload.quizId);
            const quizzesAfterUpdateQuestion = [...state.quizzes];

            const quizQuestions = [...quizzesAfterUpdateQuestion[quizToUpdateQuestionIndex].questions];
            const questionToUpdateIndex = quizQuestions.findIndex(q => q.id === action.payload.id);
            const questionToUpdate = quizQuestions.find(q => q.id === action.payload.id);

            const questionAfterUpdate = {
                ...questionToUpdate,
                text_EN: action.payload.text_EN,
                slug_EN: action.payload.slug_EN,
                imagePath: action.payload.imagePath,
                duration: action.payload.duration,
                updatedAt: action.payload.updatedAt,
                updatedBy: action.payload.updatedBy,
            };

            quizQuestions[questionToUpdateIndex] = questionAfterUpdate;

            const quizAfterUpdateQuestion = {
                ...quizToUpdateQuestion,
                questions: [...quizQuestions]
            };

            quizzesAfterUpdateQuestion[quizToUpdateQuestionIndex] = quizAfterUpdateQuestion;

            return {
                ...state,
                questionUpdating: false,
                questionUpdated: true,
                quizzes: [...quizzesAfterUpdateQuestion]
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
                questionUpdating: true,
                questionUpdated: false,
                errors: null
            };

        case QuizzesActions.TRASH_RESTORE_QUESTION_SUCCESS:
            const quizToTrashRestoreQuestionIndex = state.quizzes.findIndex(q => q.id === action.payload.quizId);
            const quizToTrashRestoreQuestion = state.quizzes.find(q => q.id === action.payload.quizId);
            const quizzesAfterTrashRestoreQuestion = [...state.quizzes];

            const quizQuestions2 = [...quizzesAfterTrashRestoreQuestion[quizToTrashRestoreQuestionIndex].questions];
            const questionToTrashRestoreIndex = quizQuestions2.findIndex(q => q.id === action.payload.id);
            const questionToTrashRestore = quizQuestions2.find(q => q.id === action.payload.id);

            const questionAfterTrashRestore = {
                ...questionToTrashRestore,
                deletedAt: action.payload.deletedAt,
                deletedBy: action.payload.deletedBy,
            };

            quizQuestions2[questionToTrashRestoreIndex] = questionAfterTrashRestore;

            const quizAfterTrashRestoreQuestion = {
                ...quizToTrashRestoreQuestion,
                questions: [...quizQuestions2]
            };

            quizzesAfterTrashRestoreQuestion[quizToTrashRestoreQuestionIndex] = quizAfterTrashRestoreQuestion;

            return {
                ...state,
                questionUpdating: false,
                questionUpdated: true,
                quizzes: [...quizzesAfterTrashRestoreQuestion]
            };

        case QuizzesActions.TRASH_RESTORE_QUESTION_FAIL:
            return {
                ...state,
                questionUpdating: false,
                errors: [...action.payload]
            };


        /////////////////

        case QuizzesActions.DELETE_QUESTION_START:
            return {
                ...state,
                questionDeleting: true,
                questionDeleted: false,
                errors: null
            };

        case QuizzesActions.DELETE_QUESTION_SUCCESS:
            const quizToDeleteQuestionIndex = state.quizzes.findIndex(q => q.id === action.payload.quizId);
            const quizToDeleteQuestion = state.quizzes.find(q => q.id === action.payload.quizId);
            const quizzesAfterDeleteQuestion = [...state.quizzes];

            const quizQuestions3 = [...quizzesAfterDeleteQuestion[quizToDeleteQuestionIndex].questions];
            const questionToDeleteIndex = quizQuestions3.findIndex(q => q.id === action.payload.id);

            quizQuestions3.splice(questionToDeleteIndex, 1);

            const quizAfterDeleteQuestion = {
                ...quizToDeleteQuestion,
                questions: [...quizQuestions3]
            };

            quizzesAfterDeleteQuestion[quizToDeleteQuestionIndex] = quizAfterDeleteQuestion;

            return {
                ...state,
                questionDeleting: false,
                questionDeleted: true,
                quizzes: [...quizzesAfterDeleteQuestion]
            };

        case QuizzesActions.DELETE_QUESTION_FAIL:
            return {
                ...state,
                questionDeleting: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.CREATE_ANSWER_START:
            return {
                ...state,
                questionUpdating: true,
                questionUpdated: false,
                errors: null
            };

        case QuizzesActions.CREATE_ANSWER_SUCCESS:
            const quizToAddAnswerQuestionIndex = state.quizzes.findIndex(q => q.id === action.payload.quizId);
            const quizToAddAnswerQuestion = state.quizzes.find(q => q.id === action.payload.quizId);
            const quizzesAfterAddAnswerQuestion = [...state.quizzes];

            const quizQuestions4 = [...quizzesAfterAddAnswerQuestion[quizToAddAnswerQuestionIndex].questions];
            const questionToAddAnswerIndex = quizQuestions4.findIndex(q => q.id === action.payload.id);
            const questionToAddAnswer = quizQuestions4.find(q => q.id === action.payload.id);

            const questionAfterAddAnswer = {
                ...questionToAddAnswer,
                answers: [...action.payload.answers]
            };

            quizQuestions4[questionToAddAnswerIndex] = questionAfterAddAnswer;

            const quizAfterAddAnswerQuestion = {
                ...quizToAddAnswerQuestion,
                questions: [...quizQuestions4]
            };

            quizzesAfterAddAnswerQuestion[quizToAddAnswerQuestionIndex] = quizAfterAddAnswerQuestion;

            return {
                ...state,
                questionUpdating: false,
                questionUpdated: true,
                quizzes: [...quizzesAfterAddAnswerQuestion]
            };

        case QuizzesActions.CREATE_ANSWER_FAIL:
            return {
                ...state,
                questionUpdating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.UPDATE_ANSWER_START:
            return {
                ...state,
                questionUpdating: true,
                questionUpdated: false,
                errors: null
            };

        case QuizzesActions.UPDATE_ANSWER_SUCCESS:
            const quizToUpdateAnswerQuestionIndex = state.quizzes.findIndex(q => q.id === action.payload.quizId);
            const quizToUpdateAnswerQuestion = state.quizzes.find(q => q.id === action.payload.quizId);
            const quizzesAfterUpdateAnswerQuestion = [...state.quizzes];

            const quizQuestions5 = [...quizzesAfterUpdateAnswerQuestion[quizToUpdateAnswerQuestionIndex].questions];
            const questionToUpdateAnswerIndex = quizQuestions5.findIndex(q => q.id === action.payload.id);
            const questionToUpdateAnswer = quizQuestions5.find(q => q.id === action.payload.id);

            const questionAfterUpdateAnswer = {
                ...questionToUpdateAnswer,
                answers: [...action.payload.answers]
            };

            quizQuestions5[questionToUpdateAnswerIndex] = questionAfterUpdateAnswer;

            const quizAfterUpdateAnswerQuestion = {
                ...quizToUpdateAnswerQuestion,
                questions: [...quizQuestions5]
            };

            quizzesAfterUpdateAnswerQuestion[quizToUpdateAnswerQuestionIndex] = quizAfterUpdateAnswerQuestion;

            return {
                ...state,
                questionUpdating: false,
                questionUpdated: true,
                quizzes: [...quizzesAfterUpdateAnswerQuestion]
            };

        case QuizzesActions.UPDATE_ANSWER_FAIL:
            return {
                ...state,
                questionUpdating: false,
                errors: [...action.payload]
            };

        /////////////////

        case QuizzesActions.DELETE_ANSWER_START:
            return {
                ...state,
                questionUpdating: true,
                questionUpdated: false,
                errors: null
            };

        case QuizzesActions.DELETE_ANSWER_SUCCESS:
            const quizToDeleteAnswerQuestionIndex = state.quizzes.findIndex(q => q.id === action.payload.quizId);
            const quizToDeleteAnswerQuestion = state.quizzes.find(q => q.id === action.payload.quizId);
            const quizzesAfterDeleteAnswerQuestion = [...state.quizzes];

            const quizQuestions6 = [...quizzesAfterDeleteAnswerQuestion[quizToDeleteAnswerQuestionIndex].questions];
            const questionToDeleteAnswerIndex = quizQuestions6.findIndex(q => q.id === action.payload.id);
            const questionToDeleteAnswer = quizQuestions6.find(q => q.id === action.payload.id);

            const questionAfterDeleteAnswer = {
                ...questionToDeleteAnswer,
                answers: [...action.payload.answers]
            };

            quizQuestions6[questionToDeleteAnswerIndex] = questionAfterDeleteAnswer;

            const quizAfterDeleteAnswerQuestion = {
                ...quizToDeleteAnswerQuestion,
                questions: [...quizQuestions6]
            };

            quizzesAfterDeleteAnswerQuestion[quizToDeleteAnswerQuestionIndex] = quizAfterDeleteAnswerQuestion;

            return {
                ...state,
                questionUpdating: false,
                questionUpdated: true,
                quizzes: [...quizzesAfterDeleteAnswerQuestion]
            };

        case QuizzesActions.DELETE_ANSWER_FAIL:
            return {
                ...state,
                questionUpdating: false,
                errors: [...action.payload]
            };

        /////////////////

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
                publishing: false,
                published: false,
            };





        /////////////////
        default:
            return state;
    }
}
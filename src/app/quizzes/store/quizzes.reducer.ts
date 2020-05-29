
import * as HomeQuizzesActions from './quizzes.actions';
import { Quiz } from './../../models/quiz.model';
import { UserQuizAnswer } from '../../models/userQuizAnswer.model';
import { Question } from './../../models/question.model';
import { UserQuiz } from './../../models/userQuiz.model';


export interface State {
    quizzes: Quiz[],
    loading: boolean,
    loaded: boolean,

    questions: Question[],
    loadingQs: boolean,
    loadedQs: boolean,

    currentQuiz: UserQuiz,
    loadingQz: boolean,
    loadedQz: boolean,
    startingQuiz: boolean,
    startedQuiz: boolean,
    submittingQuiz: boolean,
    submittedQuiz: boolean,

    userQuizAnswers: UserQuizAnswer[],
    loadingQzAnswers: boolean,
    loadedQzAnswers: boolean,
    choosingAnswer: boolean,
    chosenAnswer: boolean,

    errors: string[]
}

const initialState: State = {
    quizzes: [],
    loading: false,
    loaded: false,

    questions: [],
    loadingQs: false,
    loadedQs: false,

    currentQuiz: null,
    loadingQz: false,
    loadedQz: false,
    startingQuiz: false,
    startedQuiz: false,
    submittingQuiz: false,
    submittedQuiz: false,

    userQuizAnswers: [],
    loadingQzAnswers: false,
    loadedQzAnswers: false,
    choosingAnswer: false,
    chosenAnswer: false,

    errors: null
};


export function homeQuizzesReducer(state: State = initialState, action: HomeQuizzesActions.HomeQuizzesActions) {
    switch (action.type) {
        case HomeQuizzesActions.FETCH_QUIZZES_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case HomeQuizzesActions.FETCH_QUIZZES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                quizzes: [...action.payload]
            };
        case HomeQuizzesActions.FETCH_QUIZZES_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        ///////////////////

        case HomeQuizzesActions.FETCH_QUESTIONS_START:
            return {
                ...state,
                loadingQs: true,
                loadedQs: false,
                errors: null
            };
        case HomeQuizzesActions.FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loadingQs: false,
                loadedQs: true,
                questions: [...action.payload]
            };
        case HomeQuizzesActions.FETCH_QUESTIONS_FAIL:
            return {
                ...state,
                loadingQs: false,
                errors: [...action.payload]
            };

        ///////////////////

        case HomeQuizzesActions.START_QUIZ_START:
            return {
                ...state,
                startingQuiz: true,
                startedQuiz: false,
                errors: null
            };
        case HomeQuizzesActions.START_QUIZ_SUCCESS:
            return {
                ...state,
                startingQuiz: false,
                startedQuiz: true,
                currentQuiz: { ...action.payload }
            };
        case HomeQuizzesActions.START_QUIZ_FAIL:
            return {
                ...state,
                startingQuiz: false,
                errors: [...action.payload]
            };

        ///////////////////

        case HomeQuizzesActions.CHOOSE_ANSWER_START:
            return {
                ...state,
                choosingAnswer: true,
                chosenAnswer: false,
                errors: null
            };
        case HomeQuizzesActions.CHOOSE_ANSWER_SUCCESS:
            const userQuizAnswer = state.userQuizAnswers.find(a => a.questionId === action.payload.questionId);
            let userQuizAnswersAfterChoose = [...state.userQuizAnswers];

            if (userQuizAnswer) {
                const userQuizAnswerIndex = state.userQuizAnswers.findIndex(a => a.questionId === action.payload.questionId);
                const userQuizAnswerAfterChoose = {
                    ...userQuizAnswer,
                    answerId: action.payload.answerId
                };

                userQuizAnswersAfterChoose[userQuizAnswerIndex] = userQuizAnswerAfterChoose;
            }
            else {
                userQuizAnswersAfterChoose = [...state.userQuizAnswers, action.payload];
            }

            return {
                ...state,
                choosingAnswer: false,
                chosenAnswer: true,
                userQuizAnswers: [...userQuizAnswersAfterChoose]
            };
        case HomeQuizzesActions.CHOOSE_ANSWER_FAIL:
            return {
                ...state,
                choosingAnswer: false,
                errors: [...action.payload]
            };

        ///////////////////

        case HomeQuizzesActions.FETCH_USER_QUIZ_START:
            return {
                ...state,
                loadingQz: true,
                loadedQz: false,
                loadingQzAnswers: true,
                loadedQzAnswers: false,
                errors: null
            };
        case HomeQuizzesActions.FETCH_USER_QUIZ_SUCCESS:
            return {
                ...state,
                loadingQz: false,
                loadedQz: true,
                loadingQzAnswers: false,
                loadedQzAnswers: true,
                currentQuiz: { ...action.payload.userQuiz },
                userQuizAnswers: [...action.payload.userQuizAnswers]
            };
        case HomeQuizzesActions.FETCH_USER_QUIZ_FAIL:
            return {
                ...state,
                loadingQz: false,
                loadingQzAnswers: false,
                errors: [...action.payload]
            };



        ///////////////////

        case HomeQuizzesActions.SUBMIT_QUIZ_START:
            return {
                ...state,
                submittingQuiz: true,
                submittedQuiz: false,
                errors: null
            };
        case HomeQuizzesActions.SUBMIT_QUIZ_SUCCESS:
            return {
                ...state,
                submittingQuiz: false,
                submittedQuiz: true,
                currentQuiz: { ...action.payload.updatedUserQuiz },
                userQuizAnswers: [...action.payload.userQuizAnswers]
            };
        case HomeQuizzesActions.SUBMIT_QUIZ_FAIL:
            return {
                ...state,
                submittingQuiz: false,
                errors: [...action.payload]
            };

        ///////////////////

        case HomeQuizzesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };


        case HomeQuizzesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                loadingQs: false,
                loadedQs: false,
                loadingQz: false,
                loadedQz: false,
                startingQuiz: false,
                startedQuiz: false,
                submittingQuiz: false,
                submittedQuiz: false,
                loadingQzAnswers: false,
                loadedQzAnswers: false,
                choosingAnswer: false,
                chosenAnswer: false,
            
            };


        default:
            return state;
    }
}
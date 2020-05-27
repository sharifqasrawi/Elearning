import { Question } from './../../models/question.model';

import * as HomeQuizzesActions from './quizzes.actions';
import { Quiz } from './../../models/quiz.model';


export interface State {
    quizzes: Quiz[],
    questions: Question[],
    loading: boolean,
    loaded: boolean,
    loadingQs: boolean,
    loadedQs: boolean,
    errors: string[]
}

const initialState: State = {
    quizzes: [],
    questions: [],
    loading: false,
    loaded: false,
    loadingQs: false,
    loadedQs: false,
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


        default:
            return state;
    }
}
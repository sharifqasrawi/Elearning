import { Course } from './../../models/course.model';
import { Category } from '../../models/category.model';

import * as HomeActions from './home.actions';


export interface State {
    categories: Category[],
    loading: boolean,
    loaded: boolean,

    courses: Course[],
    loadingCourses: boolean,
    loadedCourses: boolean,


    errors: string[]
}

const initialState: State = {
    categories: [],
    loading: false,
    loaded: false,

    courses: [],
    loadingCourses: false,
    loadedCourses: false,


    errors: null
}

export function homeReducer(state: State = initialState, action: HomeActions.HomeActions) {
    switch (action.type) {

        case HomeActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case HomeActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                categories: [...action.payload]
            };
        case HomeActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case HomeActions.FETCH_LATEST_COURSES_START:
            return {
                ...state,
                loadingCourses: true,
                loadedCourses: false,
                errors: null
            };
        case HomeActions.FETCH_LATEST_COURSES_SUCCESS:
            return {
                ...state,
                loadingCourses: false,
                loadedCourses: true,
                courses: [...action.payload]
            };
        case HomeActions.FETCH_LATEST_COURSES_FAIL:
            return {
                ...state,
                loadingCourses: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case HomeActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case HomeActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                loadingCourses: false,
                loadedCourses: false,
            };


        default:
            return state;
    }
}
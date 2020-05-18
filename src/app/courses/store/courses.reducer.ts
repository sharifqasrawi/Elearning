import { Course } from './../../models/course.model';

import * as HomeCoursesActions from './courses.actions';

export interface State {
    courses: Course[],
    loading: boolean,
    loaded: boolean,
    loadingLike: boolean,
    loadingEnroll: boolean,
    loadingRate: boolean,
    errors: string[],
};

const initialState: State = {
    courses: [],
    loading: false,
    loaded: false,
    loadingLike: false,
    loadingEnroll: false,
    loadingRate: false,
    errors: null,
};

export function coursesReducer(state: State = initialState, action: HomeCoursesActions.HomeCoursesActions) {

    switch (action.type) {
        case HomeCoursesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case HomeCoursesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                courses: [...action.payload]
            };
        case HomeCoursesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        /////////////////////

        case HomeCoursesActions.LIKE_START:
            return {
                ...state,
                loadingLike: true,
                errors: null
            };
        case HomeCoursesActions.LIKE_SUCCESS:
            const courseToLikeIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const courseToLike = state.courses.find(c => c.id === action.payload.id);
            const coursesAfterLike = [...state.courses];

            const courseAfterLike = {
                ...courseToLike,
                likes: [...action.payload.likes]
            };

            coursesAfterLike[courseToLikeIndex] = courseAfterLike;

            return {
                ...state,
                loadingLike: false,
                courses: coursesAfterLike
            };
        case HomeCoursesActions.LIKE_FAIL:
            return {
                ...state,
                loadingLike: false,
                errors: [...action.payload]
            };

        /////////////////////

        case HomeCoursesActions.RATE_START:
            return {
                ...state,
                loadingRate: true,
                errors: null
            };
        case HomeCoursesActions.RATE_SUCCESS:
            const courseToRateIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const courseToRate = state.courses.find(c => c.id === action.payload.id);
            const coursesAfterRate = [...state.courses];

            const courseAfterRate = {
                ...courseToRate,
                ratings: {
                    ...action.payload.ratings,
                    totalRating: action.payload.ratings.totalRating,
                    ratings: [...action.payload.ratings.ratings]
                }
            };

            coursesAfterRate[courseToRateIndex] = courseAfterRate;

            return {
                ...state,
                loadingRate: false,
                courses: coursesAfterRate
            };
        case HomeCoursesActions.RATE_FAIL:
            return {
                ...state,
                loadingRate: false,
                errors: [...action.payload]
            };

        /////////////////////

        case HomeCoursesActions.ENROLL_START:
            return {
                ...state,
                loadingEnroll: true,
                errors: null
            };
        case HomeCoursesActions.ENROLL_SUCCESS:
            const courseToEnrollIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const courseToEnroll = state.courses.find(c => c.id === action.payload.id);
            const coursesAfterEnroll = [...state.courses];

            const courseAfterEnroll = {
                ...courseToEnroll,
                cls: {
                    ...action.payload.cls,
                    members: [
                        ...action.payload.cls.members
                    ]
                }
            };

            coursesAfterEnroll[courseToEnrollIndex] = courseAfterEnroll;

            return {
                ...state,
                loadingEnroll: false,
                courses: coursesAfterEnroll
            };
        case HomeCoursesActions.ENROLL_FAIL:
            return {
                ...state,
                loadingEnroll: false,
                errors: [...action.payload]
            };



        /////////////////////


        case HomeCoursesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case HomeCoursesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        default:
            return state;
    }
}
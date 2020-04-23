import { Course } from './../../../models/course.model';

import * as CoursesActions from './courses.actions';

export interface State {
    courses: Course[],
    trashedCourses: Course[],
    loading: boolean,
    loaded: boolean,
    creating: boolean,
    created: boolean,
    deleting: boolean,
    errors: string[],
};

const initialState: State = {
    courses: [],
    trashedCourses: [],
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    deleting: false,
    errors: null,
};

export function coursesReducer(state: State = initialState, action: CoursesActions.CoursesActions) {

    switch (action.type) {
        case CoursesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CoursesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                courses: [...action.payload]
            };
        case CoursesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.FETCH_DELETED_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CoursesActions.FETCH_DELETED_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                trashedCourses: [...action.payload]
            };
        case CoursesActions.FETCH_DELETED_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case CoursesActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                courses: [...state.courses, action.payload]
            };
        case CoursesActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        /////////////

        case CoursesActions.TRASH_RESTORE_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CoursesActions.TRASH_SUCCESS:
            const courseToTrashIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const coursesAfterTrash = [...state.courses];
            coursesAfterTrash.splice(courseToTrashIndex, 1);

            return {
                ...state,
                loading: false,
                loaded: true,
                courses: coursesAfterTrash,
            };
        case CoursesActions.RESTORE_SUCCESS:
            const courseToRestoreIndex = state.courses.findIndex(c => c.id === action.payload.id);
            const coursesAfterRestore = [...state.trashedCourses];
            coursesAfterRestore.splice(courseToRestoreIndex, 1);

            return {
                ...state,
                loading: false,
                loaded: true,
                trashedCourses: coursesAfterRestore,
            };
        case CoursesActions.TRASH_RESTORE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };
        default:
            return state;
    }
}
import { SavedSession } from './../../models/savedSession.model';
import { Favorite } from './../../models/favorite.model';
import { Course } from './../../models/course.model';

import * as MemberActions from './member.actions';

export interface State {
    courses: Course[],
    loading: boolean,
    loaded: boolean,

    favorites: Favorite[],
    addingToFavorite: boolean,
    loadingFavorites: boolean,
    loadedFavorites: boolean,

    savedSessions: SavedSession[],
    savingSession: boolean,
    savedSession: boolean,
    loadingSavedSessions: boolean,
    loadedSavedSessions: boolean,

    // loadingLike: boolean,
    // loadingEnroll: boolean,
    errors: string[],
};

const initialState: State = {
    courses: [],
    loading: false,
    loaded: false,

    favorites: [],
    addingToFavorite: false,
    loadingFavorites: false,
    loadedFavorites: false,

    savedSessions: [],
    savingSession: false,
    savedSession: false,
    loadingSavedSessions: false,
    loadedSavedSessions: false,

    // loadingLike: false,
    // loadingEnroll:false,
    errors: null,
};

export function memberReducer(state: State = initialState, action: MemberActions.MemberActions) {

    switch (action.type) {
        case MemberActions.FETCH_COURSES_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case MemberActions.FETCH_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                courses: [...action.payload]
            };
        case MemberActions.FETCH_COURSES_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        /////////////////////

        case MemberActions.FETCH_FAVORITES_START:
            return {
                ...state,
                loadingFavorites: true,
                loadedFavorites: false,
                errors: null
            };
        case MemberActions.FETCH_FAVORITES_SUCCESS:
            return {
                ...state,
                loadingFavorites: false,
                loadedFavorites: true,
                favorites: [...action.payload]
            };
        case MemberActions.FETCH_FAVORITES_FAIL:
            return {
                ...state,
                loadingFavorites: false,
                errors: [...action.payload]
            };


        /////////////////////

        case MemberActions.ADD_COURSE_TO_FAVORITES_START:
            return {
                ...state,
                addingToFavorite: true,
                errors: null
            };
        case MemberActions.ADD_COURSE_TO_FAVORITES_SUCCESS:
            return {
                ...state,
                addingToFavorite: false,
                favorites: [...state.favorites, action.payload]
            };
        case MemberActions.ADD_COURSE_TO_FAVORITES_FAIL:
            return {
                ...state,
                addingToFavorite: false,
                errors: [...action.payload]
            };

        /////////////////////

        case MemberActions.REMOVE_COURSE_FROM_FAVORITES_START:
            return {
                ...state,
                addingToFavorite: true,
                errors: null
            };
        case MemberActions.REMOVE_COURSE_FROM_FAVORITES_SUCCESS:
            const favoriteToDeleteIndex = state.favorites.findIndex(f => f.id === action.payload);
            const favoritesAfterDelete = [...state.favorites];
            favoritesAfterDelete.splice(favoriteToDeleteIndex, 1);

            return {
                ...state,
                addingToFavorite: false,
                favorites: favoritesAfterDelete
            };
        case MemberActions.REMOVE_COURSE_FROM_FAVORITES_FAIL:
            return {
                ...state,
                addingToFavorite: false,
                errors: [...action.payload]
            };

        /////////////////////

        case MemberActions.FETCH_SAVED_SESSIONS_START:
        case MemberActions.FETCH_USER_SAVED_SESSIONS_START:
            return {
                ...state,
                loadingSavedSessions: true,
                loadedSavedSessions: false,
                errors: null
            };
        case MemberActions.FETCH_SAVED_SESSIONS_SUCCESS:
            return {
                ...state,
                loadingSavedSessions: false,
                loadedSavedSessions: true,
                savedSessions: [...action.payload]
            };
        case MemberActions.FETCH_SAVED_SESSIONS_FAIL:
            return {
                ...state,
                loadingSavedSessions: false,
                errors: [...action.payload]
            };

        /////////////////////

        case MemberActions.SAVE_SESSION_START:
            return {
                ...state,
                savingSession: true,
                savedSession: false,
                errors: null
            };
        case MemberActions.SAVE_SESSION_SUCCESS:
            return {
                ...state,
                savingSession: false,
                savedSession: true,
                savedSessions: [...state.savedSessions, action.payload]
            };
        case MemberActions.SAVE_SESSION_FAIL:
            return {
                ...state,
                savingSession: false,
                errors: [...action.payload]
            };

        /////////////////////

        case MemberActions.REMOVE_SESSION_START:
            return {
                ...state,
                savingSession: true,
                savedSession: false,
                errors: null
            };
        case MemberActions.REMOVE_SESSION_SUCCESS:
            const sessionToRemoveIndex = state.savedSessions.findIndex(s => s.id === action.payload);
            const savedSessionsAfterRemove = [...state.savedSessions];
            savedSessionsAfterRemove.splice(sessionToRemoveIndex, 1);

            return {
                ...state,
                savingSession: false,
                savedSession: true,
                savedSessions: savedSessionsAfterRemove
            };
        case MemberActions.REMOVE_SESSION_FAIL:
            return {
                ...state,
                savingSession: false,
                errors: [...action.payload]
            };

        /////////////////////

        // case MemberActions.LIKE_START:
        //     return {
        //         ...state,
        //         loadingLike: true,
        //         errors: null
        //     };
        // case MemberActions.LIKE_SUCCESS:
        //     const courseToLikeIndex = state.courses.findIndex(c => c.id === action.payload.id);
        //     const courseToLike = state.courses.find(c => c.id === action.payload.id);
        //     const coursesAfterLike = [...state.courses];

        //     const courseAfterLike = {
        //         ...courseToLike,
        //         likes: [...action.payload.likes]
        //     };

        //     coursesAfterLike[courseToLikeIndex] = courseAfterLike;

        //     return {
        //         ...state,
        //         loadingLike: false,
        //         courses: coursesAfterLike
        //     };
        // case MemberActions.LIKE_FAIL:
        //     return {
        //         ...state,
        //         loadingLike: false,
        //         errors: [...action.payload]
        //     };

        // /////////////////////

        // case MemberActions.ENROLL_START:
        //     return {
        //         ...state,
        //         loadingEnroll: true,
        //         errors: null
        //     };
        // case MemberActions.ENROLL_SUCCESS:
        //     const courseToEnrollIndex = state.courses.findIndex(c => c.id === action.payload.id);
        //     const courseToEnroll = state.courses.find(c => c.id === action.payload.id);
        //     const coursesAfterEnroll = [...state.courses];

        //     const courseAfterEnroll = {
        //         ...courseToEnroll,
        //         cls: {
        //             ...action.payload.cls,
        //             members: [
        //                 ...action.payload.cls.members
        //             ]
        //         }
        //     };

        //     coursesAfterEnroll[courseToEnrollIndex] = courseAfterEnroll;

        //     return {
        //         ...state,
        //         loadingEnroll: false,
        //         courses: coursesAfterEnroll
        //     };
        // case MemberActions.ENROLL_FAIL:
        //     return {
        //         ...state,
        //         loadingEnroll: false,
        //         errors: [...action.payload]
        //     };



        /////////////////////


        case MemberActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case MemberActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        default:
            return state;
    }
}
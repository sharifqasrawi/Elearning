import { AppRating } from './../../models/appRating.model';

import * as AppSettingsAction from './app-settings.actions';

export interface State {
    ratings: AppRating[],
    total: number,
    loading: boolean,
    rating: boolean,
    errors: string[],
}

const initialState: State = {
    ratings: [],
    total: 0,
    loading: false,
    rating: false,
    errors: null
};

export function appSettingsReducer(state: State = initialState, action: AppSettingsAction.AppSettingsActions) {
    switch (action.type) {
        case AppSettingsAction.RATE_START:
            return {
                ...state,
                rating: true
            };

        case AppSettingsAction.RATE_SUCCESS:
            return {
                ...state,
                rating: false,
                ratings: [...action.payload.ratings.ratings],
                total: action.payload.ratings.total
            };
        case AppSettingsAction.RATE_FAIL:
            return {
                ...state,
                rating: false,
                errors: [...action.payload]
            };

        //////////////////

        case AppSettingsAction.FETCH_RATE_START:
            return {
                ...state,
                loading: true
            };

        case AppSettingsAction.FETCH_RATE_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: [...action.payload.ratings.ratings],
                total: action.payload.ratings.total

            };
        case AppSettingsAction.FETCH_RATE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        //////////////////

        case AppSettingsAction.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case AppSettingsAction.CLEAR_STATUS:
            return {
                ...state,
                rating: false
            };
        default:
            return state;
    }
}
import { Visit } from './../../models/visit.model';
import { AppRating } from './../../models/appRating.model';

import * as AppSettingsAction from './app-settings.actions';

export interface State {
    ratings: AppRating[],
    total: number,
    loading: boolean,
    rating: boolean,
    rated: boolean,
    errors: string[],

    loadingVisitsAdmin: boolean,
    totalVisits: number,
    loadingVisits: boolean,

    visits: Visit[],

    errorsVisits: string[],

}

const initialState: State = {
    ratings: [],
    total: 0,
    loading: false,
    rating: false,
    rated: false,
    errors: null,

    visits: [],
    totalVisits: 0,
    loadingVisits: false,
    loadingVisitsAdmin: false,
    errorsVisits: null,


};

export function appSettingsReducer(state: State = initialState, action: AppSettingsAction.AppSettingsActions) {
    switch (action.type) {
        case AppSettingsAction.RATE_START:
            return {
                ...state,
                rating: true,
                rated: false,
                errors: null
            };

        case AppSettingsAction.RATE_SUCCESS:
            return {
                ...state,
                rating: false,
                rated: true,
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
                loading: true,
                errors: null
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

        case AppSettingsAction.FETCH_VISITS_CLIENT_START:
            return {
                ...state,
                loadingVisits: true,
                errorsVisits: null
            };

        case AppSettingsAction.FETCH_VISITS_CLIENT_SUCCESS:
            return {
                ...state,
                loadingVisits: false,
                totalVisits: action.payload

            };
        case AppSettingsAction.FETCH_VISITS_CLIENT_FAIL:
            return {
                ...state,
                loadingVisits: false,
                errorsVisits: [...action.payload]
            };

        //////////////////

        case AppSettingsAction.FETCH_VISITS_ADMIN_START:
            return {
                ...state,
                loadingVisitsAdmin: true,
                errorsVisits: null
            };

        case AppSettingsAction.FETCH_VISITS_ADMIN_SUCCESS:
            return {
                ...state,
                loadingVisitsAdmin: false,
                visits: [...action.payload]

            };
        case AppSettingsAction.FETCH_VISITS_ADMIN_FAIL:
            return {
                ...state,
                loadingVisitsAdmin: false,
                errorsVisits: [...action.payload]
            };

        //////////////////

        case AppSettingsAction.VISIT_START:
            return {
                ...state,
                errorsVisits: null,
            };

        case AppSettingsAction.VISIT_SUCCESS:

            return {
                ...state,
                totalVisits: action.payload
            };
        case AppSettingsAction.VISIT_FAIL:
            return {
                ...state,
                errorsVisits: [...action.payload]
            };

        //////////////////


        case AppSettingsAction.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                errorsVisits: null,
            };
        case AppSettingsAction.CLEAR_STATUS:
            return {
                ...state,
                rating: false,
                loading: false,
                loadingVisits: false,
                loadingVisitsAdmin: false,
                rated: false
            };
        default:
            return state;
    }
}
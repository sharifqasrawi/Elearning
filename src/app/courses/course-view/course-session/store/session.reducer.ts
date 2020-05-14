import { Session } from './../../../../models/session.model';

import * as HomeSessionActions from './session.actions';

export interface State {
    session: Session,
    loading: boolean,
    loaded: boolean,
    errors: string[],
};

const initialState: State = {
    session: null,
    loading: false,
    loaded: false,
    errors: null,
};

export function sessionReducer(state: State = initialState, action: HomeSessionActions.HomeSessionActions) {

    switch (action.type) {
        case HomeSessionActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case HomeSessionActions.FETCH_SUCCESS:
            const session = {
                ...action.payload,
                contents: [...action.payload.contents].sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
            };

            return {
                ...state,
                loading: false,
                loaded: true,
                session: session
            };
        case HomeSessionActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };



        /////////////////////

        case HomeSessionActions.SET_CURRENT_SESSION_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case HomeSessionActions.SET_CURRENT_SESSION_SUCCESS:

            return {
                ...state,
                loading: false,
                loaded: true,
            };
        case HomeSessionActions.SET_CURRENT_SESSION_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };



        /////////////////////


        case HomeSessionActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case HomeSessionActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        default:
            return state;
    }
}
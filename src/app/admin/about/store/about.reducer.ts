import { About } from './../../../models/about.model';
import * as AboutActions from './about.actions';

export interface State {
    about: About,
    loading: boolean,
    loaded: boolean,
    saving: boolean,
    saved: boolean,
    errors: string[]
}

const initialState: State = {
    about: null,
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    errors: null
};


export function aboutReducer(state: State = initialState, action: AboutActions.AboutActions) {

    switch (action.type) {
        case AboutActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case AboutActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                about: { ...action.payload }
            };
        case AboutActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        case AboutActions.UPDATE_START:
            return {
                ...state,
                saving: true,
                saved: false,
                errors: null
            };
        case AboutActions.UPDATE_SUCCESS:

            return {
                ...state,
                saving: false,
                saved: true,
                about: { ...state.about, ...action.payload }
            };
        case AboutActions.UPDATE_FAIL:
            return {
                ...state,
                saving: false,
                errors: [...action.payload]
            };

        case AboutActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };

        case AboutActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false,
                saved: false
            };


        default:
            return state;
    }
}
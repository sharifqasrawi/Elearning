import { User } from './../../../models/user.model';
import * as RegisterActions from './register.actions';

export interface State {
    errors: { errors: string[] },
    loading: boolean,
    registerd: boolean
}

const initalState: State = {
    errors: null,
    loading: false,
    registerd: false
}

export function registerReducer(state: State = initalState, action: RegisterActions.RegisterActions) {
    switch (action.type) {
        case RegisterActions.REGISTER_START:
            return {
                ...state,
                errors: null,
                loading: true,
                registerd: false
            };
        case RegisterActions.REGISTER_FAIL:
            return {
                ...state,
                errors: action.payload,
                loading: false
            };
        case RegisterActions.REGISTER_SUCCESS:
            return {
                ...state,
                errors: null,
                loading: false,
                registerd: true
            };
        case RegisterActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case RegisterActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                registerd: false
            };
        default:
            return state;
    }
}
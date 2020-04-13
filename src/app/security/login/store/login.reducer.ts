import { User } from './../../../models/user.model';
import * as LoginActions from './login.actions';

export interface State {
    user: User | null,
    isAdmin: boolean,
    isAuthenticated: boolean,
    errors: string[],
    loading: boolean
}

const initalState: State = {
    user: null,
    isAdmin: false,
    isAuthenticated: false,
    errors: null,
    loading: false
}

export function loginReducer(state: State = initalState, action: LoginActions.LoginActions) {
    switch (action.type) {
        case LoginActions.LOGIN_START:
            return {
                ...state,
                errors: null,
                loading: true,
                isAuthenticated: false,
            };
        case LoginActions.LOGIN_FAIL:
            return {
                ...state,
                errors: [...action.payload],
                loading: false,
                isAuthenticated: false,
            };
        case LoginActions.LOGIN_SUCCESS:
            const user = new User(
                action.payload.firstName,
                action.payload.lastName,
                action.payload.email,
                '',
                '',
                action.payload.isAdmin,
                action.payload.isAuthor,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                user: user,
                isAdmin: user.isAdmin,
                isAuthenticated: true,
                errors: null,
                loading: false
            };

        case LoginActions.LOGOUT:
            return {
                ...state,
                user: null,
                isAdmin: false,
                isAuthenticated: false,
            };
        case LoginActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case LoginActions.SET_ADMIN:
            return {
                ...state,
                isAdmin: action.payload
            };
        default:
            return state;
    }
}
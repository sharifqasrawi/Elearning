import { User } from './../../../models/user.model';
import * as UsersActions from './users.actions';

export interface State {
    users: User[],
    loading: boolean,
    loaded: boolean,
    created: boolean,
    errors: string[],
    settingActiveDeactive: boolean,
    deleting: boolean
}

const initialState: State = {
    users: [],
    loading: false,
    loaded: false,
    created: false,
    errors: null,
    settingActiveDeactive: false,
    deleting: false,
};

export function usersReducer(
    state: State = initialState,
    action: UsersActions.UsersActions) {

    switch (action.type) {
        case UsersActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        case UsersActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [...action.payload]
            };

        case UsersActions.FETCH_FAIL:

            return {
                ...state,
                errors: [...action.payload],
                loading: false,
                loaded: false,
            };

        case UsersActions.SEARCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        case UsersActions.SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [...action.payload]
            };

        case UsersActions.SEARCH_FAIL:

            return {
                ...state,
                errors: [...action.payload],
                loading: false,
                loaded: false,
            };

        case UsersActions.CREATE_START:
            return {
                ...state,
                loading: true,
                created: false,
                errors: null
            };
        case UsersActions.CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                created: true,
                users: [...state.users, action.payload]
            };

        case UsersActions.CREATE_FAIL:
            return {
                ...state,
                loading: false,
                created: false,
                errors: [...action.payload]
            };

        case UsersActions.UPDATE_START:
            return {
                ...state,
                loading: true
            };

        case UsersActions.UPDATE_SUCCESS:
            const user0 = state.users.find(u => u.id === action.payload.id);
            const userIndex0 = state.users.findIndex(u => u.id === action.payload.id);

            const updatedUser0 = {
                ...user0,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                emailConfirmed: action.payload.emailConfirmed,
                country: action.payload.country,
                gender: action.payload.gender,
                isAdmin: action.payload.isAdmin,
                isAuthor: action.payload.isAuthor,
                isActive: action.payload.isActive,
                token: ''
            };

            const updatedUsers0 = [...state.users];
            updatedUsers0[userIndex0] = updatedUser0;

            return {
                ...state,
                loading: false,
                users: updatedUsers0
            };

        case UsersActions.UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        case UsersActions.DELETE_START:
            return {
                ...state,
                deleting: true,
            };

        case UsersActions.DELETE_SUCCESS:
            const deletedUserIndex = state.users.findIndex(u => u.id === action.payload);
            return {
                ...state,
                deleting: false,
                users: state.users.filter((user, index) => index !== deletedUserIndex)
            };

        case UsersActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };

        case UsersActions.SET_ACTIVE_DEACTIVE_START:
            return {
                ...state,
                settingActiveDeactive: true
            };

        case UsersActions.SET_ACTIVE_DEACTIVE_SUCCESS:
            const user = state.users.find(u => u.id === action.payload.userId);
            const userIndex = state.users.findIndex(u => u.id === action.payload.userId);

            const updatedUser = {
                ...user,
                isActive: action.payload.isActive,
                token: ''
            };

            const updatedUsers = [...state.users];
            updatedUsers[userIndex] = updatedUser;

            return {
                ...state,
                settingActiveDeactive: false,
                users: updatedUsers
            };

        case UsersActions.SET_ACTIVE_DEACTIVE_FAIL:
            return {
                ...state,
                settingActiveDeactive: false,
                errors: [...action.payload]
            };

        case UsersActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case UsersActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                created: false
            };
        default:
            return state;
    }

}
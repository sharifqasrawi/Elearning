import { User } from './../../../models/user.model';
import * as UsersActions from './users.actions';

export interface State {
    users: User[],
    user: User,
    loading: boolean,
    loaded: boolean,
    creating: boolean,
    created: boolean,
    updating: boolean,
    updated: boolean,
    deleting: boolean
    settingActiveDeactive: boolean,
    errors: string[],
}

const initialState: State = {
    users: [],
    user: null,
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    deleting: false,
    settingActiveDeactive: false,
    errors: null,
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
                errors: null,
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

        case UsersActions.FETCH_USER_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            };
        case UsersActions.FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: { ...action.payload, token: '' }
            };

        case UsersActions.FETCH_USER_FAIL:

            return {
                ...state,
                loading: false,
                loaded: false,
                errors: [...action.payload],
            };

        case UsersActions.SEARCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
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
                creating: true,
                created: false,
                errors: null
            };
        case UsersActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                users: [...state.users, action.payload]
            };

        case UsersActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        case UsersActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null,
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
                updating: false,
                updated: true,
                users: updatedUsers0,
            };

        case UsersActions.UPDATE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };


        case UsersActions.UPDATE_PROFILE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null,
            };


        case UsersActions.UPDATE_PROFILE_SUCCESS:

            const userAfterUpdate = {
                ...action.payload,
                token: ''
            };

            return {
                ...state,
                updating: false,
                updated: true,
                user: userAfterUpdate,
            };

        case UsersActions.UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        case UsersActions.CHANGE_PASSWORD_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null,
            };


        case UsersActions.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                updating: false,
                updated: true,
            };

        case UsersActions.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };


        case UsersActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                errors: null,
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
                settingActiveDeactive: true,
                errors: null,
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
                loaded: false,
                creating: false,
                created: false,
                updating: false,
                updated: false,
                deleting: false,
                settingActiveDeactive: false
            };
        default:
            return state;
    }

}
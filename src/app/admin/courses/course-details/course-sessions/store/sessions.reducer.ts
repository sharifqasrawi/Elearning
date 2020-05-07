import { Session } from './../../../../../models/session.model';

import * as SessionsActions from './sessions.actions';

export interface State {
    sessions: Session[],
    loading: boolean,
    loaded: boolean,
    creating: boolean,
    created: boolean,
    updating: boolean,
    updated: boolean,
    deleting: boolean,
    deleted: boolean,
    errors: string[],
};

const initialState: State = {
    sessions: [],
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    deleting: false,
    deleted: false,
    errors: null,
};

export function sessionsReducer(state: State = initialState, action: SessionsActions.SessionActions) {

    switch (action.type) {
        case SessionsActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case SessionsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                sessions: [...action.payload]
            };
        case SessionsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        /////////////////////

        case SessionsActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case SessionsActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                sessions: [...state.sessions, action.payload]
            };

        case SessionsActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        case SessionsActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };

        case SessionsActions.UPDATE_SUCCESS:

            const sessionToUpdate = state.sessions.find(s => s.id === action.payload.updatedSession.id);
            const sessionToUpdateIndex = state.sessions.findIndex(s => s.id === action.payload.updatedSession.id);
            const sessionsAfterUpdate = [...state.sessions];

            const sessionAfterUpdate = {
                ...sessionToUpdate,
                title_EN: action.payload.updatedSession.title_EN,
                slug_EN: action.payload.updatedSession.slug_EN,
                order: action.payload.updatedSession.order,
                duration: action.payload.updatedSession.duration,
                updatedAt: action.payload.updatedSession.updatedAt,
                updatedBy: action.payload.updatedSession.updatedBy,
            };

            if (action.payload.updatedOldSession) {
                const oldSessionToUpdate = state.sessions.find(s => s.id === action.payload.updatedOldSession.id);
                const oldSessionToUpdateIndex = state.sessions.findIndex(s => s.id === action.payload.updatedOldSession.id);

                const oldSessionAfterUpdate = {
                    ...oldSessionToUpdate,
                    order: action.payload.updatedOldSession.order,
                };

                sessionsAfterUpdate[oldSessionToUpdateIndex] = oldSessionAfterUpdate;
            }


            sessionsAfterUpdate[sessionToUpdateIndex] = sessionAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                sessions: sessionsAfterUpdate.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
            };

        case SessionsActions.UPDATE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        case SessionsActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };

        case SessionsActions.DELETE_SUCCESS:
            const sessionToDeleteIndex = state.sessions.findIndex(s => s.id === action.payload);
            const sessionsAfterDelete = [...state.sessions];
            sessionsAfterDelete.splice(sessionToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                sessions: sessionsAfterDelete
            };

        case SessionsActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };


        /////////////////////

        case SessionsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case SessionsActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                creating: false,
                created: false,
                updating: false,
                updated: false,
                deleting: false,
                deleted: false,
            };
        default:
            return state;
    }
}
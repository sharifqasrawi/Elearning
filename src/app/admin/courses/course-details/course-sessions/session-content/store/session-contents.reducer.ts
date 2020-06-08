import { SessionContent } from './../../../../../../models/sessionContent.model';

import * as SessionContentsActions from './session-contents.actions';

export interface State {
    contents: SessionContent[],
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
    contents: [],
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

export function sessionContentsReducer(state: State = initialState, action: SessionContentsActions.SessionContentsActions) {

    switch (action.type) {
        case SessionContentsActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case SessionContentsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                contents: [...action.payload].sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
            };
        case SessionContentsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        /////////////////////

        case SessionContentsActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case SessionContentsActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                contents: [...state.contents, action.payload]
            };

        case SessionContentsActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        case SessionContentsActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };

        case SessionContentsActions.UPDATE_SUCCESS:

            const contentToUpdate = state.contents.find(s => s.id === action.payload.updatedSessionContent.id);
            const contentToUpdateIndex = state.contents.findIndex(s => s.id === action.payload.updatedSessionContent.id);
            const contentsAfterUpdate = [...state.contents];

            const contentAfterUpdate = {
                ...contentToUpdate,
                type: action.payload.updatedSessionContent.type,
                order: action.payload.updatedSessionContent.order,
                content: action.payload.updatedSessionContent.content,
                content_FR: action.payload.updatedSessionContent.content_FR,
              
            };

            if (action.payload.updatedOldSessionContent) {
                const oldContentToUpdate = state.contents.find(s => s.id === action.payload.updatedOldSessionContent.id);
                const oldContentToUpdateIndex = state.contents.findIndex(s => s.id === action.payload.updatedOldSessionContent.id);

                const oldContentAfterUpdate = {
                    ...oldContentToUpdate,
                    order: action.payload.updatedOldSessionContent.order,
                };

                contentsAfterUpdate[oldContentToUpdateIndex] = oldContentAfterUpdate;
            }


            contentsAfterUpdate[contentToUpdateIndex] = contentAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                contents: contentsAfterUpdate.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
            };

        case SessionContentsActions.UPDATE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        case SessionContentsActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };

        case SessionContentsActions.DELETE_SUCCESS:
            const contentToDeleteIndex = state.contents.findIndex(s => s.id === action.payload);
            const contentsAfterDelete = [...state.contents];
            contentsAfterDelete.splice(contentToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                contents: contentsAfterDelete
            };

        case SessionContentsActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };


        /////////////////////

        case SessionContentsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case SessionContentsActions.CLEAR_STATUS:
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
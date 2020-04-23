import { Tag } from './../../../models/tag.model';

import * as TagsActions from './tags.actions';

export interface State {
    tags: Tag[],
    loading: boolean,
    loaded: boolean,
    creating: boolean,
    created: boolean,
    deleting: boolean,
    deleted: boolean,
    errors: string[],
}

const initialState: State = {
    tags: [],
    errors: null,
    loading: false,
    loaded: false,
    creating: false,
    created: false,
    deleting: false,
    deleted: false
};

export function tagsReducer(state: State = initialState, action: TagsActions.TagsActions) {

    switch (action.type) {
        case TagsActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case TagsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                tags: [...action.payload]
            };
        case TagsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////////

        case TagsActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case TagsActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                tags: [...state.tags, action.payload]
            };
        case TagsActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        /////////////////

        case TagsActions.UPDATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case TagsActions.UPDATE_SUCCESS:
            const tagToUpdateIndex = state.tags.findIndex(t => t.id === action.payload.id);
            const tagToUpdate = state.tags.find(t => t.id === action.payload.id);
            const tagsAfterUpdate = [...state.tags];

            const tagAfterUpdate = {
                ...tagToUpdate,
                name: action.payload.name
            };

            tagsAfterUpdate[tagToUpdateIndex] = tagAfterUpdate;

            return {
                ...state,
                creating: false,
                created: true,
                tags: tagsAfterUpdate
            };
        case TagsActions.UPDATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        /////////////////

        case TagsActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case TagsActions.DELETE_SUCCESS:
            const tagToDeleteIndex = state.tags.findIndex(t => t.id === action.payload);
            const tagsAfterDelete = [...state.tags];

            tagsAfterDelete.splice(tagToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                tags: tagsAfterDelete
            };
        case TagsActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };

        //////////////////
        default:
            return state;
    }
}
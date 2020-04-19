import * as FilesAction from './files.actions';
import { UploadedFile } from './../../../models/uploadedFile.model';


export interface State {
    files: UploadedFile[],
    loading: boolean,
    loaded: boolean,
    errors: string[],
    deleting: boolean,
}

const initialState: State = {
    files: [],
    errors: null,
    loading: false,
    loaded: false,
    deleting: false,
};


export function filesReducer(state: State = initialState, action: FilesAction.FilesActions) {
    switch (action.type) {
        case FilesAction.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            };
        case FilesAction.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                files: [...action.payload]
            };
        case FilesAction.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        /////////////

        case FilesAction.DELETE_START:
            return {
                ...state,
                deleting: true,
                errors: null,
            };
        case FilesAction.DELETE_SUCCESS:
            const fileToDeleteIndex = state.files.findIndex(f => f.id === action.payload);
            const filesAfterDelete = [...state.files];
            filesAfterDelete.splice(fileToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                files: filesAfterDelete
            };
        case FilesAction.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload],
            };
        default:
            return state;
    }
}
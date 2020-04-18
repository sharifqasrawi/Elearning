import * as FilesAction from './files.actions';
import { UploadedFile } from './../../../models/uploadedFile.model';


export interface State {
    files: UploadedFile[],
    loading: boolean,
    loaded: boolean,
    errors: string[]
}

const initialState: State = {
    files: [],
    errors: null,
    loading: false,
    loaded: false,
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
        default:
            return state;
    }
}
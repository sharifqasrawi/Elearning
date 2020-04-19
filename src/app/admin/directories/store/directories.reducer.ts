import { Directory } from './../../../models/directory.model';

import * as DirectoriesActions from './directories.actions';

export interface State {
    directories: Directory[],
    physicalDirectories: Directory[],
    loading: boolean,
    loadingPhysicalDirectories: boolean
    creating: boolean,
    errors: string[],
    errorsPhysicalDirectories: string[],
}

const initialState: State = {
    directories: [],
    physicalDirectories: [],
    loading: false,
    loadingPhysicalDirectories: false,
    creating: false,
    errors: null,
    errorsPhysicalDirectories: null,
};

export function directoriesReducer(state: State = initialState, action: DirectoriesActions.DirectoriesActions) {

    switch (action.type) {
        case DirectoriesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case DirectoriesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                directories: [...action.payload]
            };
        case DirectoriesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        ////////////

        case DirectoriesActions.FETCH_PHYSICAL_START:
            return {
                ...state,
                loadingPhysicalDirectories: true,
                errorsPhysicalDirectories: null,
            };
        case DirectoriesActions.FETCH_PHYSICAL_SUCCESS:
            return {
                ...state,
                loadingPhysicalDirectories: false,
                physicalDirectories: [...action.payload]
            };
        case DirectoriesActions.FETCH_PHYSICAL_FAIL:
            return {
                ...state,
                loadingPhysicalDirectories: false,
                errorsPhysicalDirectories: [...action.payload],
                physicalDirectories: []
            };

        ////////////

        case DirectoriesActions.CREATE_START:
            return {
                ...state,
                creating: true,
                errors: null,
            };
        case DirectoriesActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                directories: [...state.directories, action.payload]
            };
        case DirectoriesActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload],
            };

        ////////////////
        case DirectoriesActions.DELETE_START:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case DirectoriesActions.DELETE_SUCCESS:
            const directoryToDeleteIndex = state.directories.findIndex(d => d.id === action.payload);
            const directoriesAfterDelete = [...state.directories];
            directoriesAfterDelete.splice(directoryToDeleteIndex, 1);


            return {
                ...state,
                loading: false,
                directories: directoriesAfterDelete
            };
        case DirectoriesActions.DELETE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        default:
            return state;
    }

}
import { Section } from './../../../../../models/section.model';
import { Course } from './../../../../../models/course.model';

import * as SectionsActions from './sections.actions';

export interface State {
    sections: Section[],
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
    sections: [],
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

export function sectionsReducer(state: State = initialState, action: SectionsActions.SectionsActions) {

    switch (action.type) {
        case SectionsActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case SectionsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                sections: [...action.payload]
            };
        case SectionsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        /////////////////////

        case SectionsActions.CREATE_START:
            return {
                ...state,
                creating: true,
                created: false,
                errors: null
            };
        case SectionsActions.CREATE_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                sections: [...state.sections, action.payload]
            };

        case SectionsActions.CREATE_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        case SectionsActions.UPDATE_START:
            return {
                ...state,
                updating: true,
                updated: false,
                errors: null
            };

        case SectionsActions.UPDATE_SUCCESS:

            const sectionToUpdate = state.sections.find(s => s.id === action.payload.updatedSection.id);
            const sectionToUpdateIndex = state.sections.findIndex(s => s.id === action.payload.updatedSection.id);
            const sectionsAfterUpdate = [...state.sections];

            const sectionAfterUpdate = {
                ...sectionToUpdate,
                name_EN: action.payload.updatedSection.name_EN,
                slug_EN: action.payload.updatedSection.slug_EN,
                order: action.payload.updatedSection.order,
                updatedAt: action.payload.updatedSection.updatedAt,
                updatedBy: action.payload.updatedSection.updatedBy,
            };

            if(action.payload.updatedOldSection){
                const oldSectionToUpdate = state.sections.find(s => s.id === action.payload.updatedOldSection.id);
                const oldSectionToUpdateIndex = state.sections.findIndex(s => s.id === action.payload.updatedOldSection.id);

                const oldSectionAfterUpdate = {
                    ...oldSectionToUpdate,
                    order: action.payload.updatedOldSection.order,
                };

                sectionsAfterUpdate[oldSectionToUpdateIndex] = oldSectionAfterUpdate;
            }


            sectionsAfterUpdate[sectionToUpdateIndex] = sectionAfterUpdate;

            return {
                ...state,
                updating: false,
                updated: true,
                sections: sectionsAfterUpdate.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
            };

        case SectionsActions.UPDATE_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        case SectionsActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };

        case SectionsActions.DELETE_SUCCESS:
            const sectionToDeleteIndex = state.sections.findIndex(s => s.id === action.payload);
            const sectionsAfterDelete = [...state.sections];
            sectionsAfterDelete.splice(sectionToDeleteIndex, 1);

            return {
                ...state,
                deleting: false,
                deleted: true,
                sections: sectionsAfterDelete
            };

        case SectionsActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };


        /////////////////////

        case SectionsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case SectionsActions.CLEAR_STATUS:
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
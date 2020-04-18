import { Category } from './../../../models/category.model';

import * as CategoriesActions from './categories.actions';


export interface State {
    categories: Category[],
    trashedCategories: Category[],
    loading: boolean,
    loaded: boolean,
    saving: boolean,
    saved: boolean,
    deleting: boolean,
    deleted: boolean,
    errors: string[]
}

const initialState: State = {
    categories: [],
    trashedCategories: [],
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    deleting: false,
    deleted: false,
    errors: null
}

export function categoriesReducer(state: State = initialState, action: CategoriesActions.CategoriesActions) {
    switch (action.type) {
        case CategoriesActions.CREATE_START:
            return {
                ...state,
                saving: true,
                saved: false,
                errors: null
            };
        case CategoriesActions.CREATE_SUCCESS:
            const afterCreate = [...state.categories, action.payload];
            afterCreate.sort((a, b) => (a.title_EN > b.title_EN) ? 1 : ((b.title_EN > a.title_EN) ? -1 : 0));

            return {
                ...state,
                saving: false,
                saved: true,
                categories: afterCreate

            };
        case CategoriesActions.CREATE_FAIL:
            return {
                ...state,
                saving: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case CategoriesActions.UPDATE_START:
            return {
                ...state,
                saving: true,
                saved: false,
                errors: null
            };
        case CategoriesActions.UPDATE_SUCCESS:
            const categoryToUpdate = state.categories.find(c => c.id === action.payload.id);    
            const categoryToUpdateIndex = state.categories.findIndex(c => c.id === action.payload.id);
            
            const updatedCategory = {
                ...categoryToUpdate,
                title_EN: action.payload.title_EN,
                updatedAt: action.payload.updatedAt,
                updatedBy: action.payload.updatedBy
            };

            const updatedCategories = [...state.categories];
            updatedCategories[categoryToUpdateIndex] = updatedCategory;

            return {
                ...state,
                categories: updatedCategories,
                saving: false,
                saved: true,
            };
        case CategoriesActions.UPDATE_FAIL:
            return {
                ...state,
                saving: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case CategoriesActions.TRASH_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case CategoriesActions.TRASH_SUCCESS:
            
            const categoryToTrashIndex = state.categories.findIndex(c => c.id === action.payload.id);
            const categoriesAfterTrash = [...state.categories];
            categoriesAfterTrash.splice(categoryToTrashIndex, 1);

            return {
                ...state,
                categories: categoriesAfterTrash,
                // trashedCategories: trashedCategoriesAfterTrash,
                deleting: false,
                deleted: true,
            };
        case CategoriesActions.TRASH_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case CategoriesActions.RESTORE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case CategoriesActions.RESTORE_SUCCESS:
            const categoryToRestoreIndex = state.trashedCategories.findIndex(c => c.id === action.payload.id);
           
            // Removing from categories array
            const trashedCategoriesAfterRestore = [...state.trashedCategories];
            trashedCategoriesAfterRestore.splice(categoryToRestoreIndex, 1);

            return {
                ...state,
                // categories: categoriesAfterRestore,
                trashedCategories: trashedCategoriesAfterRestore,
                deleting: false,
                deleted: true,
            };
        case CategoriesActions.RESTORE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case CategoriesActions.DELETE_START:
            return {
                ...state,
                deleting: true,
                deleted: false,
                errors: null
            };
        case CategoriesActions.DELETE_SUCCESS:
            const trashedCategoryToDeleteIndex = state.trashedCategories.findIndex(c => c.id === action.payload);
            const trashedCategoriesAfterDelete = [...state.trashedCategories];
            trashedCategoriesAfterDelete.splice(trashedCategoryToDeleteIndex, 1);

            return {
                ...state,
                trashedCategories: trashedCategoriesAfterDelete,
                deleting: false,
                deleted: true,
            };
        case CategoriesActions.DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case CategoriesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CategoriesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                categories: [...action.payload]
            };
        case CategoriesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////////////////////////

        case CategoriesActions.FETCH_DELETED_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CategoriesActions.FETCH_DELETED_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                trashedCategories: [...action.payload]
            };
        case CategoriesActions.FETCH_DELETED_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////////////

        case CategoriesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case CategoriesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false,
                saved: false,
                deleting: false,
                deleted: false,
            };


        default:
            return state;
    }
}
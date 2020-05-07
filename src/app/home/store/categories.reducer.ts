import { Category } from './../../models/category.model';

import * as HomeCategoriesActions from './categories.actions';


export interface State {
    categories: Category[],
    loading: boolean,
    loaded: boolean,
    errors: string[]
}

const initialState: State = {
    categories: [],
    loading: false,
    loaded: false,
    errors: null
}

export function categoriesReducer(state: State = initialState, action: HomeCategoriesActions.HomeCategoriesActions) {
    switch (action.type) {

        case HomeCategoriesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case HomeCategoriesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                categories: [...action.payload]
            };
        case HomeCategoriesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////////////////////////


        case HomeCategoriesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case HomeCategoriesActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                loaded: false,
            };


        default:
            return state;
    }
}
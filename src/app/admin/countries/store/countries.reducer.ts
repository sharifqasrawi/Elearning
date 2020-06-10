import { Country } from './../../../models/country.model';
import * as CountriesActions from './countries.actions';

export interface State {
    countries: Country[],
    loading: boolean,
    loaded: boolean,
    errors: string[]
}

const initialState: State = {
    countries: [],
    loading: false,
    loaded: false,
    errors: null
};

export function countriesReducer(state: State = initialState, action: CountriesActions.CountriesActions) {

    switch (action.type) {
        case CountriesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CountriesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                countries: [...action.payload]
            };
        case CountriesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        /////////

        case CountriesActions.CREATE_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CountriesActions.CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                countries: [...state.countries, action.payload]
            };
        case CountriesActions.CREATE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////

        case CountriesActions.UPDATE_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CountriesActions.UPDATE_SUCCESS:
            const countryToUpdateIndex = state.countries.findIndex(c => c.id === action.payload.id);
            const countryToUpdate = state.countries.find(c => c.id === action.payload.id);
            const countriesAfterUpdate = [...state.countries];

            const countryAfterUpdate = {
                ...countryToUpdate,
                name_EN: action.payload.name_EN,
                name_FR: action.payload.name_FR,
                flagPath: action.payload.flagPath
            };

            countriesAfterUpdate[countryToUpdateIndex] = countryAfterUpdate;

            return {
                ...state,
                loading: false,
                loaded: true,
                countries: [...countriesAfterUpdate]
            };
        case CountriesActions.UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////

        case CountriesActions.DELETE_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };
        case CountriesActions.DELETE_SUCCESS:
            const countryToDeleteIndex = state.countries.findIndex(c => c.id === action.payload);
            const countriesAfterDelete = [...state.countries];
            countriesAfterDelete.splice(countryToDeleteIndex, 1);

            return {
                ...state,
                loading: false,
                loaded: true,
                countries: [...countriesAfterUpdate]
            };
        case CountriesActions.DELETE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        default:
            return state;
    }
}
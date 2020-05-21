import { Report } from './../../../models/report.model';

import * as ReportsActions from './reports.action';

export interface State {
    reports: Report[],
    loading: boolean,
    creating: boolean,
    errors: string[]
}

const initalState: State = {
    reports: [],
    loading: false,
    creating: false,
    errors: null
};

export function reportsReducer(state: State = initalState, action: ReportsActions.ReportsActions) {
    switch (action.type) {


        default:
            return state;
    }
}
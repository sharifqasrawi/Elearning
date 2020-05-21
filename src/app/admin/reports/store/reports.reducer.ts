import { Report } from './../../../models/report.model';

import * as ReportsActions from './reports.action';

export interface State {
    reports: Report[],
    loading: boolean,
    creating: boolean,
    created: boolean,
    updating: boolean,
    updated: boolean,
    errors: string[]
}

const initalState: State = {
    reports: [],
    loading: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    errors: null
};

export function reportsReducer(state: State = initalState, action: ReportsActions.ReportsActions) {
    switch (action.type) {

        case ReportsActions.FETCH_START:
            return {
                ...state,
                loading: true
            };
        case ReportsActions.FETCH_BY_USER_START:
            return {
                ...state,
                loading: true
            };
        case ReportsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                reports: [...action.payload]
            };
        case ReportsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };

        /////////////////

        case ReportsActions.REPORT_BUG_START:
            return {
                ...state,
                creating: true,
                created: false,
            };
        case ReportsActions.REPORT_BUG_SUCCESS:
            return {
                ...state,
                creating: false,
                created: true,
                reports: [...state.reports, action.payload]
            };
        case ReportsActions.REPORT_BUG_FAIL:
            return {
                ...state,
                creating: false,
                errors: [...action.payload]
            };

        /////////////////

        case ReportsActions.MARK_REPORT_START:
            return {
                ...state,
                updating: true,
                updated: false
            };
        case ReportsActions.MARK_REPORT_SUCCESS:

            const reportToMarkIndex = state.reports.findIndex(r => r.id === action.payload.id);
            const reportToMark = state.reports.find(r => r.id === action.payload.id);
            const reportsAfterMark = [...state.reports];

            const reportAfterMark = {
                ...reportToMark,
                isSeen: action.payload.isSeen
            };

            reportsAfterMark[reportToMarkIndex] = reportAfterMark;

            return {
                ...state,
                updating: false,
                updated: true,
                reports: reportsAfterMark
            };
        case ReportsActions.MARK_REPORT_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };

        /////////////////

        case ReportsActions.MARK_REPLY_START:
            return {
                ...state,
                updating: true,
                updated: false
            };
        case ReportsActions.MARK_REPLY_SUCCESS:

            const replyToMarkIndex = state.reports.findIndex(r => r.id === action.payload.id);
            const replyToMark = state.reports.find(r => r.id === action.payload.id);
            const replysAfterMark = [...state.reports];

            const replyAfterMark = {
                ...replyToMark,
                isReplySeen: action.payload.isReplySeen
            };

            replysAfterMark[replyToMarkIndex] = replyAfterMark;

            return {
                ...state,
                updating: false,
                updated: true,
                reports: replysAfterMark
            };
        case ReportsActions.MARK_REPLY_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };


        /////////////////

        case ReportsActions.REPLY_REPORT_START:
            return {
                ...state,
                updating: true,
                updated: false
            };
        case ReportsActions.REPLY_REPORT_SUCCESS:

            const reportToReplyIndex = state.reports.findIndex(r => r.id === action.payload.id);
            const reportToReply = state.reports.find(r => r.id === action.payload.id);
            const reportsAfterReply = [...state.reports];

            const reportAfterReply = {
                ...reportToReply,
                replyMessage: action.payload.replyMessage,
                replyDateTime: action.payload.replyDateTime,
                isReplySeen: action.payload.isReplySeen
            };

            reportsAfterReply[reportToReplyIndex] = reportAfterReply;

            return {
                ...state,
                updating: false,
                updated: true,
                reports: reportsAfterReply
            };
        case ReportsActions.REPLY_REPORT_FAIL:
            return {
                ...state,
                updating: false,
                errors: [...action.payload]
            };
        /////////////////

        case ReportsActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };

        /////////////////

        case ReportsActions.CLEAR_STATUS:
            return {
                ...state,
                loading: false,
                creating: false,
                created: false,
            };

        default:
            return state;
    }
}
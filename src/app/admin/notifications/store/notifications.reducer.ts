import { Notification } from './../../../models/notification.model';

import * as NotificationsActions from './notifications.actions';

export interface State {
    notifications: Notification[],
    loading: boolean,
    loaded: boolean,
    errors: string[];
}

const initialState: State = {
    notifications: [],
    loading: false,
    loaded: false,
    errors: null
};

export function notificationsReducer(state: State = initialState, action: NotificationsActions.NotificationsActions) {
    switch (action.type) {
        case NotificationsActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null
            };

        case NotificationsActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                notifications: [...action.payload]
            };

        case NotificationsActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload]
            };


        default:
            return state;
    }
}
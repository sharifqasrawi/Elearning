import { Message } from './../../../models/message.model';

import * as MessagesActions from './messages.actions';


export interface State {
    messages: Message[],
    loading: boolean,
    loaded: boolean,
    sending: boolean,
    sent: boolean,
    errors: string[]
}

const initialState: State = {
    messages: [],
    loading: false,
    loaded: false,
    sending: false,
    sent: false,
    errors: null
};

export function messagesReducer(state: State = initialState, action: MessagesActions.MessagesActions) {
    switch (action.type) {
        case MessagesActions.SEND_START:
            return {
                ...state,
                sending: true,
                sent: false,
                errors: null,
            };
        case MessagesActions.SEND_SUCCESS:
            return {
                ...state,
                sending: false,
                sent: true,
            };
        case MessagesActions.SEND_FAIL:
            return {
                ...state,
                sending: false,
                errors: [...action.payload],
            };

        case MessagesActions.FETCH_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            };
        case MessagesActions.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                messages: [...action.payload]
            };
        case MessagesActions.FETCH_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        case MessagesActions.CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };
        case MessagesActions.CLEAR_STATUS:
            return {
                ...state,
                sending: false,
                sent: false,
            };
        default:
            return state;
    }
}
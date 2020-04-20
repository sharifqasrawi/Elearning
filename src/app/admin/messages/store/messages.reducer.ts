import { EmailMessage } from './../../../models/emailMessage';
import { Message } from './../../../models/message.model';

import * as MessagesActions from './messages.actions';


export interface State {
    messages: Message[],
    emailMessages: EmailMessage[],
    loading: boolean,
    loaded: boolean,
    sending: boolean,
    sent: boolean,
    errors: string[]
}

const initialState: State = {
    messages: [],
    emailMessages: [],
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

        /////////////////////

        case MessagesActions.SEND_EMAIL_START:
            return {
                ...state,
                sending: true,
                sent: false,
                errors: null,
            };
        case MessagesActions.SEND_EMAIL_SUCCESS:
            return {
                ...state,
                sending: false,
                sent: true,
                emailMessages: [...state.emailMessages, action.payload]
            };
        case MessagesActions.SEND_EMAIL_FAIL:
            return {
                ...state,
                sending: false,
                errors: [...action.payload],
            };

        /////////////////////

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

        /////////////////////

        case MessagesActions.FETCH_EMAILS_START:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            };
        case MessagesActions.FETCH_EMAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                emailMessages: [...action.payload]
            };
        case MessagesActions.FETCH_EMAILS_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        ///////////////////

        case MessagesActions.DELETE_START:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case MessagesActions.DELETE_SUCCESS:
            const msgToDeleteIndex = state.messages.findIndex(m => m.id === action.payload);
            const messagesAfterDelete = [...state.messages];
            messagesAfterDelete.splice(msgToDeleteIndex, 1);

            return {
                ...state,
                loading: false,
                messages: messagesAfterDelete
            };
        case MessagesActions.DELETE_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        /////////////////////////

        case MessagesActions.CHANGE_SEEN_START:
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case MessagesActions.CHANGE_SEEN_SUCCESS:
            const msgToChangeIndex = state.messages.findIndex(m => m.id === action.payload.id);
            const msgToChange = state.messages.find(m => m.id === action.payload.id);
            const messagesAfterChange = [...state.messages];

            const changedMessage = {
                ...msgToChange,
                isSeen: action.payload.isSeen,
                seenDateTime: action.payload.seenDateTime
            };

            messagesAfterChange[msgToChangeIndex] = changedMessage;

            return {
                ...state,
                loading: false,
                messages: messagesAfterChange
            };
        case MessagesActions.CHANGE_SEEN_FAIL:
            return {
                ...state,
                loading: false,
                errors: [...action.payload],
            };

        /////////////////////////

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
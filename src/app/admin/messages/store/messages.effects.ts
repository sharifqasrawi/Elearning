import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Message } from './../../../models/message.model';
import { EmailMessage } from './../../../models/emailMessage.model';
import * as MessagesActions from './messages.actions';
import * as fromApp from '../../../store/app.reducer';

import { environment } from './../../../../environments/environment';

@Injectable()
export class MessagesEffects {

    token = '';

    @Effect()
    fetchMessages = this.actions$.pipe(
        ofType(MessagesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ messages: Message[] }>(environment.API_BASE_URL + 'messages',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new MessagesActions.FetchSuccess(resData.messages)
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new MessagesActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MessagesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.FetchFail(['Error fetching messages']));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchEmails = this.actions$.pipe(
        ofType(MessagesActions.FETCH_EMAILS_START),
        switchMap(() => {
            return this.http.get<{ emailMessages: EmailMessage[] }>(environment.API_BASE_URL + 'messages/sent-emails',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new MessagesActions.FetchEmailsSuccess(resData.emailMessages)
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.FetchEmailsFail(['Access Denied']));
                            case 404:
                                return of(new MessagesActions.FetchEmailsFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MessagesActions.FetchEmailsFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.FetchEmailsFail(['Error fetching emails']));
                        }
                    })
                )
        })
    );

    @Effect()
    sendMessage = this.actions$.pipe(
        ofType(MessagesActions.SEND_START),
        switchMap((messageData: MessagesActions.SendStart) => {
            return this.http.post<Message>(environment.API_BASE_URL + 'messages/send',
                {
                    name: messageData.payload.name,
                    email: messageData.payload.email,
                    subject: messageData.payload.subject,
                    text: messageData.payload.text
                })
                .pipe(
                    map(resData => {
                        return new MessagesActions.SendSuccess(resData);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.SendFail(['Access Denied']));
                            case 404:
                                return of(new MessagesActions.SendFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MessagesActions.SendFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.SendFail(['Error sending message']));
                        }
                    })
                )
        })
    );

    @Effect()
    sendEmail = this.actions$.pipe(
        ofType(MessagesActions.SEND_EMAIL_START),
        switchMap((messageData: MessagesActions.SendEmailStart) => {
            return this.http.post<{emailMessage: EmailMessage}>(environment.API_BASE_URL + 'messages/send-email',
                {
                    emails: messageData.payload.emails,
                    subject: messageData.payload.subject,
                    message: messageData.payload.text
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new MessagesActions.SendEmailSuccess(resData.emailMessage);
                    }),
                    catchError(errorRes => {
                        console.log(errorRes);
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.SendEmailFail(['Access Denied']));
                            case 404:
                                return of(new MessagesActions.SendEmailFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MessagesActions.SendEmailFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.SendEmailFail(['Error sending email']));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteMessage = this.actions$.pipe(
        ofType(MessagesActions.DELETE_START),
        switchMap((messageData: MessagesActions.DeleteStart) => {
            return this.http.delete<{ deletedMsgId: number }>(environment.API_BASE_URL + 'messages/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('msgId', messageData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new MessagesActions.DeleteSuccess(resData.deletedMsgId);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.DeleteFail(['Access Denied']));
                            case 404:
                                return of(new MessagesActions.DeleteFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MessagesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.DeleteFail(['Error deleting message']));
                        }
                    })
                )
        })
    );

    @Effect()
    changeSeen = this.actions$.pipe(
        ofType(MessagesActions.CHANGE_SEEN_START),
        switchMap((messageData: MessagesActions.ChangeSeenStart) => {
            return this.http.put<{ updatedMessage: Message }>(environment.API_BASE_URL + 'messages/change-seen', null,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('msgId', messageData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new MessagesActions.ChangeSeenSuccess(resData.updatedMessage);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.ChangeSeenFail(['Access Denied']));
                            case 404:
                                return of(new MessagesActions.ChangeSeenFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MessagesActions.ChangeSeenFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.ChangeSeenFail(['Error changing message status']));
                        }
                    })
                )
        })
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {
        this.store.select('login')
            .pipe(
                map(authState => authState.user)
            )
            .subscribe(user => {
                if (user)
                    this.token = user.token;
            });
    }
}
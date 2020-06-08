import { TranslateService } from '@ngx-translate/core';
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
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MessagesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new MessagesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.FetchFail([this.errorOccured]));
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.FetchEmailsFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MessagesActions.FetchEmailsFail([this.error404]));
                            case 400:
                                return of(new MessagesActions.FetchEmailsFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.FetchEmailsFail([this.errorOccured]));
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.SendFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MessagesActions.SendFail([this.error404]));
                            case 400:
                                return of(new MessagesActions.SendFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.SendFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    sendEmail = this.actions$.pipe(
        ofType(MessagesActions.SEND_EMAIL_START),
        switchMap((messageData: MessagesActions.SendEmailStart) => {
            return this.http.post<{ emailMessage: EmailMessage }>(environment.API_BASE_URL + 'messages/send-email',
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.SendEmailFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MessagesActions.SendEmailFail([this.error404]));
                            case 400:
                                return of(new MessagesActions.SendEmailFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.SendEmailFail([this.errorOccured]));
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MessagesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new MessagesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.DeleteFail([this.errorOccured]));
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MessagesActions.ChangeSeenFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MessagesActions.ChangeSeenFail([this.error404]));
                            case 400:
                                return of(new MessagesActions.ChangeSeenFail(errorRes.error.errors));
                            default:
                                return of(new MessagesActions.ChangeSeenFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
        private translate: TranslateService
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
    private getErrorsTranslations() {
        this.translate.get(['ERRORS.ACCESS_DENIED', 'ERRORS.ERROR404', 'ERRORS.OOPS']).subscribe(trans => {
            this.errorAccessDenied = trans['ERRORS.ACCESS_DENIED'];
            this.error404 = trans['ERRORS.ERROR404'];
            this.errorOccured = trans['ERRORS.OOPS'];
        });
    }
}
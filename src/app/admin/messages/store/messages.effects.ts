import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Message } from './../../../models/message.model';
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
                                return of(new MessagesActions.FetchFail(['Error sending message']));
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
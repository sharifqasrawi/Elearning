import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from './../../../../environments/environment.prod';

import { Notification } from './../../../models/notification.model';
import * as fromApp from '../../../store/app.reducer';
import * as NotificationsActions from './notifications.actions';

@Injectable()
export class NotificationsEffects {

    token = '';

    @Effect()
    fetchNotifications = this.actions$.pipe(
        ofType(NotificationsActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ notifications: Notification[] }>(environment.API_BASE_URL + 'notifications',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new NotificationsActions.FetchSuccess(resData.notifications);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new NotificationsActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new NotificationsActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new NotificationsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new NotificationsActions.FetchFail(['Oops! An error occured']));
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
import { TranslateService } from '@ngx-translate/core';
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

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchNotifications = this.actions$.pipe(
        ofType(NotificationsActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ notifications: Notification[] }>(environment.API_BASE_URL + 'notifications',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new NotificationsActions.FetchSuccess(resData.notifications);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new NotificationsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new NotificationsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new NotificationsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new NotificationsActions.FetchFail([this.errorOccured]));
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
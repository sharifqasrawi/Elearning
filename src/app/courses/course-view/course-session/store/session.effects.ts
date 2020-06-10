import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../../environments/environment';

import * as fromApp from '../../../../store/app.reducer';
import * as HomeSessionActions from './session.actions';
import { Session } from './../../../../models/session.model';

@Injectable()
export class HomeSessionEffects {

    token = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchSession = this.actions$.pipe(
        ofType(HomeSessionActions.FETCH_START),
        switchMap((sessionData: HomeSessionActions.FetchStart) => {

            return this.http.get<{ session: Session }>(environment.API_BASE_URL + 'home/course-session',
                {
                    headers: new HttpHeaders().append('language', this.translate.currentLang),
                    params: new HttpParams().set('sessionId', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeSessionActions.FetchSuccess(resData.session);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeSessionActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeSessionActions.FetchFail([this.error404]));
                            case 400:
                                return of(new HomeSessionActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeSessionActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    setCurrentSession = this.actions$.pipe(
        ofType(HomeSessionActions.SET_CURRENT_SESSION_START),
        switchMap((sessionData: HomeSessionActions.SetCurrentSessionStart) => {

            return this.http.put<boolean>(environment.API_BASE_URL + 'classes/set-current-session',
                {
                    classId: sessionData.payload.classId,
                    currentSessionId: sessionData.payload.sessionId,
                    userId: this.userId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new HomeSessionActions.SetCurrentSessionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeSessionActions.SetCurrentSessionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeSessionActions.SetCurrentSessionFail([this.error404]));
                            case 400:
                                return of(new HomeSessionActions.SetCurrentSessionFail(errorRes.error.errors));
                            default:
                                return of(new HomeSessionActions.SetCurrentSessionFail([this.errorOccured]));
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
                if (user) {
                    this.token = user.token;
                    this.userId = user.id;
                }
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
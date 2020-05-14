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

    @Effect()
    fetchSession = this.actions$.pipe(
        ofType(HomeSessionActions.FETCH_START),
        switchMap((sessionData: HomeSessionActions.FetchStart) => {

            return this.http.get<{ session: Session }>(environment.API_BASE_URL + 'home/course-session',
                {
                    params: new HttpParams().set('sessionId', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeSessionActions.FetchSuccess(resData.session);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeSessionActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new HomeSessionActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeSessionActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeSessionActions.FetchFail(['Oops! An error occured']));
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
                })
                .pipe(
                    map(resData => {
                        return new HomeSessionActions.SetCurrentSessionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeSessionActions.SetCurrentSessionFail(['Access Denied']));
                            case 404:
                                return of(new HomeSessionActions.SetCurrentSessionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeSessionActions.SetCurrentSessionFail(errorRes.error.errors));
                            default:
                                return of(new HomeSessionActions.SetCurrentSessionFail(['Oops! An error occured']));
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
            if (user) {
                this.token = user.token;
                this.userId = user.id;
            }
        });
    }
}
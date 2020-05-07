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

    @Effect()
    fetchCourses = this.actions$.pipe(
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

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import * as fromApp from '../../store/app.reducer';

import * as AppSettionsActions from './app-settings.actions';
import { AppRating } from 'src/app/models/appRating.model';

@Injectable()
export class AppSettingsEffects {

    token = '';
    userName = '';
    userId = '';

    @Effect()
    rateApp = this.actions$.pipe(
        ofType(AppSettionsActions.RATE_START),
        switchMap((rateData: AppSettionsActions.RateStart) => {
            return this.http.post<{ ratings: { total: number, ratings: AppRating[] } }>(environment.API_BASE_URL + 'AppRatings',
                {
                    userId: this.userId,
                    value: rateData.payload
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new AppSettionsActions.RateSuccess(resData);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new AppSettionsActions.RateFail(['Access Denied']));
                            case 404:
                                return of(new AppSettionsActions.RateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new AppSettionsActions.RateFail(errorRes.error.errors));
                            default:
                                return of(new AppSettionsActions.RateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchRateApp = this.actions$.pipe(
        ofType(AppSettionsActions.FETCH_RATE_START),
        switchMap(() => {
            return this.http.get<{ ratings: { total: number, ratings: AppRating[] } }>(environment.API_BASE_URL + 'AppRatings')
                .pipe(
                    map(resData => {
                        return new AppSettionsActions.FetchRateSuccess(resData);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new AppSettionsActions.FetchRateFail(['Access Denied']));
                            case 404:
                                return of(new AppSettionsActions.FetchRateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new AppSettionsActions.FetchRateFail(errorRes.error.errors));
                            default:
                                return of(new AppSettionsActions.FetchRateFail(['Oops! An error occured']));
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
                    this.userName = user.firstName + ' ' + user.lastName;
                    this.userId = user.id;
                }
            });
    }
}
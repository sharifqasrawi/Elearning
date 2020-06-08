import { TranslateService } from '@ngx-translate/core';
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

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new AppSettionsActions.RateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new AppSettionsActions.RateFail([this.error404]));
                            case 400:
                                return of(new AppSettionsActions.RateFail(errorRes.error.errors));
                            default:
                                return of(new AppSettionsActions.RateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchRateApp = this.actions$.pipe(
        ofType(AppSettionsActions.FETCH_RATE_START),
        switchMap(() => {
            return this.http.get<{ ratings: { total: number, ratings: AppRating[] } }>(environment.API_BASE_URL + 'AppRatings',
                {
                    params: this.userId ? new HttpParams().set('userId', this.userId) : null,
                })
                .pipe(
                    map(resData => {
                        return new AppSettionsActions.FetchRateSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new AppSettionsActions.FetchRateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new AppSettionsActions.FetchRateFail([this.error404]));
                            case 400:
                                return of(new AppSettionsActions.FetchRateFail(errorRes.error.errors));
                            default:
                                return of(new AppSettionsActions.FetchRateFail([this.errorOccured]));
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
                    this.userName = user.firstName + ' ' + user.lastName;
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
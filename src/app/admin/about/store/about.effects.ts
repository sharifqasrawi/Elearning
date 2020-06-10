import { TranslateService } from '@ngx-translate/core';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';
import * as AboutActions from './about.actions';
import { About } from './../../../models/about.model';
import { of } from 'rxjs';


@Injectable()
export class AboutEffects {

    token = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchAbout = this.actions$.pipe(
        ofType(AboutActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ about: About }>(environment.API_BASE_URL + 'about',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new AboutActions.FetchSuccess(resData.about);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new AboutActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new AboutActions.FetchFail([this.error404]));
                            case 400:
                                return of(new AboutActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new AboutActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateAbout = this.actions$.pipe(
        ofType(AboutActions.UPDATE_START),
        switchMap((aboutData: AboutActions.UpdateStart) => {
            return this.http.put<{ about: About }>(environment.API_BASE_URL + 'about',
                {
                    name: aboutData.payload.name,
                    imagePath: aboutData.payload.imagePath,
                    info: aboutData.payload.info,
                    info_FR: aboutData.payload.info_FR,
                    title:aboutData.payload.title,
                    title_FR:aboutData.payload.title_FR,
                    email1: aboutData.payload.email1,
                    email2: aboutData.payload.email2,
                    phoneNumber: aboutData.payload.phoneNumber,
                    website: aboutData.payload.website
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new AboutActions.UpdateSuccess(resData.about);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new AboutActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new AboutActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new AboutActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new AboutActions.UpdateFail([this.errorOccured]));
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
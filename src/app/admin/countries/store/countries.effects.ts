import { TranslateService } from '@ngx-translate/core';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';
import * as CountriesActions from './countries.actions';
import { Country } from './../../../models/country.model';
import { of } from 'rxjs';


@Injectable()
export class CountriesEffects {

    token = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchCountries = this.actions$.pipe(
        ofType(CountriesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ countries: Country[] }>(environment.API_BASE_URL + 'countries',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CountriesActions.FetchSuccess(resData.countries);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CountriesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CountriesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new CountriesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new CountriesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );



    @Effect()
    createCountry = this.actions$.pipe(
        ofType(CountriesActions.CREATE_START),
        switchMap((catData: CountriesActions.CreateStart) => {
            return this.http.post<{ createdCountry: Country }>(environment.API_BASE_URL + 'countries',
                {
                    name_EN: catData.payload.name_EN,
                    name_FR: catData.payload.name_FR ?? null,
                    flagPath: catData.payload.flagPath,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CountriesActions.CreateSuccess(resData.createdCountry);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CountriesActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CountriesActions.CreateFail([this.error404]));
                            case 400:
                                return of(new CountriesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new CountriesActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateCountry = this.actions$.pipe(
        ofType(CountriesActions.UPDATE_START),
        switchMap((catData: CountriesActions.UpdateStart) => {
            return this.http.put<{ updatedCountry: Country }>(environment.API_BASE_URL + 'countries',
                {
                    id: catData.payload.id,
                    name_EN: catData.payload.name_EN,
                    name_FR: catData.payload.name_FR ?? null,
                    flagPath: catData.payload.flagPath,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CountriesActions.UpdateSuccess(resData.updatedCountry);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CountriesActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CountriesActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new CountriesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new CountriesActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    deleteCountry = this.actions$.pipe(
        ofType(CountriesActions.DELETE_START),
        switchMap((catData: CountriesActions.DeleteStart) => {
            return this.http.delete<{ deletedCountryId: number }>(environment.API_BASE_URL + 'countries',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('countryId', catData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new CountriesActions.DeleteSuccess(resData.deletedCountryId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CountriesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CountriesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new CountriesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new CountriesActions.DeleteFail([this.errorOccured]));
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
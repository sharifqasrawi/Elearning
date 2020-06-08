import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromApp from '../../../store/app.reducer';
import * as DirectoriesActions from './directories.actions';
import { Directory } from './../../../models/directory.model';

import { environment } from './../../../../environments/environment';

@Injectable()
export class DirectoriesEffects {

    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchDirectories = this.actions$.pipe(
        ofType(DirectoriesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ directories: Directory[] }>(environment.API_BASE_URL + 'directories',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new DirectoriesActions.FetchSuccess(resData.directories);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new DirectoriesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new DirectoriesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchPhysicalDirectories = this.actions$.pipe(
        ofType(DirectoriesActions.FETCH_PHYSICAL_START),
        switchMap((dirData: DirectoriesActions.FetchPhysicalStart) => {
            return this.http.get<{ physical_directories: Directory[] }>(environment.API_BASE_URL + 'directories/physical',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('path', dirData.payload)
                })
                .pipe(
                    map(resData => {
                        return new DirectoriesActions.FetchPhysicalSuccess(resData.physical_directories);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.FetchPhysicalFail([this.errorAccessDenied]));
                            case 404:
                                return of(new DirectoriesActions.FetchPhysicalFail([this.error404]));
                            case 400:
                                return of(new DirectoriesActions.FetchPhysicalFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.FetchPhysicalFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createDirectory = this.actions$.pipe(
        ofType(DirectoriesActions.CREATE_START),
        switchMap((dirData: DirectoriesActions.CreateStart) => {
            return this.http.post<{ directory: Directory }>(environment.API_BASE_URL + 'directories/create',
                {
                    name: dirData.payload.name,
                    path: dirData.payload.path
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new DirectoriesActions.CreateSuccess(resData.directory);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new DirectoriesActions.CreateFail([this.error404]));
                            case 400:
                                return of(new DirectoriesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteDirectory = this.actions$.pipe(
        ofType(DirectoriesActions.DELETE_START),
        switchMap((dirData: DirectoriesActions.DeleteStart) => {
            return this.http.delete<{ deletedDirId: number }>(environment.API_BASE_URL + 'directories/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('dirId', dirData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new DirectoriesActions.DeleteSuccess(resData.deletedDirId);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new DirectoriesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new DirectoriesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.DeleteFail([this.errorOccured]));
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
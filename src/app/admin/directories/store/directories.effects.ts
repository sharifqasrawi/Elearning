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
                        console.log(errorRes);
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new DirectoriesActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new DirectoriesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.FetchFail(['Oops! An error occured']));
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
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.FetchPhysicalFail(['Access Denied']));
                            case 404:
                                return of(new DirectoriesActions.FetchPhysicalFail(['Error 404. Not Found']));
                            case 400:
                                return of(new DirectoriesActions.FetchPhysicalFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.FetchPhysicalFail(['Oops! An error occured']));
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

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.CreateFail(['Access Denied']));
                            case 404:
                                return of(new DirectoriesActions.CreateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new DirectoriesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.CreateFail(['Oops! An error occured']));
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

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new DirectoriesActions.DeleteFail(['Access Denied']));
                            case 404:
                                return of(new DirectoriesActions.DeleteFail(['Error 404. Not Found']));
                            case 400:
                                return of(new DirectoriesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new DirectoriesActions.DeleteFail(['Oops! An error occured']));
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
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as FilesActions from './files.actions';
import * as fromApp from '../../../store/app.reducer';

import { UploadedFile } from './../../../models/uploadedFile.model';
import { environment } from './../../../../environments/environment';

@Injectable()
export class FilesEffects {
    token = '';
    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchFiles = this.actions$.pipe(
        ofType(FilesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ uploadedFiles: UploadedFile[] }>(environment.API_BASE_URL + 'files',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new FilesActions.FetchSuccess(resData.uploadedFiles);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new FilesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new FilesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new FilesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new FilesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteFile = this.actions$.pipe(
        ofType(FilesActions.DELETE_START),
        switchMap((fileData: FilesActions.DeleteStart) => {

            return this.http.delete<{ deletedFileId: number }>(environment.API_BASE_URL + 'files/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('fileId', fileData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new FilesActions.DeleteSuccess(resData.deletedFileId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new FilesActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new FilesActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new FilesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new FilesActions.DeleteFail([this.errorOccured]));
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
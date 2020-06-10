import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { Tag } from './../../../models/tag.model';

import * as fromApp from '../../../store/app.reducer';
import * as TagsActions from '../store/tags.actions';
import { environment } from './../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TagsEffects {
    token = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchTags = this.actions$.pipe(
        ofType(TagsActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ tags: Tag[] }>(environment.API_BASE_URL + 'tags',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new TagsActions.FetchSuccess(resData.tags);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TagsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TagsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new TagsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new TagsActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createTag = this.actions$.pipe(
        ofType(TagsActions.CREATE_START),
        switchMap((tagData: TagsActions.CreateStart) => {
            return this.http.post<{ createdTag: Tag }>(environment.API_BASE_URL + 'tags/create',
                {
                    name: tagData.payload
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new TagsActions.CreateSuccess(resData.createdTag);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TagsActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TagsActions.CreateFail([this.error404]));
                            case 400:
                                return of(new TagsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new TagsActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateTag = this.actions$.pipe(
        ofType(TagsActions.UPDATE_START),
        switchMap((tagData: TagsActions.UpdateStart) => {
            return this.http.put<{ updatedTag: Tag }>(environment.API_BASE_URL + 'tags/update',
                {
                    id: tagData.payload.id,
                    name: tagData.payload.name
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new TagsActions.UpdateSuccess(resData.updatedTag);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TagsActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TagsActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new TagsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new TagsActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    deleteTag = this.actions$.pipe(
        ofType(TagsActions.DELETE_START),
        switchMap((tagData: TagsActions.DeleteStart) => {
            return this.http.delete<{ deletedTagId: number }>(environment.API_BASE_URL + 'tags/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('id', tagData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new TagsActions.DeleteSuccess(resData.deletedTagId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new TagsActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new TagsActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new TagsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new TagsActions.DeleteFail([this.errorOccured]));
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
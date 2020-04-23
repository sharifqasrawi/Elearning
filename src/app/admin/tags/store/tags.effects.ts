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

@Injectable()
export class TagsEffects {
    token = '';

    @Effect()
    fetchTags = this.actions$.pipe(
        ofType(TagsActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ tags: Tag[] }>(environment.API_BASE_URL + 'tags',
            {
                headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.token)
            })
            .pipe(
                map(resData => {
                    return new TagsActions.FetchSuccess(resData.tags);
                }),
                catchError(errorRes => {
                    switch (errorRes.status) {
                        case 403:
                        case 401:
                            return of(new TagsActions.FetchFail(['Access Denied']));
                        case 404:
                            return of(new TagsActions.FetchFail(['Error 404. Not Found']));
                        case 400:
                            return of(new TagsActions.FetchFail(errorRes.error.errors));
                        default:
                            return of(new TagsActions.FetchFail(['Oops! An error occured']));
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
                headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.token)
            })
            .pipe(
                map(resData => {
                    return new TagsActions.CreateSuccess(resData.createdTag);
                }),
                catchError(errorRes => {
                    switch (errorRes.status) {
                        case 403:
                        case 401:
                            return of(new TagsActions.CreateFail(['Access Denied']));
                        case 404:
                            return of(new TagsActions.CreateFail(['Error 404. Not Found']));
                        case 400:
                            return of(new TagsActions.CreateFail(errorRes.error.errors));
                        default:
                            return of(new TagsActions.CreateFail(['Oops! An error occured']));
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
                headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.token)
            })
            .pipe(
                map(resData => {
                    return new TagsActions.UpdateSuccess(resData.updatedTag);
                }),
                catchError(errorRes => {
                    switch (errorRes.status) {
                        case 403:
                        case 401:
                            return of(new TagsActions.UpdateFail(['Access Denied']));
                        case 404:
                            return of(new TagsActions.UpdateFail(['Error 404. Not Found']));
                        case 400:
                            return of(new TagsActions.UpdateFail(errorRes.error.errors));
                        default:
                            return of(new TagsActions.UpdateFail(['Oops! An error occured']));
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
                headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.token),
                params: new HttpParams().set('id', tagData.payload.toString())
            })
            .pipe(
                map(resData => {
                    return new TagsActions.DeleteSuccess(resData.deletedTagId);
                }),
                catchError(errorRes => {
                    switch (errorRes.status) {
                        case 403:
                        case 401:
                            return of(new TagsActions.DeleteFail(['Access Denied']));
                        case 404:
                            return of(new TagsActions.DeleteFail(['Error 404. Not Found']));
                        case 400:
                            return of(new TagsActions.DeleteFail(errorRes.error.errors));
                        default:
                            return of(new TagsActions.DeleteFail(['Oops! An error occured']));
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
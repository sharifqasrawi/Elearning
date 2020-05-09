import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from './../../../../../environments/environment.prod';

import { Comment } from './../../../../models/comment.model';

import * as fromApp from '../../../../store/app.reducer';
import * as HomeCommentsActions from './comments.actions';


@Injectable()
export class HomeCommentsEffects {

    token = '';
    userName = '';
    userId = '';


    @Effect()
    fetchComments = this.actions$.pipe(
        ofType(HomeCommentsActions.FETCH_START),
        switchMap((commentData: HomeCommentsActions.FetchStart) => {

            return this.http.get<{ comments: Comment[] }>(environment.API_BASE_URL + 'comments',
                {
                    params: new HttpParams().set('courseId', commentData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.FetchSuccess(resData.comments);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new HomeCommentsActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeCommentsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.FetchFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    createComment = this.actions$.pipe(
        ofType(HomeCommentsActions.CREATE_START),
        switchMap((commentData: HomeCommentsActions.CreateStart) => {
            return this.http.post<{ createdComment: Comment }>(environment.API_BASE_URL + 'comments',
                {
                    courseId: commentData.payload.courseId,
                    userId: this.userId,
                    text: commentData.payload.text,
                    commentId: commentData.payload.commentId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('courseId', commentData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.CreateSuccess(resData.createdComment);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.CreateFail(['Access Denied']));
                            case 404:
                                return of(new HomeCommentsActions.CreateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeCommentsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.CreateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    updateComment = this.actions$.pipe(
        ofType(HomeCommentsActions.UPDATE_START),
        switchMap((commentData: HomeCommentsActions.UpdateStart) => {
            return this.http.put<{ updatedComment: Comment }>(environment.API_BASE_URL + 'comments',
                {
                    id: commentData.payload.id,
                    text: commentData.payload.text,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.UpdateSuccess(resData.updatedComment);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.UpdateFail(['Access Denied']));
                            case 404:
                                return of(new HomeCommentsActions.UpdateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeCommentsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.UpdateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteComment = this.actions$.pipe(
        ofType(HomeCommentsActions.DELETE_START),
        switchMap((commentData: HomeCommentsActions.DeleteStart) => {

            return this.http.delete<{ deletedComment: Comment }>(environment.API_BASE_URL + 'comments',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('id', commentData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.DeleteSuccess(resData.deletedComment);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.DeleteFail(['Access Denied']));
                            case 404:
                                return of(new HomeCommentsActions.DeleteFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeCommentsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.DeleteFail(['Oops! An error occured']));
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
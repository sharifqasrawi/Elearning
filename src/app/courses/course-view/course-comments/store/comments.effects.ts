import { TranslateService } from '@ngx-translate/core';
import { Course } from './../../../../models/course.model';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from './../../../../../environments/environment';

import { Comment } from './../../../../models/comment.model';

import * as fromApp from '../../../../store/app.reducer';
import * as HomeCommentsActions from './comments.actions';


@Injectable()
export class HomeCommentsEffects {

    token = '';
    userName = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchComments = this.actions$.pipe(
        ofType(HomeCommentsActions.FETCH_START),
        switchMap((commentData: HomeCommentsActions.FetchStart) => {

            return this.http.get<{ comments: Comment[] }>(environment.API_BASE_URL + 'comments',
                {
                    headers: new HttpHeaders().append('language', this.translate.currentLang),
                    params: new HttpParams().set('courseId', commentData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.FetchSuccess(resData.comments);
                    }),
                    catchError(errorRes => {
                        // console.log(errorRes);
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCommentsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new HomeCommentsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.FetchFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('courseId', commentData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.CreateSuccess(resData.createdComment);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCommentsActions.CreateFail([this.error404]));
                            case 400:
                                return of(new HomeCommentsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.CreateFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.UpdateSuccess(resData.updatedComment);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCommentsActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new HomeCommentsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.UpdateFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('id', commentData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.DeleteSuccess(resData.deletedComment);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCommentsActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new HomeCommentsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.DeleteFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    likeComment = this.actions$.pipe(
        ofType(HomeCommentsActions.LIKE_START),
        switchMap((likeData: HomeCommentsActions.LikeStart) => {
            return this.http.post<{ comment: Comment }>(environment.API_BASE_URL + 'likes/like-comment',
                {
                    commentId: likeData.payload.commentId,
                    userId: this.userId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('action', likeData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new HomeCommentsActions.LikeSuccess(resData.comment);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCommentsActions.LikeFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCommentsActions.LikeFail([this.error404]));
                            case 400:
                                return of(new HomeCommentsActions.LikeFail(errorRes.error.errors));
                            default:
                                return of(new HomeCommentsActions.LikeFail([this.errorOccured]));
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
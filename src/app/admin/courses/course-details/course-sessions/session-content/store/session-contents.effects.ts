import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../../../../environments/environment';

import * as fromApp from '../../../../../../store/app.reducer';
import * as SessionContentsActions from './session-contents.actions';
import { SessionContent } from './../../../../../../models/sessionContent.model';

@Injectable()
export class SessionContentsEffects {

    token = '';
    userName = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchSessionContents = this.actions$.pipe(
        ofType(SessionContentsActions.FETCH_START),
        switchMap((sessionData: SessionContentsActions.FetchStart) => {
            return this.http.get<{ contents: SessionContent[] }>(environment.API_BASE_URL + 'sessions/contents',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('sessionId', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new SessionContentsActions.FetchSuccess(resData.contents);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionContentsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionContentsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new SessionContentsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new SessionContentsActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createSessionContent = this.actions$.pipe(
        ofType(SessionContentsActions.CREATE_START),
        switchMap((sessionData: SessionContentsActions.CreateStart) => {
            return this.http.post<{ createdContent: SessionContent }>(environment.API_BASE_URL + 'sessions/create-content',
                {
                    sessionId: sessionData.payload.sessionId,
                    order: sessionData.payload.order,
                    type: sessionData.payload.type,
                    content: sessionData.payload.content,
                    content_FR: sessionData.payload.content_FR,
                    note: sessionData.payload.note
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new SessionContentsActions.CreateSuccess(resData.createdContent);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionContentsActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionContentsActions.CreateFail([this.error404]));
                            case 400:
                                return of(new SessionContentsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new SessionContentsActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateSessionContent = this.actions$.pipe(
        ofType(SessionContentsActions.UPDATE_START),
        switchMap((sessionData: SessionContentsActions.UpdateStart) => {
            return this.http.put<{ updatedSessionContent: SessionContent, updatedOldSessionContent: SessionContent }>(environment.API_BASE_URL + 'sessions/update-content',
                {
                    id: sessionData.payload.id,
                    sessionId: sessionData.payload.sessionId,
                    order: sessionData.payload.order,
                    type: sessionData.payload.type,
                    content: sessionData.payload.content,
                    content_FR: sessionData.payload.content_FR,
                    note: sessionData.payload.note
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new SessionContentsActions.UpdateSuccess({
                            updatedSessionContent: resData.updatedSessionContent,
                            updatedOldSessionContent: resData.updatedOldSessionContent
                        });
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionContentsActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionContentsActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new SessionContentsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new SessionContentsActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteSessionContent = this.actions$.pipe(
        ofType(SessionContentsActions.DELETE_START),
        switchMap((sessionData: SessionContentsActions.DeleteStart) => {
            return this.http.delete<{ deletedSessionContentId: number }>(environment.API_BASE_URL + 'sessions/delete-content',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('contentId', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new SessionContentsActions.DeleteSuccess(resData.deletedSessionContentId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionContentsActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionContentsActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new SessionContentsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new SessionContentsActions.DeleteFail([this.errorOccured]));
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
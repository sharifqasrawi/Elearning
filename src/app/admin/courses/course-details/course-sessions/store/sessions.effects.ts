import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../../../environments/environment';

import * as fromApp from '../../../../../store/app.reducer';
import * as SessionsActions from './sessions.actions';
import { Session } from './../../../../../models/session.model';

@Injectable()
export class SessionsEffects {

    token = '';
    userName = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    //// Sessions

    @Effect()
    fetchSessions = this.actions$.pipe(
        ofType(SessionsActions.FETCH_START),
        switchMap((sectionData: SessionsActions.FetchStart) => {
            return this.http.get<{ sessions: Session[] }>(environment.API_BASE_URL + 'sessions',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('sectionId', sectionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new SessionsActions.FetchSuccess(resData.sessions);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new SessionsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new SessionsActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createSession = this.actions$.pipe(
        ofType(SessionsActions.CREATE_START),
        switchMap((sessionData: SessionsActions.CreateStart) => {
            return this.http.post<{ createdSession: Session }>(environment.API_BASE_URL + 'sessions/create-session',
                {
                    section: {
                        id: sessionData.payload.section.id,
                        course: {
                            id: sessionData.payload.section.course.id
                        }
                    },
                    title_EN: sessionData.payload.title_EN,
                    title_FR: sessionData.payload.title_FR,
                    order: sessionData.payload.order,
                    duration: sessionData.payload.duration,
                    createdBy: this.userName,
                    updatedBy: this.userName
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                })
                .pipe(
                    map(resData => {
                        return new SessionsActions.CreateSuccess(resData.createdSession);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionsActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionsActions.CreateFail([this.error404]));
                            case 400:
                                return of(new SessionsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new SessionsActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    updateSession = this.actions$.pipe(
        ofType(SessionsActions.UPDATE_START),
        switchMap((sessionData: SessionsActions.UpdateStart) => {

            return this.http.put<{ updatedSession: Session, updatedOldSession: Session }>(environment.API_BASE_URL + 'sessions/update-session',
                {
                    id: sessionData.payload.id,
                    section: {
                        id: sessionData.payload.section.id,
                        course: {
                            id: sessionData.payload.section.course.id
                        }
                    },
                    title_EN: sessionData.payload.title_EN,
                    title_FR: sessionData.payload.title_FR,
                    order: sessionData.payload.order,
                    duration: sessionData.payload.duration,
                    updatedBy: this.userName
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                })
                .pipe(
                    map(resData => {
                        return new SessionsActions.UpdateSuccess({
                            updatedSession: resData.updatedSession,
                            updatedOldSession: resData.updatedOldSession
                        });
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionsActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionsActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new SessionsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new SessionsActions.UpdateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteSession = this.actions$.pipe(
        ofType(SessionsActions.DELETE_START),
        switchMap((sessionData: SessionsActions.DeleteStart) => {
            return this.http.delete<{ deletedSessionId: number }>(environment.API_BASE_URL + 'sessions/delete-session',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('sessionId', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new SessionsActions.DeleteSuccess(resData.deletedSessionId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SessionsActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SessionsActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new SessionsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new SessionsActions.DeleteFail([this.errorOccured]));
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
import { TranslateService } from '@ngx-translate/core';
import { UserQuiz } from './../../models/userQuiz.model';
import { DoneSession } from './../../models/doneSession.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as MemberActions from './member.actions';
import { Course } from './../../models/course.model';
import { SavedSession } from './../../models/savedSession.model';
import { Favorite } from './../../models/favorite.model';

@Injectable()
export class MemberEffects {

    token = '';
    userName = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchCourses = this.actions$.pipe(
        ofType(MemberActions.FETCH_COURSES_START),
        switchMap(() => {

            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'member/courses',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchCoursesSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchCoursesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchCoursesFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchCoursesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchCoursesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchFavoriteCourses = this.actions$.pipe(
        ofType(MemberActions.FETCH_FAVORITE_COURSES_START),
        switchMap(() => {

            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'favorites/courses',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchCoursesSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchCoursesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchCoursesFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchCoursesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchCoursesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchFavorites = this.actions$.pipe(
        ofType(MemberActions.FETCH_FAVORITES_START),
        switchMap(() => {

            return this.http.get<{ favorites: Favorite[] }>(environment.API_BASE_URL + 'favorites',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchFavoritesSuccess(resData.favorites);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchFavoritesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchFavoritesFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchFavoritesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchFavoritesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    addCourseToFavorite = this.actions$.pipe(
        ofType(MemberActions.ADD_COURSE_TO_FAVORITES_START),
        switchMap((favData: MemberActions.AddCourseToFavoritesStart) => {

            return this.http.post<{ createdFavorite: Favorite }>(environment.API_BASE_URL + 'favorites/add-course',
                {
                    userId: this.userId,
                    courseId: favData.payload
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.AddCourseToFavoritesSuccess(resData.createdFavorite);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.AddCourseToFavoritesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.AddCourseToFavoritesFail([this.error404]));
                            case 400:
                                return of(new MemberActions.AddCourseToFavoritesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.AddCourseToFavoritesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    removeCourseFromFavorite = this.actions$.pipe(
        ofType(MemberActions.REMOVE_COURSE_FROM_FAVORITES_START),
        switchMap((favData: MemberActions.AddCourseToFavoritesStart) => {

            return this.http.delete<{ deletedFavoriteId: number }>(environment.API_BASE_URL + 'favorites/remove-course',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('id', favData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.RemoveCourseFromFavoritesSuccess(resData.deletedFavoriteId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail([this.error404]));
                            case 400:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchSavedSessions = this.actions$.pipe(
        ofType(MemberActions.FETCH_SAVED_SESSIONS_START),
        switchMap(() => {

            return this.http.get<{ savedSessions: SavedSession[] }>(environment.API_BASE_URL + 'SavedSessions',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchSavedSessionsSuccess(resData.savedSessions);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchSavedSessionsFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchSavedSessionsFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchSavedSessionsFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchSavedSessionsFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchUserSavedSessions = this.actions$.pipe(
        ofType(MemberActions.FETCH_USER_SAVED_SESSIONS_START),
        switchMap(() => {

            return this.http.get<{ sessions: SavedSession[] }>(environment.API_BASE_URL + 'SavedSessions/sessions',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchSavedSessionsSuccess(resData.sessions);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchSavedSessionsFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchSavedSessionsFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchSavedSessionsFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchSavedSessionsFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    saveSession = this.actions$.pipe(
        ofType(MemberActions.SAVE_SESSION_START),
        switchMap((sessionData: MemberActions.SaveSessionStart) => {

            return this.http.post<{ createdSavedSession: SavedSession }>(environment.API_BASE_URL + 'SavedSessions',
                {
                    userId: this.userId,
                    sessionId: sessionData.payload.sessionId,
                    sessionUrl: sessionData.payload.sessionUrl
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.SaveSessionSuccess(resData.createdSavedSession);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.SaveSessionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.SaveSessionFail([this.error404]));
                            case 400:
                                return of(new MemberActions.SaveSessionFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.SaveSessionFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    removeSession = this.actions$.pipe(
        ofType(MemberActions.REMOVE_SESSION_START),
        switchMap((sessionData: MemberActions.RemoveSessionStart) => {

            return this.http.delete<{ deletedSessionId: number }>(environment.API_BASE_URL + 'SavedSessions',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('id', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.RemoveSessionSuccess(resData.deletedSessionId);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.RemoveSessionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.RemoveSessionFail([this.error404]));
                            case 400:
                                return of(new MemberActions.RemoveSessionFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.RemoveSessionFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    markSession = this.actions$.pipe(
        ofType(MemberActions.MARK_SESSION_START),
        switchMap((sessionData: MemberActions.MarkSessionStart) => {

            return this.http.post<{ createdDoneSession: DoneSession, donePercentage: number }>(environment.API_BASE_URL + 'sessions/mark-session',
                {
                    userId: this.userId,
                    sessionId: sessionData.payload,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.MarkSessionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.MarkSessionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.MarkSessionFail([this.error404]));
                            case 400:
                                return of(new MemberActions.MarkSessionFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.MarkSessionFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    unmarkSession = this.actions$.pipe(
        ofType(MemberActions.UNMARK_SESSION_START),
        switchMap((sessionData: MemberActions.UnmarkSessionStart) => {

            return this.http.delete<{ deletedDoneSessionId: number, donePercentage: number }>(environment.API_BASE_URL + 'sessions/unmark-session',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('sessionId', sessionData.payload.toString())
                        .append('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.UnmarkSessionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.UnmarkSessionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.UnmarkSessionFail([this.error404]));
                            case 400:
                                return of(new MemberActions.UnmarkSessionFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.UnmarkSessionFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    fetchDoneSessions = this.actions$.pipe(
        ofType(MemberActions.FETCH_DONE_SESSIONS_START),
        switchMap((sessionData: MemberActions.FetchDoneSessionsStart) => {

            return this.http.get<{ doneSessions: DoneSession[], donePercentage: number }>(environment.API_BASE_URL + 'sessions/done',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                        .append('courseId', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchDoneSessionsSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchDoneSessionsFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchDoneSessionsFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchDoneSessionsFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchDoneSessionsFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchProgressCourses = this.actions$.pipe(
        ofType(MemberActions.FETCH_PROGRESS_COURSES_START),
        switchMap(() => {

            return this.http.get<{ memberCoursesProgress: { courseId: number, donePercentage: number }[] }>(environment.API_BASE_URL + 'sessions/courses-progress',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchProgressCoursesSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchProgressCoursesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchProgressCoursesFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchProgressCoursesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchProgressCoursesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchUserQuizzes = this.actions$.pipe(
        ofType(MemberActions.FETCH_USER_QUIZZES_START),
        switchMap(() => {

            return this.http.get<{ userQuizzes: UserQuiz[] }>(environment.API_BASE_URL + 'member/get-user-quizzes',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchUserQuizzesSuccess(resData.userQuizzes);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchUserQuizzesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchUserQuizzesFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchUserQuizzesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchUserQuizzesFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    fetchDashboardInfo = this.actions$.pipe(
        ofType(MemberActions.FETCH_DASHBOARD_INFO_START),
        switchMap(() => {

            return this.http.get<{ coursesCount: number, favoritesCount: number, savedSessionsCount: number, userQuizzesCount: number }>(environment.API_BASE_URL + 'member/dashboard',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchDashboardInfoSuccess(resData);
                    }),
                    catchError(errorRes => {
                        console.log(errorRes);
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchDashboardInfoFail([this.errorAccessDenied]));
                            case 404:
                                return of(new MemberActions.FetchDashboardInfoFail([this.error404]));
                            case 400:
                                return of(new MemberActions.FetchDashboardInfoFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchDashboardInfoFail([this.errorOccured]));
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
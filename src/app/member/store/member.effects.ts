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

    @Effect()
    fetchCourses = this.actions$.pipe(
        ofType(MemberActions.FETCH_COURSES_START),
        switchMap(() => {

            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'member/courses',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchCoursesSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchCoursesFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.FetchCoursesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.FetchCoursesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchCoursesFail(['Oops! An error occured']));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchCoursesSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchCoursesFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.FetchCoursesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.FetchCoursesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchCoursesFail(['Oops! An error occured']));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchFavoritesSuccess(resData.favorites);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchFavoritesFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.FetchFavoritesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.FetchFavoritesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchFavoritesFail(['Oops! An error occured']));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.AddCourseToFavoritesSuccess(resData.createdFavorite);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.AddCourseToFavoritesFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.AddCourseToFavoritesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.AddCourseToFavoritesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.AddCourseToFavoritesFail(['Oops! An error occured']));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('id', favData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.RemoveCourseFromFavoritesSuccess(resData.deletedFavoriteId);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.RemoveCourseFromFavoritesFail(['Oops! An error occured']));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchSavedSessionsSuccess(resData.savedSessions);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchSavedSessionsFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.FetchSavedSessionsFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.FetchSavedSessionsFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchSavedSessionsFail(['Oops! An error occured']));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.FetchSavedSessionsSuccess(resData.sessions);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.FetchSavedSessionsFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.FetchSavedSessionsFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.FetchSavedSessionsFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.FetchSavedSessionsFail(['Oops! An error occured']));
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
                    sessionUrl:sessionData.payload.sessionUrl
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.SaveSessionSuccess(resData.createdSavedSession);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.SaveSessionFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.SaveSessionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.SaveSessionFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.SaveSessionFail(['Oops! An error occured']));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('id', sessionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new MemberActions.RemoveSessionSuccess(resData.deletedSessionId);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new MemberActions.RemoveSessionFail(['Access Denied']));
                            case 404:
                                return of(new MemberActions.RemoveSessionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new MemberActions.RemoveSessionFail(errorRes.error.errors));
                            default:
                                return of(new MemberActions.RemoveSessionFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    // @Effect()
    // likeCourse = this.actions$.pipe(
    //     ofType(MemberActions.LIKE_START),
    //     switchMap((likeData: MemberActions.LikeStart) => {
    //         return this.http.post<{ course: Course }>(environment.API_BASE_URL + 'likes/like-course',
    //             {
    //                 courseId: likeData.payload.courseId,
    //                 userId: this.userId
    //             },
    //             {
    //                 headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    //                 params: new HttpParams().set('action', likeData.payload.action)
    //             })
    //             .pipe(
    //                 map(resData => {
    //                     return new MemberActions.LikeSuccess(resData.course);
    //                 }),
    //                 catchError(errorRes => {
    //                     switch (errorRes.status) {
    //                         case 403:
    //                         case 401:
    //                             return of(new MemberActions.LikeFail(['Access Denied']));
    //                         case 404:
    //                             return of(new MemberActions.LikeFail(['Error 404. Not Found']));
    //                         case 400:
    //                             return of(new MemberActions.LikeFail(errorRes.error.errors));
    //                         default:
    //                             return of(new MemberActions.LikeFail(['Oops! An error occured']));
    //                     }
    //                 })
    //             )
    //     })
    // );

    // @Effect()
    // enrollInCourse = this.actions$.pipe(
    //     ofType(MemberActions.ENROLL_START),
    //     switchMap((enrollData: MemberActions.EnrollStart) => {
    //         return this.http.post<{ course: Course }>(environment.API_BASE_URL + 'classes/enroll',
    //             {
    //                 classId: enrollData.payload.classId,
    //                 userId: this.userId
    //             },
    //             {
    //                 headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
    //                 params: new HttpParams().set('action', enrollData.payload.action)
    //             })
    //             .pipe(
    //                 map(resData => {
    //                     return new MemberActions.EnrollSuccess(resData.course);
    //                 }),
    //                 catchError(errorRes => {
    //                     switch (errorRes.status) {
    //                         case 403:
    //                         case 401:
    //                             return of(new MemberActions.EnrollFail(['Access Denied']));
    //                         case 404:
    //                             return of(new MemberActions.EnrollFail(['Error 404. Not Found']));
    //                         case 400:
    //                             return of(new MemberActions.EnrollFail(errorRes.error.errors));
    //                         default:
    //                             return of(new MemberActions.EnrollFail(['Oops! An error occured']));
    //                     }
    //                 })
    //             )
    //     })
    // );

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
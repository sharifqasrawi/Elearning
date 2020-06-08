import { TranslateService } from '@ngx-translate/core';
import { Like } from './../../models/like.model';
import { Class } from './../../models/class.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as HomeCoursesActions from './courses.actions';
import { Course } from './../../models/course.model';

@Injectable()
export class HomeCoursesEffects {

    token = '';
    userName = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchCourses = this.actions$.pipe(
        ofType(HomeCoursesActions.FETCH_START),
        switchMap((coursesData: HomeCoursesActions.FetchStart) => {
            let params = null;
            if (coursesData.payload && coursesData.payload.categoryId) {
                params = new HttpParams().set('categoryId', coursesData.payload.categoryId.toString());
            }

            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'home/courses',
                {
                    params: params
                })
                .pipe(
                    map(resData => {
                        return new HomeCoursesActions.FetchSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCoursesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCoursesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new HomeCoursesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeCoursesActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    likeCourse = this.actions$.pipe(
        ofType(HomeCoursesActions.LIKE_START),
        switchMap((likeData: HomeCoursesActions.LikeStart) => {
            return this.http.post<{ like: Like, action: string }>(environment.API_BASE_URL + 'likes/like-course',
                {
                    courseId: likeData.payload.courseId,
                    userId: this.userId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', likeData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new HomeCoursesActions.LikeSuccess(resData);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCoursesActions.LikeFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCoursesActions.LikeFail([this.error404]));
                            case 400:
                                return of(new HomeCoursesActions.LikeFail(errorRes.error.errors));
                            default:
                                return of(new HomeCoursesActions.LikeFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    enrollInCourse = this.actions$.pipe(
        ofType(HomeCoursesActions.ENROLL_START),
        switchMap((enrollData: HomeCoursesActions.EnrollStart) => {
            return this.http.post<{ updatedClass: Class }>(environment.API_BASE_URL + 'classes/enroll',
                {
                    classId: enrollData.payload.classId,
                    userId: this.userId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', enrollData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new HomeCoursesActions.EnrollSuccess(resData.updatedClass);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCoursesActions.EnrollFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCoursesActions.EnrollFail([this.error404]));
                            case 400:
                                return of(new HomeCoursesActions.EnrollFail(errorRes.error.errors));
                            default:
                                return of(new HomeCoursesActions.EnrollFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    rateCourse = this.actions$.pipe(
        ofType(HomeCoursesActions.RATE_START),
        switchMap((rateData: HomeCoursesActions.RateStart) => {
            return this.http.post<{ course: Course }>(environment.API_BASE_URL + 'CourseRatings',
                {
                    courseId: rateData.payload.courseId,
                    userId: this.userId,
                    value: rateData.payload.value
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new HomeCoursesActions.RateSuccess(resData.course);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCoursesActions.RateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeCoursesActions.RateFail([this.error404]));
                            case 400:
                                return of(new HomeCoursesActions.RateFail(errorRes.error.errors));
                            default:
                                return of(new HomeCoursesActions.RateFail([this.errorOccured]));
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
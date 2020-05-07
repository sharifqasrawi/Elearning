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

    @Effect()
    fetchCourses = this.actions$.pipe(
        ofType(HomeCoursesActions.FETCH_START),
        switchMap((coursesData: HomeCoursesActions.FetchStart) => {
            let params = null;
            if (coursesData.payload.categoryId) {
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
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCoursesActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new HomeCoursesActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeCoursesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeCoursesActions.FetchFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    likeCourse = this.actions$.pipe(
        ofType(HomeCoursesActions.LIKE_START),
        switchMap((likeData: HomeCoursesActions.LikeStart) => {
            return this.http.post<{ course: Course }>(environment.API_BASE_URL + 'likes/like-course',
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
                        return new HomeCoursesActions.LikeSuccess(resData.course);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCoursesActions.LikeFail(['Access Denied']));
                            case 404:
                                return of(new HomeCoursesActions.LikeFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeCoursesActions.LikeFail(errorRes.error.errors));
                            default:
                                return of(new HomeCoursesActions.LikeFail(['Oops! An error occured']));
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
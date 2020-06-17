import { TranslateService } from '@ngx-translate/core';
import { Course } from './../../models/course.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '../../../environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as HomeActions from './home.actions';
import { Category } from '../../models/category.model';


@Injectable()
export class HomeEffects {

    token = '';
    userName = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(HomeActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ categories: Category[] }>(environment.API_BASE_URL + 'home/categories',
                {
                    headers: new HttpHeaders().append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new HomeActions.FetchSuccess(resData.categories);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeActions.FetchFail([this.error404]));
                            case 400:
                                return of(new HomeActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchLatestCourses = this.actions$.pipe(
        ofType(HomeActions.FETCH_LATEST_COURSES_START),
        switchMap(() => {
            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'home/latest-courses',
                {
                    headers: new HttpHeaders().append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map(resData => {
                        return new HomeActions.FetchLatestCoursesSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeActions.FetchLatestCoursesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new HomeActions.FetchLatestCoursesFail([this.error404]));
                            case 400:
                                return of(new HomeActions.FetchLatestCoursesFail(errorRes.error.errors));
                            default:
                                return of(new HomeActions.FetchLatestCoursesFail([this.errorOccured]));
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';
import * as CoursesActions from './courses.actions';
import { Course } from './../../../models/course.model';

@Injectable()
export class CoursesEffects {

    token = '';
    userName = '';
    userId = '';

    @Effect()
    fetchCourses = this.actions$.pipe(
        ofType(CoursesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'courses',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.FetchSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.FetchFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchDeletedCourses = this.actions$.pipe(
        ofType(CoursesActions.FETCH_DELETED_START),
        switchMap(() => {
            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'courses/deleted',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.FetchDeletedSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.FetchDeletedFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.FetchDeletedFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.FetchDeletedFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.FetchDeletedFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    createCourse = this.actions$.pipe(
        ofType(CoursesActions.CREATE_START),
        switchMap((courseData: CoursesActions.CreateStart) => {
            return this.http.post<{ course: Course }>(environment.API_BASE_URL + 'courses/create-course',
                {
                    Title_EN: courseData.payload.title_EN,
                    Description_EN: courseData.payload.description_EN,
                    Prerequisites_EN: courseData.payload.prerequisites_EN,
                    Languages: courseData.payload.languages,
                    Level: courseData.payload.level,
                    Duration: courseData.payload.duration,
                    ImagePath: courseData.payload.imagePath,
                    Price: courseData.payload.price,
                    IsFree: courseData.payload.isFree,
                    IsPublished: courseData.payload.isPublished,
                    CreatedBy: this.userName,
                    UpdatedBy: this.userName,
                    Category: {
                        Id: courseData.payload.category
                    },
                    Author: {
                        Id: this.userId
                    }
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.CreateSuccess(resData.course);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.CreateFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.CreateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.CreateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    updateCourse = this.actions$.pipe(
        ofType(CoursesActions.UPDATE_START),
        switchMap((courseData: CoursesActions.UpdateStart) => {
            return this.http.put<{ updatedCourse: Course }>(environment.API_BASE_URL + 'courses/update-course',
                {
                    Id: courseData.payload.id,
                    Title_EN: courseData.payload.title_EN,
                    Description_EN: courseData.payload.description_EN,
                    Prerequisites_EN: courseData.payload.prerequisites_EN,
                    Languages: courseData.payload.languages,
                    Level: courseData.payload.level,
                    Duration: courseData.payload.duration,
                    ImagePath: courseData.payload.imagePath,
                    Price: courseData.payload.price,
                    IsFree: courseData.payload.isFree,
                    IsPublished: courseData.payload.isPublished,
                    UpdatedBy: this.userName,
                    Category: {
                        Id: courseData.payload.category
                    },
                    Author: {
                        Id: this.userId
                    }
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.UpdateSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.UpdateFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.UpdateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.UpdateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    publishUnpublishCourse = this.actions$.pipe(
        ofType(CoursesActions.PUBLISH_UNPUBLISH_START),
        switchMap((courseData: CoursesActions.PublishUnpublishStart) => {
            return this.http.put<{ updatedCourse: Course }>(environment.API_BASE_URL + 'courses/publish',
                {
                    Id: courseData.payload.id,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', courseData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.PublishUnpublishSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.PublishUnpublishFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.PublishUnpublishFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.PublishUnpublishFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.PublishUnpublishFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    addRemoveTagToCourse = this.actions$.pipe(
        ofType(CoursesActions.ADD_REMOVE_TAG_START),
        switchMap((courseData: CoursesActions.AddRemoveTagStart) => {
            return this.http.put<{ updatedCourse: Course }>(environment.API_BASE_URL + 'courses/tag-course',
                {
                    courseId: courseData.payload.courseId,
                    tagId: courseData.payload.tagId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', courseData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.AddRemoveTagSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.AddRemoveTagFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.AddRemoveTagFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.AddRemoveTagFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.AddRemoveTagFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );


    @Effect()
    trashRestoreCourse = this.actions$.pipe(
        ofType(CoursesActions.TRASH_RESTORE_START),
        switchMap((courseData: CoursesActions.TrashRestoreStart) => {
            return this.http.put<{ updatedCourse: Course }>(environment.API_BASE_URL + 'courses/trash-restore-course',
                {
                    id: courseData.payload.id,
                    deletedBy: this.userName,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', courseData.payload.action)
                })
                .pipe(
                    map(resData => {
                        if (courseData.payload.action === 'trash')
                            return new CoursesActions.TrashSuccess(resData.updatedCourse);
                        else if (courseData.payload.action === 'restore')
                            return new CoursesActions.RestoreSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.TrashRestoreFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.TrashRestoreFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.TrashRestoreFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.TrashRestoreFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );


    // Sections
    @Effect()
    createSection = this.actions$.pipe(
        ofType(CoursesActions.CREATE_SECTION_START),
        switchMap((sectionData: CoursesActions.CreateSectionStart) => {
            return this.http.post<{ updatedCourse: Course }>(environment.API_BASE_URL + 'courses/manage-section',
                {
                    course: {
                        id: sectionData.payload.course.id
                    },
                    name_EN: sectionData.payload.name_EN,
                    order: sectionData.payload.order,
                    createdBy: this.userName,
                    updatedBy: this.userName
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.CreateSectionSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.CreateSectionFail(['Access Denied']));
                            case 404:
                                return of(new CoursesActions.CreateSectionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CoursesActions.CreateSectionFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.CreateSectionFail(['Oops! An error occured']));
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
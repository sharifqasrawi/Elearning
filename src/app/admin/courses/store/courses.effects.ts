import { TranslateService } from '@ngx-translate/core';
import { Class } from './../../../models/class.model';
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
import { Comment } from './../../../models/comment.model';

@Injectable()
export class CoursesEffects {

    token = '';
    userName = '';
    userId = '';

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';

    @Effect()
    fetchCourses = this.actions$.pipe(
        ofType(CoursesActions.FETCH_START),
        switchMap((coursesData: CoursesActions.FetchStart) => {
            let params = null;
            if (coursesData.payload) {
                params = new HttpParams().set('categoryId', coursesData.payload.toString());
            }

            return this.http.get<{ courses: Course[] }>(environment.API_BASE_URL + 'courses',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: params
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.FetchSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.FetchFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.FetchFail([this.errorOccured]));
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
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.FetchDeletedSuccess(resData.courses);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.FetchDeletedFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.FetchDeletedFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.FetchDeletedFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.FetchDeletedFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    createCourse = this.actions$.pipe(
        ofType(CoursesActions.CREATE_START),
        switchMap((courseData: CoursesActions.CreateStart) => {
            return this.http.post<{ createdCourse: Course }>(environment.API_BASE_URL + 'courses/create-course',
                {
                    Title_EN: courseData.payload.title_EN,
                    Title_FR: courseData.payload.title_FR,
                    Description_EN: courseData.payload.description_EN,
                    Description_FR: courseData.payload.description_FR,
                    Prerequisites_EN: courseData.payload.prerequisites_EN,
                    Prerequisites_FR: courseData.payload.prerequisites_FR,
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
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.CreateSuccess(resData.createdCourse);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.CreateFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.CreateFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    createClass = this.actions$.pipe(
        ofType(CoursesActions.CREATE_CLASS_START),
        switchMap((classData: CoursesActions.CreateClassStart) => {
            return this.http.post<{ course: Course }>(environment.API_BASE_URL + 'classes',
                {
                    courseId: classData.payload.courseId,
                    name_EN: classData.payload.name_EN,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.CreateClassSuccess(resData.course);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.CreateClassFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.CreateClassFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.CreateClassFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.CreateClassFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchNonClassMembers = this.actions$.pipe(
        ofType(CoursesActions.FETCH_NON_CLASS_MEMBERS_START),
        switchMap((classData: CoursesActions.FetchNonClassMembersStart) => {
            return this.http.get<{ nonMembers: { id: string, fullName: string }[] }>(environment.API_BASE_URL + 'classes/non-members',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('classId', classData.payload)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.FetchNonClassMembersSuccess(resData.nonMembers);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.FetchNonClassMembersFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.FetchNonClassMembersFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.FetchNonClassMembersFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.FetchNonClassMembersFail([this.errorOccured]));
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
                    Title_FR: courseData.payload.title_FR,
                    Description_EN: courseData.payload.description_EN,
                    Description_FR: courseData.payload.description_FR,
                    Prerequisites_EN: courseData.payload.prerequisites_EN,
                    Prerequisites_FR: courseData.payload.prerequisites_FR,
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
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.UpdateSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.UpdateFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('action', courseData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.PublishUnpublishSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.PublishUnpublishFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.PublishUnpublishFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.PublishUnpublishFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.PublishUnpublishFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('action', courseData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.AddRemoveTagSuccess(resData.updatedCourse);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.AddRemoveTagFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.AddRemoveTagFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.AddRemoveTagFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.AddRemoveTagFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.TrashRestoreFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.TrashRestoreFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.TrashRestoreFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.TrashRestoreFail([this.errorOccured]));
                        }
                    })
                )
        })
    );


    @Effect()
    deleteComment = this.actions$.pipe(
        ofType(CoursesActions.DELETE_COMMENT_START),
        switchMap((commentData: CoursesActions.DeleteCommentStart) => {

            return this.http.delete<{ deletedComment: Comment }>(environment.API_BASE_URL + 'comments',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('id', commentData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.DeleteCommentSuccess(resData.deletedComment);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.DeleteCommentFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.DeleteCommentFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.DeleteCommentFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.DeleteCommentFail([this.errorOccured]));
                        }
                    })
                )
        })
    );

    @Effect()
    enrollUserInCourse = this.actions$.pipe(
        ofType(CoursesActions.ENROLL_USER_START),
        switchMap((enrollData: CoursesActions.EnrollUserStart) => {
            return this.http.post<{ updatedClass: Class }>(environment.API_BASE_URL + 'classes/enroll',
                {
                    classId: enrollData.payload.classId,
                    userId: enrollData.payload.userId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().append('action', enrollData.payload.action)
                        .append('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new CoursesActions.EnrollUserSuccess(resData.updatedClass);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CoursesActions.EnrollUserFail([this.errorAccessDenied]));
                            case 404:
                                return of(new CoursesActions.EnrollUserFail([this.error404]));
                            case 400:
                                return of(new CoursesActions.EnrollUserFail(errorRes.error.errors));
                            default:
                                return of(new CoursesActions.EnrollUserFail([this.errorOccured]));
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
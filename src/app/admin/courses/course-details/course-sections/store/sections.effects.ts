import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../../../environments/environment';

import * as fromApp from '../../../../../store/app.reducer';
import * as SectionsActions from './sections.actions';
import { Section } from './../../../../../models/section.model';

@Injectable()
export class SectionsEffects {

    token = '';
    userName = '';
    userId = '';

    @Effect()
    fetchSections = this.actions$.pipe(
        ofType(SectionsActions.FETCH_START),
        switchMap((sectionData: SectionsActions.FetchStart) => {
            return this.http.get<{ sections: Section[] }>(environment.API_BASE_URL + 'sections',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('courseId', sectionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new SectionsActions.FetchSuccess(resData.sections);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new SectionsActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new SectionsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.FetchFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );




    // Sections
    @Effect()
    createSection = this.actions$.pipe(
        ofType(SectionsActions.CREATE_START),
        switchMap((sectionData: SectionsActions.CreateStart) => {
            return this.http.post<{ createdSection: Section }>(environment.API_BASE_URL + 'sections/create-section',
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new SectionsActions.CreateSuccess(resData.createdSection);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.CreateFail(['Access Denied']));
                            case 404:
                                return of(new SectionsActions.CreateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new SectionsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.CreateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteSection = this.actions$.pipe(
        ofType(SectionsActions.DELETE_START),
        switchMap((sectionData: SectionsActions.DeleteStart) => {
            return this.http.delete<{ deletedSectionId: number }>(environment.API_BASE_URL + 'sections/delete-section',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('sectionId', sectionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new SectionsActions.DeleteSuccess(resData.deletedSectionId);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.DeleteFail(['Access Denied']));
                            case 404:
                                return of(new SectionsActions.DeleteFail(['Error 404. Not Found']));
                            case 400:
                                return of(new SectionsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.DeleteFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    updateSection = this.actions$.pipe(
        ofType(SectionsActions.UPDATE_START),
        switchMap((sectionData: SectionsActions.UpdateStart) => {
            return this.http.put<{ updatedSection: Section, updatedOldSection: Section }>(environment.API_BASE_URL + 'sections/update-section',
                {
                    id: sectionData.payload.id,
                    name_EN: sectionData.payload.name_EN,
                    order: sectionData.payload.order,
                    updatedBy: this.userName
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                })
                .pipe(
                    map(resData => {
                        return new SectionsActions.UpdateSuccess({
                            updatedSection: resData.updatedSection,
                            updatedOldSection: resData.updatedOldSection
                        });
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.UpdateFail(['Access Denied']));
                            case 404:
                                return of(new SectionsActions.UpdateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new SectionsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.UpdateFail(['Oops! An error occured']));
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
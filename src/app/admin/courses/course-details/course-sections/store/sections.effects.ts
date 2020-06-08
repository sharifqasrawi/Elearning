import { TranslateService } from '@ngx-translate/core';
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

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SectionsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new SectionsActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.FetchFail([this.errorOccured]));
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
                    name_FR: sectionData.payload.name_FR,
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.CreateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SectionsActions.CreateFail([this.error404]));
                            case 400:
                                return of(new SectionsActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.CreateFail([this.errorOccured]));
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.DeleteFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SectionsActions.DeleteFail([this.error404]));
                            case 400:
                                return of(new SectionsActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.DeleteFail([this.errorOccured]));
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
                    name_FR: sectionData.payload.name_FR,
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new SectionsActions.UpdateFail([this.errorAccessDenied]));
                            case 404:
                                return of(new SectionsActions.UpdateFail([this.error404]));
                            case 400:
                                return of(new SectionsActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new SectionsActions.UpdateFail([this.errorOccured]));
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
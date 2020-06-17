import { TranslateService } from '@ngx-translate/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { environment } from './../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';
import * as ReportsActions from './reports.action';
import { Report } from './../../../models/report.model';


@Injectable()
export class ReportsEffects {
    token = null;
    userId = null;

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchReports = this.actions$.pipe(
        ofType(ReportsActions.FETCH_START),
        switchMap((reportData: ReportsActions.FetchStart) => {

            return this.http.get<{ reports: Report[] }>(environment.API_BASE_URL + 'reports',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: reportData.payload ? new HttpParams().set('type', reportData.payload) : null
                })
                .pipe(
                    map(resData => {
                        return new ReportsActions.FetchSuccess(resData.reports);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ReportsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ReportsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new ReportsActions.FetchFail(errorRes.error.errors));

                            default:
                                return of(new ReportsActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        }),

    );

    @Effect()
    fetchReportsByUser = this.actions$.pipe(
        ofType(ReportsActions.FETCH_BY_USER_START),
        switchMap(() => {

            return this.http.get<{ reports: Report[] }>(environment.API_BASE_URL + 'reports/by-user',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true,
                    params: new HttpParams().set('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new ReportsActions.FetchSuccess(resData.reports);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ReportsActions.FetchFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ReportsActions.FetchFail([this.error404]));
                            case 400:
                                return of(new ReportsActions.FetchFail(errorRes.error.errors));

                            default:
                                return of(new ReportsActions.FetchFail([this.errorOccured]));
                        }
                    })
                )
        }),

    );


    @Effect()
    report = this.actions$.pipe(
        ofType(ReportsActions.REPORT_BUG_START),
        switchMap((reportData: ReportsActions.ReportBugStart) => {
            const data = {
                userFullName: reportData.payload.userFullName,
                userEmail: reportData.payload.userEmail,
                severity: reportData.payload.severity,
                severityLevel: reportData.payload.severityLevel,
                type: reportData.payload.type,
                description: reportData.payload.description,
                userId: this.userId
            };

            return this.http.post<{ createdReport: Report }>(environment.API_BASE_URL + 'reports/report-bug', data, {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                    .append('language', this.translate.currentLang)
            })
                .pipe(
                    map((resData) => {
                        return new ReportsActions.ReportBugSuccess(resData.createdReport);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ReportsActions.ReportBugFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ReportsActions.ReportBugFail([this.error404]));
                            case 400:
                                return of(new ReportsActions.ReportBugFail(errorRes.error.errors));
                            default:
                                return of(new ReportsActions.ReportBugFail([this.errorOccured]));
                        }
                    })
                )
        }),
    );

    @Effect()
    markReport = this.actions$.pipe(
        ofType(ReportsActions.MARK_REPORT_START),
        switchMap((reportData: ReportsActions.MarkReportStart) => {
            const data = {
                id: reportData.payload.id,
                isSeen: reportData.payload.isSeen
            };

            return this.http.put<{ updatedReport: Report }>(environment.API_BASE_URL + 'reports/mark-report-seen', data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map((resData) => {
                        return new ReportsActions.MarkReportSuccess(resData.updatedReport);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ReportsActions.MarkReportFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ReportsActions.MarkReportFail([this.error404]));
                            case 400:
                                return of(new ReportsActions.MarkReportFail(errorRes.error.errors));
                            default:
                                return of(new ReportsActions.MarkReportFail([this.errorOccured]));
                        }
                    })
                )
        }),
    );

    @Effect()
    markReply = this.actions$.pipe(
        ofType(ReportsActions.MARK_REPLY_START),
        switchMap((reportData: ReportsActions.MarkReplyStart) => {
            const data = {
                id: reportData.payload.id,
                isReplySeen: reportData.payload.isReplySeen,
                userId: this.userId
            };

            return this.http.put<{ updatedReport: Report }>(environment.API_BASE_URL + 'reports/mark-reply-seen', data, {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                    .append('language', this.translate.currentLang)
            })
                .pipe(
                    map((resData) => {
                        return new ReportsActions.MarkReplySuccess(resData.updatedReport);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ReportsActions.MarkReplyFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ReportsActions.MarkReplyFail([this.error404]));
                            case 400:
                                return of(new ReportsActions.MarkReplyFail(errorRes.error.errors));
                            default:
                                return of(new ReportsActions.MarkReplyFail([this.errorOccured]));
                        }
                    })
                )
        }),
    );



    @Effect()
    replyReport = this.actions$.pipe(
        ofType(ReportsActions.REPLY_REPORT_START),
        switchMap((reportData: ReportsActions.ReplyReportStart) => {
            const data = {
                id: reportData.payload.id,
                replyMessage: reportData.payload.replyMessage
            };

            return this.http.put<{ updatedReport: Report }>(environment.API_BASE_URL + 'reports/reply-report', data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    withCredentials: true
                })
                .pipe(
                    map((resData) => {
                        return new ReportsActions.ReplyReportSuccess(resData.updatedReport);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ReportsActions.ReplyReportFail([this.errorAccessDenied]));
                            case 404:
                                return of(new ReportsActions.ReplyReportFail([this.error404]));
                            case 400:
                                return of(new ReportsActions.ReplyReportFail(errorRes.error.errors));
                            default:
                                return of(new ReportsActions.ReplyReportFail([this.errorOccured]));
                        }
                    })
                )
        }),
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
                    this.userId = user.id;
                    this.token = user.token;
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
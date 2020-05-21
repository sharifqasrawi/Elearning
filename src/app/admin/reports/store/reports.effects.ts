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
    token = '';

    @Effect()
    fetchReports = this.actions$.pipe(
        ofType(ReportsActions.FETCH_START),
        switchMap((reportData: ReportsActions.FetchStart) => {

            return this.http.get<{ reports: Report[] }>(environment.API_BASE_URL + 'reports',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('type', reportData.payload)
                });
        }),
        map(resData => {
            return new ReportsActions.FetchSuccess(resData.reports);
        }),
        catchError(errorRes => {

            switch (errorRes.status) {
                case 403:
                case 401:
                    return of(new ReportsActions.FetchFail(['Access Denied']));
                case 404:
                    return of(new ReportsActions.FetchFail(['Error 404. Not Found']));
                case 400:
                    return of(new ReportsActions.FetchFail(errorRes.error.errors));

                default:
                    return of(new ReportsActions.FetchFail(['Error Fetching Data']));
            }
        })
    );


    @Effect()
    report = this.actions$.pipe(
        ofType(ReportsActions.REPORT_BUG_START),
        switchMap((reportData: ReportsActions.ReportBugStart) => {
            const data = {
                userFullName: reportData.payload.userFullName,
                severity: reportData.payload.severity,
                severityLevel: reportData.payload.severityLevel,
                type: reportData.payload.type,
                description: reportData.payload.description
            };

            return this.http.post<{ createdReport: Report }>(environment.API_BASE_URL + 'reports/report-bug', data)
                .pipe(
                    map((resData) => {
                        return new ReportsActions.ReportBugSuccess(resData.createdReport);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new ReportsActions.ReportBugFail(['Access Denied']));
                            case 404:
                                return of(new ReportsActions.ReportBugFail(['Error 404. Not Found']));
                            case 400:
                                return of(new ReportsActions.ReportBugFail(errorRes.error.errors));
                            default:
                                return of(new ReportsActions.ReportBugFail(['Error Creating user']));
                        }
                    })
                )
        }),
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
                if (user)
                    this.token = user.token;
            });
    }
}
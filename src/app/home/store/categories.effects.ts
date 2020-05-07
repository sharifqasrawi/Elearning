import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from './../../../environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as HomeCategoriesActions from './categories.actions';
import { Category } from './../../models/category.model';


@Injectable()
export class HomeCategoriesEffects {

    token = '';
    userName = '';

    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(HomeCategoriesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ categories: Category[] }>(environment.API_BASE_URL + 'home/categories')
                .pipe(
                    map(resData => {
                        return new HomeCategoriesActions.FetchSuccess(resData.categories);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeCategoriesActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new HomeCategoriesActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeCategoriesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new HomeCategoriesActions.FetchFail(['Oops! An error occured']));
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
                }
            });
    }
}
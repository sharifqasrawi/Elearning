import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';
import * as CategoriesActions from './categories.actions';
import { Category } from './../../../models/category.model';
import { of } from 'rxjs';


@Injectable()
export class CategoriesEffects {

    token = '';
    userName = '';

    @Effect()
    fetchCategories = this.actions$.pipe(
        ofType(CategoriesActions.FETCH_START),
        switchMap(() => {
            return this.http.get<{ categories: Category[] }>(environment.API_BASE_URL + 'categories',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CategoriesActions.FetchSuccess(resData.categories);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CategoriesActions.FetchFail(['Access Denied']));
                            case 404:
                                return of(new CategoriesActions.FetchFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CategoriesActions.FetchFail(errorRes.error.errors));
                            default:
                                return of(new CategoriesActions.FetchFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchDeletedCategories = this.actions$.pipe(
        ofType(CategoriesActions.FETCH_DELETED_START),
        switchMap(() => {
            return this.http.get<{ categories: Category[] }>(environment.API_BASE_URL + 'categories/deleted',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CategoriesActions.FetchDeletedSuccess(resData.categories);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CategoriesActions.FetchDeletedFail(['Access Denied']));
                            case 404:
                                return of(new CategoriesActions.FetchDeletedFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CategoriesActions.FetchDeletedFail(errorRes.error.errors));
                            default:
                                return of(new CategoriesActions.FetchDeletedFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );


    @Effect()
    createCategory = this.actions$.pipe(
        ofType(CategoriesActions.CREATE_START),
        switchMap((catData: CategoriesActions.CreateStart) => {
            return this.http.post<{ category: Category }>(environment.API_BASE_URL + 'categories/new',
                {
                    title_EN: catData.payload.title_En,
                    imagePath: catData.payload.imagePath,
                    createdBy: this.userName
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CategoriesActions.CreateSuccess(resData.category);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CategoriesActions.CreateFail(['Access Denied']));
                            case 404:
                                return of(new CategoriesActions.CreateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CategoriesActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new CategoriesActions.CreateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    updateCategory = this.actions$.pipe(
        ofType(CategoriesActions.UPDATE_START),
        switchMap((catData: CategoriesActions.UpdateStart) => {
            return this.http.put<{ updatedCategory: Category }>(environment.API_BASE_URL + 'categories/update',
                {
                    id: catData.payload.id,
                    title_EN: catData.payload.title_En,
                    imagePath: catData.payload.imagePath,
                    updatedBy: this.userName
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CategoriesActions.UpdateSuccess(resData.updatedCategory);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CategoriesActions.UpdateFail(['Access Denied']));
                            case 404:
                                return of(new CategoriesActions.UpdateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CategoriesActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new CategoriesActions.UpdateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    trashCategory = this.actions$.pipe(
        ofType(CategoriesActions.TRASH_START),
        switchMap((catData: CategoriesActions.TrashStart) => {
            return this.http.put<{ category: Category }>(environment.API_BASE_URL + 'categories/trash',
                {
                    id: catData.payload,
                    deletedBy: this.userName
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CategoriesActions.TrashSuccess(resData.category);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CategoriesActions.TrashFail(['Access Denied']));
                            case 404:
                                return of(new CategoriesActions.TrashFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CategoriesActions.TrashFail(errorRes.error.errors));
                            default:
                                return of(new CategoriesActions.TrashFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    restoreCategory = this.actions$.pipe(
        ofType(CategoriesActions.RESTORE_START),
        switchMap((catData: CategoriesActions.RestoreStart) => {
            return this.http.put<{ category: Category }>(environment.API_BASE_URL + 'categories/restore',
                {
                    id: catData.payload,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new CategoriesActions.RestoreSuccess(resData.category);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CategoriesActions.RestoreFail(['Access Denied']));
                            case 404:
                                return of(new CategoriesActions.RestoreFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CategoriesActions.RestoreFail(errorRes.error.errors));
                            default:
                                return of(new CategoriesActions.RestoreFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteCategory = this.actions$.pipe(
        ofType(CategoriesActions.DELETE_START),
        switchMap((catData: CategoriesActions.DeleteStart) => {
            return this.http.delete<{ categoryId: number }>(environment.API_BASE_URL + 'categories/delete',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('id', catData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new CategoriesActions.DeleteSuccess(resData.categoryId);
                    }),
                    catchError(errorRes => {
                        console.log(errorRes);
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new CategoriesActions.DeleteFail(['Access Denied']));
                            case 404:
                                return of(new CategoriesActions.DeleteFail(['Error 404. Not Found']));
                            case 400:
                                return of(new CategoriesActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new CategoriesActions.DeleteFail(['Oops! An error occured']));
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
import { switchMap, map, catchError, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { environment } from './../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';
import * as UsersActions from './users.actions';
import { User } from './../../../models/user.model';

export interface RegisterResponseData {
    user: User
};

@Injectable()
export class UsersEffects {
    token = '';
    userId: string = null;

    @Effect()
    fetchUsers = this.actions$.pipe(
        ofType(UsersActions.FETCH_START),
        switchMap(() => {

            return this.http.get<{ users: User[] }>(environment.API_BASE_URL + 'users',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                });
        }),
        map(usersRes => {
            return new UsersActions.FetchSuccess(usersRes.users);
        }),
        catchError(errorRes => {

            switch (errorRes.status) {
                case 403:
                case 401:
                    return of(new UsersActions.FetchFail(['Access Denied']));
                case 404:
                    return of(new UsersActions.FetchFail(['Error 404. Not Found']));
                case 400:
                    return of(new UsersActions.FetchFail(errorRes.error.errors));

                default:
                    return of(new UsersActions.FetchFail(['Error Fetching Data']));
            }
        })
    );

    @Effect()
    fetchUser = this.actions$.pipe(
        ofType(UsersActions.FETCH_USER_START),
        switchMap(() => {

            return this.http.get<{ user: User }>(environment.API_BASE_URL + 'users/user',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('id', this.userId)
                });
        }),
        map(usersRes => {
            return new UsersActions.FetchUserSuccess(usersRes.user);
        }),
        catchError(errorRes => {

            switch (errorRes.status) {
                case 403:
                case 401:
                    return of(new UsersActions.FetchUserFail(['Access Denied']));
                case 404:
                    return of(new UsersActions.FetchUserFail(['Error 404. Not Found']));
                case 400:
                    return of(new UsersActions.FetchUserFail(errorRes.error.errors));

                default:
                    return of(new UsersActions.FetchUserFail(['Error Fetching Data']));
            }
        })
    );

    @Effect()
    searchUsers = this.actions$.pipe(
        ofType(UsersActions.SEARCH_START),
        switchMap((searchData: UsersActions.SearchStart) => {

            return this.http.get<{ users: User[] }>(environment.API_BASE_URL + 'users/search',
                {
                    headers: new HttpHeaders().append('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('searchKey', searchData.payload)
                });
        }),
        map(usersRes => {
            return new UsersActions.SearchSuccess(usersRes.users);
        }),
        catchError(errorRes => {

            switch (errorRes.status) {
                case 403:
                case 401:
                    return of(new UsersActions.SearchFail(['Access Denied']));
                case 404:
                    return of(new UsersActions.SearchFail(['Error 404. Not Found']));
                case 400:
                    return of(new UsersActions.SearchFail(errorRes.error.errors));
                default:
                    return of(new UsersActions.SearchFail(['Error Fetching Data']));
            }
        })
    );


    @Effect()
    createUser = this.actions$.pipe(
        ofType(UsersActions.CREATE_START),
        switchMap((regData: UsersActions.CreateStart) => {
            const userData = {
                Email: regData.payload.email,
                Password: regData.payload.password,
                ConfirmPassword: regData.payload.confirmPassword,
                FirstName: regData.payload.firstName,
                LastName: regData.payload.lastName,
                Country: regData.payload.country,
                Gender: regData.payload.gender,
                IsAdmin: regData.payload.isAdmin,
                IsAuthor: regData.payload.isAuthor,
                EmailConfirmed: regData.payload.emailConfirmed
            };

            return this.http.post<RegisterResponseData>(environment.API_BASE_URL + 'users/create-user', userData,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map((resData) => {
                        return new UsersActions.CreateSuccess(resData.user);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new UsersActions.CreateFail(['Access Denied']));
                            case 404:
                                return of(new UsersActions.CreateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new UsersActions.CreateFail(errorRes.error.errors));
                            default:
                                return of(new UsersActions.CreateFail(['Error Creating user']));
                        }
                    })
                )
        }),
    );

    @Effect()
    setActiveDeactive = this.actions$.pipe(
        ofType(UsersActions.SET_ACTIVE_DEACTIVE_START),
        switchMap((data: UsersActions.SetActiveDeactiveStart) => {
            return this.http.put<{ userId: string, isActive: boolean }>(environment.API_BASE_URL + 'users/act-deact',
                {
                    UserId: data.payload.userId,
                    Option: data.payload.option
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map((resData) => {
                        return new UsersActions.SetActiveDeactiveSuccess(resData);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new UsersActions.SetActiveDeactiveFail(['Access Denied']));
                            case 404:
                                return of(new UsersActions.SetActiveDeactiveFail(['Error 404. Not Found']));
                            case 400:
                                return of(new UsersActions.SetActiveDeactiveFail(errorRes.error.errors));
                            default:
                                return of(new UsersActions.SetActiveDeactiveFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    updateUser = this.actions$.pipe(
        ofType(UsersActions.UPDATE_START),
        switchMap((userData: UsersActions.UpdateStart) => {
            const user = {
                Id: userData.payload.userId,
                FirstName: userData.payload.firstName,
                LastName: userData.payload.lastName,
                Email: userData.payload.email,
                EmailConfirmed: userData.payload.emailConfirmed,
                Country: userData.payload.country,
                Gender: userData.payload.gender,
                IsAdmin: userData.payload.isAdmin,
                IsAuthor: userData.payload.isAuthor
            };
            return this.http.put<RegisterResponseData>(environment.API_BASE_URL + 'users/update-user',
                user,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new UsersActions.UpdateSuccess(resData.user);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new UsersActions.UpdateFail(['Access Denied']));
                            case 404:
                                return of(new UsersActions.UpdateFail(['Error 404. Not Found']));
                            case 400:
                                return of(new UsersActions.UpdateFail(errorRes.error.errors));
                            default:
                                return of(new UsersActions.UpdateFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    updateProfile = this.actions$.pipe(
        ofType(UsersActions.UPDATE_PROFILE_START),
        switchMap((userData: UsersActions.UpdateProfileStart) => {
            const user = {
                id: userData.payload.userId,
                firstName: userData.payload.firstName,
                lastName: userData.payload.lastName,
                email: userData.payload.email,
                country: userData.payload.country,
                gender: userData.payload.gender
            };
            return this.http.put<{ user: User }>(environment.API_BASE_URL + 'users/update-profile',
                user,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new UsersActions.UpdateProfileSuccess(resData.user);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new UsersActions.UpdateProfileFail(['Access Denied']));
                            case 404:
                                return of(new UsersActions.UpdateProfileFail(['Error 404. Not Found']));
                            case 400:
                                return of(new UsersActions.UpdateProfileFail(errorRes.error.errors));
                            default:
                                return of(new UsersActions.UpdateProfileFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    changePassword = this.actions$.pipe(
        ofType(UsersActions.CHANGE_PASSWORD_START),
        switchMap((passwordData: UsersActions.ChangePasswordStart) => {

            return this.http.post<{ result: boolean }>(environment.API_BASE_URL + 'account/change-password',
                {
                    userId: this.userId,
                    currentPassword: passwordData.payload.currentPassword,
                    newPassword: passwordData.payload.newPassword,
                    confirmPassword: passwordData.payload.confirmPassword,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new UsersActions.ChangePasswordSuccess(resData.result);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new UsersActions.ChangePasswordFail(['Access Denied']));
                            case 404:
                                return of(new UsersActions.ChangePasswordFail(['Error 404. Not Found']));
                            case 400:
                                return of(new UsersActions.ChangePasswordFail(errorRes.error.errors));
                            default:
                                return of(new UsersActions.ChangePasswordFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteUser = this.actions$.pipe(
        ofType(UsersActions.DELETE_START),
        switchMap((userData: UsersActions.DeleteStart) => {
            return this.http.delete<{ userId: string }>(environment.API_BASE_URL + 'users/delete-user',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('userId', userData.payload)
                })
                .pipe(
                    map((resData) => {
                        return new UsersActions.DeleteSuccess(resData.userId);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new UsersActions.DeleteFail(['Access Denied']));
                            case 404:
                                return of(new UsersActions.DeleteFail(['Error 404. Not Found']));
                            case 400:
                                return of(new UsersActions.DeleteFail(errorRes.error.errors));
                            default:
                                return of(new UsersActions.DeleteFail(['Oops! An error occured']));
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
                    this.userId = user.id;
                    this.token = user.token;
                }
            });
    }
}
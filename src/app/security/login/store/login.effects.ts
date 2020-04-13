import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap, concatMap, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../../../environments/environment';

import { AuthService } from './../../auth.service';
import * as LoginActions from './login.actions';
import { User } from 'src/app/models/user.model';

export interface LoginResponseData {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean,
    isAuther: boolean,
    token: string,
    expiresIn: string
};

@Injectable()
export class LoginEffects {
    @Effect()
    login = this.actions$.pipe(
        ofType(LoginActions.LOGIN_START),
        switchMap((loginData: LoginActions.LoginStart) => {
            return this.http.post<LoginResponseData>(environment.API_BASE_URL + 'account/authenticate',
                {
                    email: loginData.payload.email,
                    password: loginData.payload.password
                })
                .pipe(
                    tap(resData => {
                        const expirationDate = new Date(resData.expiresIn);
                        const expiresIn = expirationDate.getTime() - (new Date()).getTime();
                        this.authService.setLogoutTimer(expiresIn);
                    }),
                    map(resData => {
                        const userData = {
                            username: resData.username,
                            token: resData.token,
                            expiresIn: resData.expiresIn,
                            id: resData.id
                        };
                        localStorage.setItem('userData', JSON.stringify(userData));
                        return new LoginActions.LoginSuccess({
                            email: resData.username,
                            userId: resData.id,
                            token: resData.token,
                            expirationDate: new Date(resData.expiresIn),
                            firstName: resData.firstName,
                            lastName: resData.lastName,
                            isAdmin: resData.isAdmin,
                            isAuthor: resData.isAuther,
                            redirect: true
                        });
                    }),
                    catchError(errorRes => {
                        return of(new LoginActions.LoginFail(errorRes.error.errors));
                    })
                )
        })
    );

    @Effect({ dispatch: false })
    logout = this.actions$.pipe(
        ofType(LoginActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/']);
        })
    );


    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(LoginActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                username: string;
                id: string;
                token: string;
                expiresIn: string;
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'DUMMY' };
            }

            const loadedUser = new User(
                '',
                '',
                userData.username,
                '',
                '',
                false,
                false,
                userData.id,
                userData.token,
                new Date(userData.expiresIn)
            );


            if (loadedUser.token) {
                // this.user.next(loadedUser);
                const expirationDuration =
                    new Date(userData.expiresIn).getTime() -
                    new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new LoginActions.LoginSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData.expiresIn),
                    firstName: loadedUser.firstName,
                    lastName: loadedUser.lastName,
                    isAdmin: loadedUser.isAdmin,
                    isAuthor: loadedUser.isAuthor,
                    redirect: false
                });

            }
            return { type: 'DUMMY' };
        })
    );


    @Effect()
    autoLogin2 = this.actions$.pipe(
        ofType(LoginActions.AUTO_LOGIN),
        switchMap(() => {
            const userData: {
                username: string;
                id: string;
                token: string;
                expiresIn: string;
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData)
                return of();

            return this.http.get(environment.API_BASE_URL + 'users/user',
                {
                    params: new HttpParams().set('id', userData.id)
                })
                .pipe(
                    map((res: {
                        user: {
                            firstName: string,
                            lastName: string,
                            username: string,
                            country: string;
                            gender: string,
                            id: string,
                            isAdmin: boolean,
                            isAuthor: boolean
                        }
                    }) => {

                        const loadedUser = new User(
                            res.user.firstName,
                            res.user.lastName,
                            res.user.username,
                            res.user.country,
                            res.user.gender,
                            res.user.isAdmin,
                            res.user.isAuthor,
                            userData.id,
                            userData.token,
                            new Date(userData.expiresIn)
                        );

                        if (loadedUser.token) {

                            const expirationDate = new Date(userData.expiresIn);
                            const expiresIn = expirationDate.getTime() - (new Date()).getTime();
                            this.authService.setLogoutTimer(expiresIn);


                            return new LoginActions.LoginSuccess({
                                email: loadedUser.email,
                                userId: loadedUser.id,
                                token: loadedUser.token,
                                expirationDate: new Date(userData.expiresIn),
                                firstName: loadedUser.firstName,
                                lastName: loadedUser.lastName,
                                isAdmin: loadedUser.isAdmin,
                                isAuthor: loadedUser.isAuthor,
                                redirect: false
                            });

                        }
                        return { type: 'DUMMY' };
                    })
                )
        }),

    );

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(LoginActions.LOGIN_SUCCESS),
        tap((authSuccessAction: LoginActions.LoginSuccess) => {
            if (authSuccessAction.payload.redirect) {
                this.router.navigate(['/']);
            }
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }
}
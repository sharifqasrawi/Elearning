
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from './../../../../environments/environment';

import * as RegisterActions from './register.actions';

export interface RegisterResponseData {
    status: string
};

@Injectable()
export class RegisterEffects {
    @Effect()
    reigster = this.actions$.pipe(
        ofType(RegisterActions.REGISTER_START),
        switchMap((regData: RegisterActions.RegisterStart) => {
            return this.http.post<RegisterResponseData>(environment.API_BASE_URL + 'account/register',
                {
                    Email: regData.payload.email,
                    Password: regData.payload.password,
                    ConfirmPassword: regData.payload.confirmPassword,
                    FirstName: regData.payload.firstName,
                    LastName: regData.payload.lastName,
                    Country: regData.payload.country,
                    Gender: regData.payload.gender
                })
                .pipe(
                    map(resData => {
                        // console.log("registerd");
                        return new RegisterActions.RegisterSuccess();
                    }),
                    catchError(errorRes => {
                        // console.log(errorRes);
                        return of(new RegisterActions.RegisterFail(errorRes.error.errors));
                    })
                )
        }),
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
    ) { }
}

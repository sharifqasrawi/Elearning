import { Action } from '@ngrx/store';

export const LOGIN_START = '[Login] Login Start';
export const LOGIN_SUCCESS = '[Login] Login Success';
export const LOGIN_FAIL = '[Login] Login Fail';
export const LOGOUT = '[Login] Logout';
export const AUTO_LOGIN = '[Login] Auto login';
export const CLEAR_ERRORS = '[Login] Clear errors';
export const SET_ADMIN = '[Login] Set Admin';


export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: {
        email: string,
        password: string,
    }) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: {
        firstName: string,
        lastName: string,
        isAdmin: boolean,
        isAuthor: boolean,
        email: string,
        userId: string,
        token: string,
        expirationDate: Date,
        redirect: boolean
    }) { }
}


export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public payload: string[]) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class SetAdmin implements Action {
    readonly type = SET_ADMIN;

    constructor(public payload: boolean) { }
}

export type LoginActions =
    LoginStart
    | LoginSuccess
    | LoginFail
    | Logout
    | AutoLogin
    | ClearErrors
    | SetAdmin
    ;

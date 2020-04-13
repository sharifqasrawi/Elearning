import { Action } from '@ngrx/store';

export const REGISTER_START = '[Register] Register Start';
export const REGISTER_SUCCESS = '[Register] Register Success';
export const REGISTER_FAIL = '[Register] Register Fail';
export const CLEAR_ERRORS = '[Register] Clear errors';
export const CLEAR_STATUS = '[Register] Clear status';


export class RegisterStart implements Action {
    readonly type = REGISTER_START;

    constructor(public payload: {
        email: string,
        password: string,
        confirmPassword: string,
        firstName: string,
        lastName: string,
        country: string,
        gender: string
    }) { }
}

export class RegisterSuccess implements Action {
    readonly type = REGISTER_SUCCESS;
}


export class RegisterFail implements Action {
    readonly type = REGISTER_FAIL;

    constructor(public payload: { errors: string[] }) { }
}

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class ClearStatus implements Action {
    readonly type = CLEAR_STATUS;
}


export type RegisterActions =
    RegisterStart
    | RegisterSuccess
    | RegisterFail
    | ClearErrors
    | ClearStatus
    ;

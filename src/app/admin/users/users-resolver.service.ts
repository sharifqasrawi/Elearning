import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { User } from './../../models/user.model';

import * as fromApp from '../../store/app.reducer';
import * as UsersActions from './store/users.actions';

@Injectable({providedIn: 'root'})
export class UsersResolverService implements Resolve<User[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('users').pipe(
            take(1),
            map(usersState => {
                return usersState.users;
            }),
            switchMap(users => {
                if (users.length === 0) {
                    this.store.dispatch(new UsersActions.FetchStart());
                    return this.actions$.pipe(
                        ofType(UsersActions.FETCH_SUCCESS),
                        take(1)
                    );
                } else {
                    return of(users);
                }
            })
        );
    }
}

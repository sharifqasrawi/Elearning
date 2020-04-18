import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Directory } from './../../models/directory.model';

import * as fromApp from '../../store/app.reducer';
import * as DirectoriesActions from './store/directories.actions';

@Injectable({providedIn: 'root'})
export class DirectoriesResolverService implements Resolve<Directory[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('directories').pipe(
            take(1),
            map(dirState => {
                return dirState.directories;
            }),
            switchMap(dirs => {
                if (dirs.length === 0) {
                    this.store.dispatch(new DirectoriesActions.FetchStart());
                    return this.actions$.pipe(
                        ofType(DirectoriesActions.FETCH_SUCCESS),
                        take(1)
                    );
                } else {
                    return of(dirs);
                }
            })
        );
    }
}

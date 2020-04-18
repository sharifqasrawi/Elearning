import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<fromApp.AppState>
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        return this.store.select('login').pipe(
            take(1),
            map(authState => {
                // console.log(authState);
                const isAuth = !!authState.user;
                const isAdmin = authState.isAdmin;

                if (isAuth && isAdmin) {
                    return true;
                }
                return this.router.createUrlTree(['/security']);
            })
            // tap(isAuth => {
            //   if (!isAuth) {
            //     this.router.navigate(['/auth']);
            //   }
            // })
        );
    }
}

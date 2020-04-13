import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { take, map, exhaustMap } from 'rxjs/operators';




@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
     
    return this.store.select('login').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('Authorization', 'Bearer ' + user.token)
        });
        
        return next.handle(modifiedReq);
      })
    );
  }
}

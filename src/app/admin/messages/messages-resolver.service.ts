import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Message } from './../../models/message.model';

import * as fromApp from '../../store/app.reducer';
import * as MessagesActions from './store/messages.actions';

@Injectable({ providedIn: 'root' })
export class MessagesResolverService implements Resolve<Message[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('messages').pipe(
            take(1),
            map(messagesState => {
                return messagesState.messages;
            }),
            switchMap(messages => {
                if (messages.length === 0) {
                    this.store.dispatch(new MessagesActions.FetchStart());
                    return this.actions$.pipe(
                        ofType(MessagesActions.FETCH_SUCCESS),
                        take(1)
                    );
                } else {
                    return of(messages);
                }
            })
        );
    }
}

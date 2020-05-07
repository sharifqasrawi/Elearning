import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Course } from './../models/course.model';

import * as fromApp from '../store/app.reducer';
import * as HomeCoursesActions from './store/courses.actions';

@Injectable({providedIn: 'root'})
export class CoursesResolverService implements Resolve<Course[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('homeCourses').pipe(
            take(1),
            map(state => {
                return state.courses;
            }),
            switchMap(courses => {
                if (courses.length === 0) {
                    this.store.dispatch(new HomeCoursesActions.FetchStart());
                    return this.actions$.pipe(
                        ofType(HomeCoursesActions.FETCH_SUCCESS),
                        take(1)
                    );
                } else {
                    return of(courses);
                }
            })
        );
    }
}

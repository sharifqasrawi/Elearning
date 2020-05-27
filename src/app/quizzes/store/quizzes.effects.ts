import { Question } from './../../models/question.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from "@ngrx/store";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { environment } from './../../../environments/environment';

import * as fromApp from '../../store/app.reducer';
import * as HomeQuizzesActions from './quizzes.actions';
import { Quiz } from './../../models/quiz.model';

@Injectable()
export class HomeQuizzesEffects {
    token: string = null;
    userId: string = null;

    @Effect()
    fetchQuizzes = this.actions$.pipe(
        ofType(HomeQuizzesActions.FETCH_QUIZZES_START),
        switchMap(() => {
            return this.http.get<{ quizzes: Quiz[] }>(environment.API_BASE_URL + 'quizzesClient')
                .pipe(
                    map(resData => {
                        return new HomeQuizzesActions.FetchQuizzesSuccess(resData.quizzes);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeQuizzesActions.FetchQuizzesFail(['Access Denied']));
                            case 404:
                                return of(new HomeQuizzesActions.FetchQuizzesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeQuizzesActions.FetchQuizzesFail(errorRes.error.errors));

                            default:
                                return of(new HomeQuizzesActions.FetchQuizzesFail(['Error Fetching Data']));
                        }
                    })
                )
        })
    );

    @Effect()
    fetchQuestions = this.actions$.pipe(
        ofType(HomeQuizzesActions.FETCH_QUESTIONS_START),
        switchMap((quizData: HomeQuizzesActions.FetchQuestionsStart) => {
            return this.http.get<{ questions: Question[] }>(environment.API_BASE_URL + 'quizzesClient/questions', {
                headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                params: new HttpParams().set('quizId', quizData.payload.toString())
            })
                .pipe(
                    map(resData => {
                        return new HomeQuizzesActions.FetchQuestionsSuccess(resData.questions);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeQuizzesActions.FetchQuestionsFail(['Access Denied']));
                            case 404:
                                return of(new HomeQuizzesActions.FetchQuestionsFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeQuizzesActions.FetchQuestionsFail(errorRes.error.errors));

                            default:
                                return of(new HomeQuizzesActions.FetchQuestionsFail(['Error Fetching Data']));
                        }
                    })
                )
        })
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {
        this.store.select('login')
            .pipe(
                map(authState => authState.user)
            )
            .subscribe(user => {
                if (user) {
                    this.token = user.token;
                    this.userId = user.id;
                }
            });
    }
}
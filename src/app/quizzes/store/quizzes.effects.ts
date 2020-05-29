import { UserQuizAnswer } from './../../models/userQuizAnswer.model';
import { UserQuiz } from './../../models/userQuiz.model';
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

    @Effect()
    startQuiz = this.actions$.pipe(
        ofType(HomeQuizzesActions.START_QUIZ_START),
        switchMap((quizData: HomeQuizzesActions.StartQuizStart) => {
            return this.http.post<{ startedQuiz: UserQuiz }>(environment.API_BASE_URL + 'userquizzes/start-quiz',
                {
                    quizId: quizData.payload,
                    userID: this.userId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new HomeQuizzesActions.StartQuizSuccess(resData.startedQuiz);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeQuizzesActions.StartQuizFail(['Access Denied']));
                            case 404:
                                return of(new HomeQuizzesActions.StartQuizFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeQuizzesActions.StartQuizFail(errorRes.error.errors));

                            default:
                                return of(new HomeQuizzesActions.StartQuizFail(['Error Fetching Data']));
                        }
                    })
                )
        })
    );

    @Effect()
    chooseAnswer = this.actions$.pipe(
        ofType(HomeQuizzesActions.CHOOSE_ANSWER_START),
        switchMap((answerData: HomeQuizzesActions.ChooseAnswerStart) => {
            return this.http.post<{ createdUserQuizAnswer: UserQuizAnswer }>(environment.API_BASE_URL + 'userquizzes/choose-answer',
                {
                    userQuizId: answerData.payload.userQuizId,
                    questionId: answerData.payload.questionId,
                    answerId: answerData.payload.answerId,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new HomeQuizzesActions.ChooseAnswerSuccess(resData.createdUserQuizAnswer);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeQuizzesActions.ChooseAnswerFail(['Access Denied']));
                            case 404:
                                return of(new HomeQuizzesActions.ChooseAnswerFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeQuizzesActions.ChooseAnswerFail(errorRes.error.errors));

                            default:
                                return of(new HomeQuizzesActions.ChooseAnswerFail(['Error Fetching Data']));
                        }
                    })
                )
        })
    );


    @Effect()
    fetchUserQuiz = this.actions$.pipe(
        ofType(HomeQuizzesActions.FETCH_USER_QUIZ_START),
        switchMap((quizData: HomeQuizzesActions.FetchUserQuizStart) => {
            return this.http.get<{ userQuiz: UserQuiz, userQuizAnswers: UserQuizAnswer[] }>(environment.API_BASE_URL + 'UserQuizzes/get-user-quiz',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('quizId', quizData.payload.toString())
                        .append('userId', this.userId)
                })
                .pipe(
                    map(resData => {
                        return new HomeQuizzesActions.FetchUserQuizSuccess(resData);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeQuizzesActions.FetchUserQuizFail(['Access Denied']));
                            case 404:
                                return of(new HomeQuizzesActions.FetchUserQuizFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeQuizzesActions.FetchUserQuizFail(errorRes.error.errors));

                            default:
                                return of(new HomeQuizzesActions.FetchUserQuizFail(['Error Fetching Data']));
                        }
                    })
                )
        })
    );

    @Effect()
    submitQuiz = this.actions$.pipe(
        ofType(HomeQuizzesActions.SUBMIT_QUIZ_START),
        switchMap((quizData: HomeQuizzesActions.SubmitQuizStart) => {
            return this.http.post<{ updatedUserQuiz: UserQuiz, userQuizAnswers: UserQuizAnswer[] }>(environment.API_BASE_URL + 'userquizzes/submit-quiz',
                {
                    quizId: quizData.payload,
                    userId: this.userId
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new HomeQuizzesActions.SubmitQuizSuccess(resData);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new HomeQuizzesActions.SubmitQuizFail(['Access Denied']));
                            case 404:
                                return of(new HomeQuizzesActions.SubmitQuizFail(['Error 404. Not Found']));
                            case 400:
                                return of(new HomeQuizzesActions.SubmitQuizFail(errorRes.error.errors));

                            default:
                                return of(new HomeQuizzesActions.SubmitQuizFail(['Error Fetching Data']));
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
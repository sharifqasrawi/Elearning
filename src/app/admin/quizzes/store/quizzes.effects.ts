import { Answer } from './../../../models/answer.model';
import { Question } from './../../../models/question.model';
import { Quiz } from './../../../models/quiz.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from 'rxjs';

import { environment } from '../../../../environments/environment';

import * as fromApp from '../../../store/app.reducer';
import * as QuizzesActions from './quizzes.actions';

@Injectable()
export class QuizzesEffects {
    token: string = null;
    userId: string = null;
    userFullName: string = null;

    @Effect()
    fetchQuizzes = this.actions$.pipe(
        ofType(QuizzesActions.FETCH_QUIZZES_START),
        switchMap(() => {

            return this.http.get<{ quizzes: Quiz[] }>(environment.API_BASE_URL + 'quizzesAdmin',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchQuizzesSuccess(resData.quizzes);
                    }),
                    catchError(errorRes => {

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchQuizzesFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.FetchQuizzesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.FetchQuizzesFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchQuizzesFail(['Error Fetching Data']));
                        }
                    })
                )
        }),

    );

    @Effect()
    fetchTrashedQuizzes = this.actions$.pipe(
        ofType(QuizzesActions.FETCH_TRASHED_QUIZZES_START),
        switchMap(() => {

            return this.http.get<{ quizzes: Quiz[] }>(environment.API_BASE_URL + 'quizzesAdmin/trashed',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchTrashedQuizzesSuccess(resData.quizzes);
                    }),
                    catchError(errorRes => {

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchQuizzesFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.FetchQuizzesFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.FetchQuizzesFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchQuizzesFail(['Error Fetching Data']));
                        }
                    })
                )
        })

    );

    @Effect()
    createQuiz = this.actions$.pipe(
        ofType(QuizzesActions.CREATE_QUIZ_START),
        switchMap((quizData: QuizzesActions.CreateQuizStart) => {
            const data = {
                title_EN: quizData.payload.title_EN,
                description_EN: quizData.payload.description_EN,
                imagePath: quizData.payload.imagePath,
                duration: quizData.payload.duration,
                languages: quizData.payload.languages,
                createdBy: this.userFullName
            };

            return this.http.post<{ createdQuiz: Quiz }>(environment.API_BASE_URL + 'quizzesAdmin/create-quiz',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.CreateQuizSuccess(resData.createdQuiz);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.CreateQuizFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.CreateQuizFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.CreateQuizFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.CreateQuizFail(['Error Fetching Data']));
                        }
                    })
                )
        })

    );

    @Effect()
    updateQuiz = this.actions$.pipe(
        ofType(QuizzesActions.UPDATE_QUIZ_START),
        switchMap((quizData: QuizzesActions.UpdateQuizStart) => {
            const data = {
                id: quizData.payload.id,
                title_EN: quizData.payload.title_EN,
                description_EN: quizData.payload.description_EN,
                imagePath: quizData.payload.imagePath,
                duration: quizData.payload.duration,
                languages: quizData.payload.languages,
                updatedBy: this.userFullName
            };

            return this.http.put<{ updatedQuiz: Quiz }>(environment.API_BASE_URL + 'quizzesAdmin/update-quiz',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.UpdateQuizSuccess(resData.updatedQuiz);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.UpdateQuizFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.UpdateQuizFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.UpdateQuizFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.UpdateQuizFail(['Error Fetching Data']));
                        }
                    })
                )
        }),

    );

    @Effect()
    trashRestoreQuiz = this.actions$.pipe(
        ofType(QuizzesActions.TRASH_RESTORE_QUIZ_START),
        switchMap((quizData: QuizzesActions.TrashRestoreQuizStart) => {
            return this.http.put<{ updatedQuiz: Quiz }>(environment.API_BASE_URL + 'quizzesAdmin/trash-restore-quiz',
                {
                    id: quizData.payload.id,
                    deletedBy: this.userFullName,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', quizData.payload.action)
                })
                .pipe(
                    map(resData => {
                        if (quizData.payload.action === 'trash')
                            return new QuizzesActions.TrashQuizSuccess(resData.updatedQuiz);
                        else if (quizData.payload.action === 'restore')
                            return new QuizzesActions.RestoreQuizSuccess(resData.updatedQuiz);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.TrashRestoreQuizFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.TrashRestoreQuizFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.TrashRestoreQuizFail(errorRes.error.errors));
                            default:
                                return of(new QuizzesActions.TrashRestoreQuizFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );

    @Effect()
    deleteQuiz = this.actions$.pipe(
        ofType(QuizzesActions.DELETE_QUIZ_START),
        switchMap((quizData: QuizzesActions.DeleteQuizStart) => {

            return this.http.delete<{ deletedQuizId: number }>(environment.API_BASE_URL + 'quizzesAdmin/delete-quiz',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('quizId', quizData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.DeleteQuizSuccess(resData.deletedQuizId);
                    }),
                    catchError(errorRes => {

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.DeleteQuizFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.DeleteQuizFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.DeleteQuizFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.DeleteQuizFail(['Error Fetching Data']));
                        }
                    })
                )
        }),

    );

    @Effect()
    publishUnpublishQuiz = this.actions$.pipe(
        ofType(QuizzesActions.PUBLISH_UNPUBLISH_START),
        switchMap((quizData: QuizzesActions.PublishUnpublishStart) => {
            return this.http.put<{ updatedQuiz: Quiz }>(environment.API_BASE_URL + 'quizzesAdmin/publish-quiz',
                {
                    id: quizData.payload.id,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', quizData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.PublishUnpublishSuccess(resData.updatedQuiz);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.PublishUnpublishFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.PublishUnpublishFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.PublishUnpublishFail(errorRes.error.errors));
                            default:
                                return of(new QuizzesActions.PublishUnpublishFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );


    @Effect()
    fetchQuestions = this.actions$.pipe(
        ofType(QuizzesActions.FETCH_QUESTIONS_START),
        switchMap((questionData: QuizzesActions.FetchQuestionsStart) => {

            return this.http.get<{ questions: Question[] }>(environment.API_BASE_URL + 'quizzesAdmin/questions',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('quizId', questionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchQuestionsSuccess(resData.questions);
                    }),
                    catchError(errorRes => {

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchQuestionsFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.FetchQuestionsFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.FetchQuestionsFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchQuestionsFail(['Error Fetching Data']));
                        }
                    })
                )
        }),

    );

    @Effect()
    createQuestion = this.actions$.pipe(
        ofType(QuizzesActions.CREATE_QUESTION_START),
        switchMap((questionData: QuizzesActions.CreateQuestionStart) => {
            const data = {
                quizId: questionData.payload.quizId,
                text_EN: questionData.payload.text_EN,
                imagePath: questionData.payload.imagePath,
                duration: questionData.payload.duration,
                createdBy: this.userFullName
            };

            return this.http.post<{ createdQuestion: Question }>(environment.API_BASE_URL + 'quizzesAdmin/create-question',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.CreateQuestionSuccess(resData.createdQuestion);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.CreateQuestionFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.CreateQuestionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.CreateQuestionFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.CreateQuestionFail(['Error Fetching Data']));
                        }
                    })
                );
        })
    );

    @Effect()
    updateQuestion = this.actions$.pipe(
        ofType(QuizzesActions.UPDATE_QUESTION_START),
        switchMap((questionData: QuizzesActions.UpdateQuestionStart) => {
            const data = {
                id: questionData.payload.id,
                text_EN: questionData.payload.text_EN,
                imagePath: questionData.payload.imagePath,
                duration: questionData.payload.duration,
                updatedBy: this.userFullName
            };

            return this.http.put<{ updatedQuestion: Question }>(environment.API_BASE_URL + 'quizzesAdmin/update-question',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.UpdateQuestionSuccess(resData.updatedQuestion);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.UpdateQuestionFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.UpdateQuestionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.UpdateQuestionFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.UpdateQuestionFail(['Error Fetching Data']));
                        }
                    }))
        }),

    );

    @Effect()
    trashRestoreQuestion = this.actions$.pipe(
        ofType(QuizzesActions.TRASH_RESTORE_QUESTION_START),
        switchMap((questionData: QuizzesActions.TrashRestoreQuestionStart) => {
            return this.http.put<{ updatedQuestion: Question }>(environment.API_BASE_URL + 'quizzesAdmin/trash-restore-question',
                {
                    id: questionData.payload.id,
                    deletedBy: this.userFullName,
                },
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('action', questionData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.TrashRestoreQuestionSuccess(resData.updatedQuestion);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.TrashRestoreQuestionFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.TrashRestoreQuestionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.TrashRestoreQuestionFail(errorRes.error.errors));
                            default:
                                return of(new QuizzesActions.TrashRestoreQuestionFail(['Oops! An error occured']));
                        }
                    })
                )
        })
    );


    @Effect()
    deleteQuestion = this.actions$.pipe(
        ofType(QuizzesActions.DELETE_QUESTION_START),
        switchMap((questionData: QuizzesActions.DeleteQuestionStart) => {

            return this.http.delete<{ deletedQuestionId: number }>(environment.API_BASE_URL + 'quizzesAdmin/delete-question',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('questionId', questionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.DeleteQuestionSuccess(resData.deletedQuestionId);
                    }),
                    catchError(errorRes => {

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.DeleteQuestionFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.DeleteQuestionFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.DeleteQuestionFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.DeleteQuestionFail(['Error Fetching Data']));
                        }
                    })
                )
        }),

    );

    @Effect()
    fetchAnswers = this.actions$.pipe(
        ofType(QuizzesActions.FETCH_ANSWERS_START),
        switchMap((questionData: QuizzesActions.FetchAnswersStart) => {

            return this.http.get<{ answers: Answer[] }>(environment.API_BASE_URL + 'quizzesAdmin/answers',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('questionId', questionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchAnswersSuccess(resData.answers);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchAnswersFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.FetchAnswersFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.FetchAnswersFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchAnswersFail(['Error Fetching Data']));
                        }
                    })
                )
        }),

    );

    @Effect()
    createAnswer = this.actions$.pipe(
        ofType(QuizzesActions.CREATE_ANSWER_START),
        switchMap((answernData: QuizzesActions.CreateAnswerStart) => {
            const data = {
                questionId: answernData.payload.questionId,
                text_EN: answernData.payload.text_EN,
                imagePath: answernData.payload.imagePath,
                isCorrect: answernData.payload.isCorrect,
                createdBy: this.userFullName
            };

            return this.http.post<{ createdAnswer: Answer }>(environment.API_BASE_URL + 'quizzesAdmin/create-answer',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.CreateAnswerSuccess(resData.createdAnswer);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.CreateAnswerFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.CreateAnswerFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.CreateAnswerFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.CreateAnswerFail(['Error creating answer']));
                        }
                    })
                );
        })
    );


    @Effect()
    updateAnswer = this.actions$.pipe(
        ofType(QuizzesActions.UPDATE_ANSWER_START),
        switchMap((answernData: QuizzesActions.UpdateAnswerStart) => {
            const data = {
                id: answernData.payload.id,
                questionId: answernData.payload.questionId,
                text_EN: answernData.payload.text_EN,
                imagePath: answernData.payload.imagePath,
                isCorrect: answernData.payload.isCorrect,
                updatedBy: this.userFullName
            };

            return this.http.put<{ updatedAnswer: Answer }>(environment.API_BASE_URL + 'quizzesAdmin/update-answer',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.UpdateAnswerSuccess(resData.updatedAnswer);
                    }),
                    catchError(errorRes => {
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.UpdateAnswerFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.UpdateAnswerFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.UpdateAnswerFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.UpdateAnswerFail(['Error updating answer']));
                        }
                    }))
        }),

    );

    
    @Effect()
    deleteAnswer = this.actions$.pipe(
        ofType(QuizzesActions.DELETE_ANSWER_START),
        switchMap((answerData: QuizzesActions.DeleteAnswerStart) => {

            return this.http.delete<{ deletedAnswerId: number }>(environment.API_BASE_URL + 'quizzesAdmin/delete-answer',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token),
                    params: new HttpParams().set('answerId', answerData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.DeleteAnswerSuccess(resData.deletedAnswerId);
                    }),
                    catchError(errorRes => {

                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.DeleteAnswerFail(['Access Denied']));
                            case 404:
                                return of(new QuizzesActions.DeleteAnswerFail(['Error 404. Not Found']));
                            case 400:
                                return of(new QuizzesActions.DeleteAnswerFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.DeleteAnswerFail(['Error deleting answer']));
                        }
                    })
                )
        }),

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
                    this.userFullName = `${user.firstName} ${user.lastName}`
                }
            });
    }
}
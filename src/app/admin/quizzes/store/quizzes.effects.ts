import { TranslateService } from '@ngx-translate/core';
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

    errorAccessDenied: string = '';
    error404: string = '';
    errorOccured: string = '';


    @Effect()
    fetchQuizzes = this.actions$.pipe(
        ofType(QuizzesActions.FETCH_QUIZZES_START),
        switchMap(() => {

            return this.http.get<{ quizzes: Quiz[] }>(environment.API_BASE_URL + 'quizzesAdmin',
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchQuizzesSuccess(resData.quizzes);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchQuizzesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.FetchQuizzesFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.FetchQuizzesFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchQuizzesFail([this.errorOccured]));
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
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchTrashedQuizzesSuccess(resData.quizzes);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchQuizzesFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.FetchQuizzesFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.FetchQuizzesFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchQuizzesFail([this.errorOccured]));
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
                title_FR: quizData.payload.title_FR,
                description_FR: quizData.payload.description_FR,
                imagePath: quizData.payload.imagePath,
                duration: quizData.payload.duration,
                languages: quizData.payload.languages,
                createdBy: this.userFullName
            };

            return this.http.post<{ createdQuiz: Quiz }>(environment.API_BASE_URL + 'quizzesAdmin/create-quiz',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.CreateQuizSuccess(resData.createdQuiz);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.CreateQuizFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.CreateQuizFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.CreateQuizFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.CreateQuizFail([this.errorOccured]));
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
                title_FR: quizData.payload.title_FR,
                description_FR: quizData.payload.description_FR,
                imagePath: quizData.payload.imagePath,
                duration: quizData.payload.duration,
                languages: quizData.payload.languages,
                updatedBy: this.userFullName
            };

            return this.http.put<{ updatedQuiz: Quiz }>(environment.API_BASE_URL + 'quizzesAdmin/update-quiz',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.UpdateQuizSuccess(resData.updatedQuiz);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.UpdateQuizFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.UpdateQuizFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.UpdateQuizFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.UpdateQuizFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
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
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.TrashRestoreQuizFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.TrashRestoreQuizFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.TrashRestoreQuizFail(errorRes.error.errors));
                            default:
                                return of(new QuizzesActions.TrashRestoreQuizFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('quizId', quizData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.DeleteQuizSuccess(resData.deletedQuizId);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.DeleteQuizFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.DeleteQuizFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.DeleteQuizFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.DeleteQuizFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('action', quizData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.PublishUnpublishSuccess(resData.updatedQuiz);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.PublishUnpublishFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.PublishUnpublishFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.PublishUnpublishFail(errorRes.error.errors));
                            default:
                                return of(new QuizzesActions.PublishUnpublishFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('quizId', questionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchQuestionsSuccess(resData.questions);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchQuestionsFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.FetchQuestionsFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.FetchQuestionsFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchQuestionsFail([this.errorOccured]));
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
                text_FR: questionData.payload.text_FR,
                imagePath: questionData.payload.imagePath,
                duration: questionData.payload.duration,
                createdBy: this.userFullName
            };

            return this.http.post<{ createdQuestion: Question }>(environment.API_BASE_URL + 'quizzesAdmin/create-question',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.CreateQuestionSuccess(resData.createdQuestion);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.CreateQuestionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.CreateQuestionFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.CreateQuestionFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.CreateQuestionFail([this.errorOccured]));
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
                text_FR: questionData.payload.text_FR,
                imagePath: questionData.payload.imagePath,
                duration: questionData.payload.duration,
                updatedBy: this.userFullName
            };

            return this.http.put<{ updatedQuestion: Question }>(environment.API_BASE_URL + 'quizzesAdmin/update-question',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.UpdateQuestionSuccess(resData.updatedQuestion);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.UpdateQuestionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.UpdateQuestionFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.UpdateQuestionFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.UpdateQuestionFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('action', questionData.payload.action)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.TrashRestoreQuestionSuccess(resData.updatedQuestion);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.TrashRestoreQuestionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.TrashRestoreQuestionFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.TrashRestoreQuestionFail(errorRes.error.errors));
                            default:
                                return of(new QuizzesActions.TrashRestoreQuestionFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('questionId', questionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.DeleteQuestionSuccess(resData.deletedQuestionId);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.DeleteQuestionFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.DeleteQuestionFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.DeleteQuestionFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.DeleteQuestionFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('questionId', questionData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.FetchAnswersSuccess(resData.answers);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.FetchAnswersFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.FetchAnswersFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.FetchAnswersFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.FetchAnswersFail([this.errorOccured]));
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
                text_FR: answernData.payload.text_FR,
                imagePath: answernData.payload.imagePath,
                isCorrect: answernData.payload.isCorrect,
                createdBy: this.userFullName
            };

            return this.http.post<{ createdAnswer: Answer }>(environment.API_BASE_URL + 'quizzesAdmin/create-answer',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.CreateAnswerSuccess(resData.createdAnswer);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.CreateAnswerFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.CreateAnswerFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.CreateAnswerFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.CreateAnswerFail([this.errorOccured]));
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
                text_FR: answernData.payload.text_FR,
                imagePath: answernData.payload.imagePath,
                isCorrect: answernData.payload.isCorrect,
                updatedBy: this.userFullName
            };

            return this.http.put<{ updatedAnswer: Answer }>(environment.API_BASE_URL + 'quizzesAdmin/update-answer',
                data,
                {
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang)
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.UpdateAnswerSuccess(resData.updatedAnswer);
                    }),
                    catchError(errorRes => {
                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.UpdateAnswerFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.UpdateAnswerFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.UpdateAnswerFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.UpdateAnswerFail([this.errorOccured]));
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
                    headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
                        .append('language', this.translate.currentLang),
                    params: new HttpParams().set('answerId', answerData.payload.toString())
                })
                .pipe(
                    map(resData => {
                        return new QuizzesActions.DeleteAnswerSuccess(resData.deletedAnswerId);
                    }),
                    catchError(errorRes => {

                        this.getErrorsTranslations();
                        switch (errorRes.status) {
                            case 403:
                            case 401:
                                return of(new QuizzesActions.DeleteAnswerFail([this.errorAccessDenied]));
                            case 404:
                                return of(new QuizzesActions.DeleteAnswerFail([this.error404]));
                            case 400:
                                return of(new QuizzesActions.DeleteAnswerFail(errorRes.error.errors));

                            default:
                                return of(new QuizzesActions.DeleteAnswerFail([this.errorOccured]));
                        }
                    })
                )
        }),

    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
        private translate: TranslateService
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

    private getErrorsTranslations() {
        this.translate.get(['ERRORS.ACCESS_DENIED', 'ERRORS.ERROR404', 'ERRORS.OOPS']).subscribe(trans => {
            this.errorAccessDenied = trans['ERRORS.ACCESS_DENIED'];
            this.error404 = trans['ERRORS.ERROR404'];
            this.errorOccured = trans['ERRORS.OOPS'];
        });
    }
}
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { UserQuizAnswer } from './../../models/userQuizAnswer.model';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CanComponentDeactivate } from './can-deactivate-guard.service';
import * as fromApp from '../../store/app.reducer';
import * as HomeQuizzesActions from '../store/quizzes.actions';
import { Question } from './../../models/question.model';
import { UserQuiz } from './../../models/userQuiz.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-quiz-proccess',
  templateUrl: './quiz-proccess.component.html',
  styleUrls: ['./quiz-proccess.component.css']
})
export class QuizProccessComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;

  quizId: number = null;
  quizSlug: string = null;
  quizTitle: string = null;

  currentQuiz: UserQuiz = null;

  answerId: number;
  userQuizAnswers: UserQuizAnswer[] = null;
  submitting = false;
  isSubmitted = false;

  questions: Question[] = null;
  loading = false;
  choosing = false;

  currentQuestionIndex = 0;
  firstQuestionIndex: number = null;
  lastQuestionIndex: number = null;

  currentLang: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.onLangChange.subscribe(() => this.currentLang = this.translate.currentLang);

    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;
      this.quizSlug = params.quizSlug;
      this.quizTitle = (params.quizSlug as string).split('-').join(' ');
    });

    this.store.dispatch(new HomeQuizzesActions.FetchQuestionsStart(this.quizId));

    this.store.dispatch(new HomeQuizzesActions.FetchUserQuizStart(this.quizId));

    this.store.select('homeQuizzes').subscribe(state => {
      this.questions = state.questions;
      this.currentQuiz = state.currentQuiz;
      this.loading = state.loadingQs;
      this.userQuizAnswers = state.userQuizAnswers;
      this.submitting = state.submittingQuiz;
      this.choosing = state.choosingAnswer;
      this.firstQuestionIndex = 0;


      if (state.currentQuiz) {
        this.isSubmitted = state.currentQuiz.isSubmitted;
      }
      this.lastQuestionIndex = state.questions.length - 1;
    });

  }

  onSubmitQuiz() {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['QUIZZES.SUBMIT_QUIZ', 'QUIZZES.SUBMIT_QUIZ_MSG']).subscribe(trans => {
      alertHeader = trans['QUIZZES.SUBMIT_QUIZ'];
      alertMsg = trans['QUIZZES.SUBMIT_QUIZ_MSG'];
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { header: alertHeader, message: alertMsg }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['quizzes', this.quizId, this.quizSlug, 'result']);
    });
  }

  onChooseAnswer() {
    this.store.dispatch(new HomeQuizzesActions.ChooseAnswerStart({
      answerId: this.answerId,
      questionId: this.questions[this.currentQuestionIndex].id,
      userQuizId: this.currentQuiz.id
    }));
  }

  onNextQuestion() {
    if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.lastQuestionIndex) {
      this.currentQuestionIndex++;
    }
  }


  onPreviousQuestion() {
    if (this.currentQuestionIndex > 0 && this.currentQuestionIndex <= this.lastQuestionIndex) {
      this.currentQuestionIndex--;
    }
  }

  onCheckIfChoiceSelected(answerId: number): boolean {
    const a = this.userQuizAnswers.find(x => x.userQuizId === this.currentQuiz.id
      && x.questionId === this.questions[this.currentQuestionIndex].id
      && x.answerId === answerId);

    if (a) {
      return true;
    }

    return false;
  }

  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return confirm('Discard all changes and exit ?');
  // }


  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
}

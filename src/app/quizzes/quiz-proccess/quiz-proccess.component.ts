import { DomSanitizer } from '@angular/platform-browser';
import { Question } from './../../models/question.model';
import { Store } from '@ngrx/store';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../store/app.reducer';
import * as HomeQuizzesActions from '../store/quizzes.actions';
import { Observable } from 'rxjs/internal/Observable';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-quiz-proccess',
  templateUrl: './quiz-proccess.component.html',
  styleUrls: ['./quiz-proccess.component.css']
})
export class QuizProccessComponent implements OnInit, CanComponentDeactivate {

  faQuestionCircle = faQuestionCircle;

  quizId: number = null;
  quizTitle: string = null;

  questions: Question[] = null;
  loading = false;

  currentQuestionIndex = 0;
  lastQuestionIndex: number = null;
  questionsFinished = false;
  questionTimer = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;
      this.quizTitle = (params.quizSlug as string).split('-').join(' ');
    });

    this.store.dispatch(new HomeQuizzesActions.FetchQuestionsStart(this.quizId));

    this.store.select('homeQuizzes').subscribe(state => {
      this.questions = state.questions;
      this.loading = state.loadingQs;
      this.lastQuestionIndex = state.questions.length - 1;
      if (state.loadedQs)
        this.questionTimer =  5000;
    });

    setTimeout(() => {
      this.currentQuestionIndex++;

    }, this.questionTimer);

  }

  onNextQuestion() {
    if (this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.lastQuestionIndex)
      this.currentQuestionIndex++;
    else if (this.currentQuestionIndex === this.lastQuestionIndex)
      this.questionsFinished = true;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return confirm('Discard all changes and exit ?');
  }


  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
}

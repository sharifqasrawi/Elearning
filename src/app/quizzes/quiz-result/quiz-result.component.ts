import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { faCheckCircle, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as HomeQuizzesActions from '../store/quizzes.actions';
import { UserQuiz } from '../../models/userQuiz.model';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit, OnDestroy {

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faQuestionCircle = faQuestionCircle;


  quizId: number = null;
  quizSlug: string = null;
  quizTitle: string = null;

  currentQuiz: UserQuiz = null;
  submitting = false;
  isSubmitted = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;
      this.quizSlug = params.quizSlug;
      this.quizTitle = (params.quizSlug as string).split('-').join(' ');
    });

    this.store.dispatch(new HomeQuizzesActions.SubmitQuizStart(this.quizId));

    this.store.select('homeQuizzes').subscribe(state => {
      this.currentQuiz = state.currentQuiz;
      this.submitting = state.submittingQuiz;

      if (state.currentQuiz)
        this.isSubmitted = state.currentQuiz.isSubmitted;


    });
  }

  ngOnDestroy() {
    this.store.dispatch(new HomeQuizzesActions.ClearErrors());
    this.store.dispatch(new HomeQuizzesActions.ClearStatus());
  }

}

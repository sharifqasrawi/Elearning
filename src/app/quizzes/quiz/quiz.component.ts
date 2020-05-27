import { Question } from './../../models/question.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { faQuestionCircle, faPlay } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as HomeQuizzesActions from '../store/quizzes.actions';
import { Quiz } from './../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  faQuestionCircle = faQuestionCircle;
  faPlay = faPlay;

  quizId: number = null;
  quizTitle: string = null;
  quiz: Quiz = null;
  loading = false;

  breadcrumbLinks: { url?: string, label: string }[];


  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private store: Store<fromApp.AppState>

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;
      this.quizTitle = (params.quizSlug as string).split('-').join(' ');



      this.breadcrumbLinks = [
        { url: '/', label: 'Home' },
        { url: '/quizzes', label: 'Quizzes' },
        { label: `${this.quizTitle}` },
      ];
    });


    if (!this.quiz) {
      this.store.dispatch(new HomeQuizzesActions.FetchQuizzesStart());
    }

    this.store.select('homeQuizzes').subscribe(state => {
      this.quiz = state.quizzes.find(q => q.id === this.quizId);
      this.loading = state.loading;
    });

  }

  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}

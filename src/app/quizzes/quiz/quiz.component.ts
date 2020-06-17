import { TranslateService } from '@ngx-translate/core';
import { Question } from './../../models/question.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  startingQuiz = false;
  startedQuiz = false;
  loading = false;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];

  isAuthenticated = false;

  currentLang: string = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['QUIZZES.QUIZZES']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.currentLang = this.translate.currentLang;
      this.translate.get(['QUIZZES.QUIZZES']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['QUIZZES.QUIZZES']}`);
      });
    });


    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;
      // this.quizTitle = (params.quizSlug as string).split('-').join(' ');

      this.breadcrumbLinks = [
        { url: '/', label: 'Home', translate: true },
        { url: '/quizzes', label: 'Quizzes', translate: true },
        // { label: `${this.quizTitle}` },
      ];
    });

    this.store.select('login').subscribe(state => {
      this.isAuthenticated = state.isAuthenticated;
    });


    if (!this.quiz) {
      this.store.dispatch(new HomeQuizzesActions.FetchQuizzesStart());
    }

    this.store.select('homeQuizzes').subscribe(state => {
      this.quiz = state.quizzes.find(q => q.id === this.quizId);
      this.loading = state.loading;

      this.startingQuiz = state.startingQuiz;
      this.startedQuiz = state.startedQuiz;

      // if (this.quiz) {
      //   if (this.currentLang === 'en')
      //     this.quizTitle = this.quiz.title_EN;
      //   else if (this.currentLang === 'fr')
      //     this.quizTitle = this.quiz.title_FR;
      // }

      if (this.startedQuiz) {
        this.router.navigate(['start'], { relativeTo: this.route });
      }
    });

  }


  onStartQuiz() {
    this.store.dispatch(new HomeQuizzesActions.StartQuizStart(this.quizId));
  }


  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);

}

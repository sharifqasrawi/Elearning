import { NewQuestionComponent } from './set-question/new-question/new-question.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { ThemePalette } from '@angular/material/core';
import { faEdit, faQuestionCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../../store/app.reducer';
import * as QuizzesActions from '../store/quizzes.actions';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-set-quiz',
  templateUrl: './set-quiz.component.html',
  styleUrls: ['./set-quiz.component.css']
})
export class SetQuizComponent implements OnInit, OnDestroy {

  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faQuestionCircle = faQuestionCircle;

  colorAccent: ThemePalette = 'accent';

  quiz: Quiz = null;
  quizId: number = null;
  loading = false;
  publishing = false;
  errors: string[] = null;

  allExpandState = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;
    });


    this.store.select('quizzes').subscribe(state => {
      this.quiz = state.quizzes.find(q => q.id === this.quizId);
      this.loading = state.loadingQuizzes;
      this.publishing = state.publishing;
      this.errors = state.errors;
    });

    if (!this.quiz) {
      this.store.dispatch(new QuizzesActions.FetchQuizzesStart());
    }

  }

  onPublish() {
    if (this.quiz.isPublished)
      this.store.dispatch(new QuizzesActions.PublishUnpublishStart({ id: this.quizId, action: 'unpublish' }));
    else
      this.store.dispatch(new QuizzesActions.PublishUnpublishStart({ id: this.quizId, action: 'publish' }));

  }

  onAddQuestion() {
    this.dialog.open(NewQuestionComponent, {
      width: '650px',
      disableClose: true,
      data: { quizId: this.quizId, editMode: false, question: null }
    });
  }


  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
  getPlainText = (html: string) => html.replace(/<[^>]*>/g, '');


  ngOnDestroy() {
    this.store.dispatch(new QuizzesActions.ClearErrors());
    this.store.dispatch(new QuizzesActions.ClearStatus());
  }

}

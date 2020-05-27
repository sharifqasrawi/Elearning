import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { faEdit, faQuestionCircle, faPlusCircle, faSearch, faTrash, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { NewQuestionComponent } from './set-question/new-question/new-question.component';

import * as fromApp from '../../../store/app.reducer';
import * as QuizzesActions from '../store/quizzes.actions';
import { Quiz } from '../../../models/quiz.model';
import { Question } from '../../../models/question.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-set-quiz',
  templateUrl: './set-quiz.component.html',
  styleUrls: ['./set-quiz.component.css']
})
export class SetQuizComponent implements OnInit, OnDestroy {

  faEdit = faEdit;
  faQuestionCircle = faQuestionCircle;

  colorAccent: ThemePalette = 'accent';

  quiz: Quiz = null;
  quizId: number = null;
  loading = false;
  loaded = false;

  publishing = false;
  errors: string[] = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new QuizzesActions.FetchQuizzesStart());

    this.route.params.subscribe((params: Params) => {
      this.quizId = +params.quizId;

      this.store.select('quizzes').subscribe(state => {
        this.quiz = state.quizzes.find(q => q.id === this.quizId);

        this.loading = state.loadingQuizzes;
        this.loaded = state.loadedQuizzes;
        this.publishing = state.publishing;

        this.errors = state.errors;

      });

    });
  }

  onPublish() {
    if (this.quiz.isPublished)
      this.store.dispatch(new QuizzesActions.PublishUnpublishStart({ id: this.quizId, action: 'unpublish' }));
    else
      this.store.dispatch(new QuizzesActions.PublishUnpublishStart({ id: this.quizId, action: 'publish' }));

  }



  ngOnDestroy() {
    this.store.dispatch(new QuizzesActions.ClearErrors());
    this.store.dispatch(new QuizzesActions.ClearStatus());
  }


  getSanitizedImage = (imagePath: string) => this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  getSanitizedHtml = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
  getPlainText = (html: string) => html.replace(/<[^>]*>/g, '');
}
